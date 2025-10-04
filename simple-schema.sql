-- Simple schema for Smart Pantry OS

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('owner', 'member', 'viewer');
CREATE TYPE item_category AS ENUM ('dairy', 'meat', 'produce', 'bakery', 'pantry', 'frozen', 'beverages', 'snacks');

-- Users table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Households table
CREATE TABLE public.households (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Household members table
CREATE TABLE public.household_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role DEFAULT 'member' NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(household_id, user_id)
);

-- Pantry items table
CREATE TABLE public.pantry_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'piece',
  category item_category NOT NULL,
  price DECIMAL(10,2),
  expires_at TIMESTAMP WITH TIME ZONE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Row Level Security Policies

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Households
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Household members can view household" ON public.households FOR SELECT 
  USING (id IN (SELECT household_id FROM public.household_members WHERE user_id = auth.uid()));
CREATE POLICY "Household owners can update household" ON public.households FOR UPDATE 
  USING (created_by = auth.uid());
CREATE POLICY "Users can create household" ON public.households FOR INSERT 
  WITH CHECK (created_by = auth.uid());

-- Household members
ALTER TABLE public.household_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Household members can view members" ON public.household_members FOR SELECT 
  USING (household_id IN (SELECT household_id FROM public.household_members WHERE user_id = auth.uid()));
CREATE POLICY "Household owners can manage members" ON public.household_members FOR ALL 
  USING (household_id IN (SELECT id FROM public.households WHERE created_by = auth.uid()));

-- Pantry items
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Household members can view pantry items" ON public.pantry_items FOR SELECT 
  USING (household_id IN (SELECT household_id FROM public.household_members WHERE user_id = auth.uid()));
CREATE POLICY "Household members can insert pantry items" ON public.pantry_items FOR INSERT 
  WITH CHECK (household_id IN (SELECT household_id FROM public.household_members WHERE user_id = auth.uid()));
CREATE POLICY "Household members can update pantry items" ON public.pantry_items FOR UPDATE 
  USING (household_id IN (SELECT household_id FROM public.household_members WHERE user_id = auth.uid()));
CREATE POLICY "Household members can delete pantry items" ON public.pantry_items FOR DELETE 
  USING (household_id IN (SELECT household_id FROM public.household_members WHERE user_id = auth.uid()));

-- Functions and triggers

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to automatically add creator as owner of household
CREATE OR REPLACE FUNCTION public.handle_new_household()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.household_members (household_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to add creator as household owner
CREATE TRIGGER on_household_created
  AFTER INSERT ON public.households
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_household();
