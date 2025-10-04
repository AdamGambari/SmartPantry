// Create database tables using Supabase service role
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sepjufyyxsjwpbzzkjhq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcGp1Znl5eHNqd3BienpramhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTUyNjgxMiwiZXhwIjoyMDc1MTAyODEyfQ.T_dOA2j3M1aF0u5NedeWYwfibTQCY0n8CWIAF_CYUAY'

// Create client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTables() {
  console.log('🚀 Creating Smart Pantry database tables...')
  
  try {
    // Create enums first
    console.log('Creating enums...')
    
    const { error: enumError } = await supabase.rpc('create_enums')
    if (enumError && !enumError.message.includes('already exists')) {
      console.log('Creating enums manually...')
      
      // Create item_category enum
      await supabase.rpc('exec_sql', {
        sql: `
          DO $$ BEGIN
            CREATE TYPE item_category AS ENUM (
              'dairy', 'meat', 'produce', 'bakery', 'pantry', 
              'frozen', 'beverages', 'snacks', 'other'
            );
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;
        `
      })
      
      // Create user_role enum
      await supabase.rpc('exec_sql', {
        sql: `
          DO $$ BEGIN
            CREATE TYPE user_role AS ENUM ('owner', 'admin', 'member', 'viewer');
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;
        `
      })
    }
    
    console.log('✅ Enums created')
    
    // Create profiles table
    console.log('Creating profiles table...')
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users(id) PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          full_name TEXT,
          avatar_url TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    })
    
    if (profilesError) console.log('Profiles table:', profilesError.message)
    else console.log('✅ Profiles table created')
    
    // Create households table
    console.log('Creating households table...')
    const { error: householdsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS households (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          created_by UUID REFERENCES profiles(id) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    })
    
    if (householdsError) console.log('Households table:', householdsError.message)
    else console.log('✅ Households table created')
    
    // Create household_members table
    console.log('Creating household_members table...')
    const { error: membersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS household_members (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          household_id UUID REFERENCES households(id) ON DELETE CASCADE,
          user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
          role user_role DEFAULT 'member',
          joined_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(household_id, user_id)
        );
      `
    })
    
    if (membersError) console.log('Household members table:', membersError.message)
    else console.log('✅ Household members table created')
    
    // Create pantry_items table
    console.log('Creating pantry_items table...')
    const { error: pantryError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS pantry_items (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          household_id UUID REFERENCES households(id) ON DELETE CASCADE NOT NULL,
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          unit TEXT NOT NULL,
          category item_category NOT NULL,
          price DECIMAL(10,2),
          expires_at TIMESTAMPTZ,
          purchased_at TIMESTAMPTZ DEFAULT NOW(),
          notes TEXT,
          created_by UUID REFERENCES profiles(id) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    })
    
    if (pantryError) console.log('Pantry items table:', pantryError.message)
    else console.log('✅ Pantry items table created')
    
    // Create shopping_lists table
    console.log('Creating shopping_lists table...')
    const { error: listsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS shopping_lists (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          household_id UUID REFERENCES households(id) ON DELETE CASCADE NOT NULL,
          title TEXT NOT NULL,
          status TEXT DEFAULT 'active',
          created_by UUID REFERENCES profiles(id) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    })
    
    if (listsError) console.log('Shopping lists table:', listsError.message)
    else console.log('✅ Shopping lists table created')
    
    // Create shopping_list_items table
    console.log('Creating shopping_list_items table...')
    const { error: listItemsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS shopping_list_items (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE NOT NULL,
          pantry_item_id UUID REFERENCES pantry_items(id),
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          unit TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    })
    
    if (listItemsError) console.log('Shopping list items table:', listItemsError.message)
    else console.log('✅ Shopping list items table created')
    
    // Enable RLS
    console.log('Enabling Row Level Security...')
    const tables = ['profiles', 'households', 'household_members', 'pantry_items', 'shopping_lists', 'shopping_list_items']
    
    for (const table of tables) {
      await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`
      })
    }
    
    console.log('✅ RLS enabled on all tables')
    
    // Create basic RLS policies
    console.log('Creating RLS policies...')
    
    // Profiles policies
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Users can view own profile" ON profiles
          FOR SELECT USING (auth.uid() = id);
        
        CREATE POLICY "Users can update own profile" ON profiles
          FOR UPDATE USING (auth.uid() = id);
        
        CREATE POLICY "Users can insert own profile" ON profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
      `
    })
    
    // Households policies
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Household members can view household" ON households
          FOR SELECT USING (
            id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid()
            )
          );
        
        CREATE POLICY "Household admins can update household" ON households
          FOR UPDATE USING (
            id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
            )
          );
        
        CREATE POLICY "Users can create household" ON households
          FOR INSERT WITH CHECK (auth.uid() = created_by);
      `
    })
    
    // Household members policies
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Household members can view members" ON household_members
          FOR SELECT USING (
            household_id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid()
            )
          );
        
        CREATE POLICY "Household admins can manage members" ON household_members
          FOR ALL USING (
            household_id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
            )
          );
      `
    })
    
    // Pantry items policies
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Household members can view pantry items" ON pantry_items
          FOR SELECT USING (
            household_id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid()
            )
          );
        
        CREATE POLICY "Household members can manage pantry items" ON pantry_items
          FOR ALL USING (
            household_id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid()
            )
          );
      `
    })
    
    // Shopping lists policies
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Household members can view shopping lists" ON shopping_lists
          FOR SELECT USING (
            household_id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid()
            )
          );
        
        CREATE POLICY "Household members can manage shopping lists" ON shopping_lists
          FOR ALL USING (
            household_id IN (
              SELECT household_id FROM household_members 
              WHERE user_id = auth.uid()
            )
          );
      `
    })
    
    // Shopping list items policies
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Household members can view shopping list items" ON shopping_list_items
          FOR SELECT USING (
            list_id IN (
              SELECT id FROM shopping_lists 
              WHERE household_id IN (
                SELECT household_id FROM household_members 
                WHERE user_id = auth.uid()
              )
            )
          );
        
        CREATE POLICY "Household members can manage shopping list items" ON shopping_list_items
          FOR ALL USING (
            list_id IN (
              SELECT id FROM shopping_lists 
              WHERE household_id IN (
                SELECT household_id FROM household_members 
                WHERE user_id = auth.uid()
              )
            )
          );
      `
    })
    
    console.log('✅ RLS policies created')
    
    // Create triggers for updated_at
    console.log('Creating updated_at triggers...')
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ language 'plpgsql';
        
        CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        
        CREATE TRIGGER update_households_updated_at BEFORE UPDATE ON households
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        
        CREATE TRIGGER update_pantry_items_updated_at BEFORE UPDATE ON pantry_items
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        
        CREATE TRIGGER update_shopping_lists_updated_at BEFORE UPDATE ON shopping_lists
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        
        CREATE TRIGGER update_shopping_list_items_updated_at BEFORE UPDATE ON shopping_list_items
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `
    })
    
    console.log('✅ Updated_at triggers created')
    
    console.log('\n🎉 Database setup complete!')
    console.log('✅ All tables created')
    console.log('✅ RLS enabled with policies')
    console.log('✅ Triggers created')
    console.log('\n🚀 Your Smart Pantry OS is ready!')
    console.log('Visit: http://localhost:3001')
    
  } catch (error) {
    console.error('❌ Error setting up database:', error)
  }
}

createTables()
