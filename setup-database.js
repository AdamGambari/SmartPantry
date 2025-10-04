// Setup database tables programmatically
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sepjufyyxsjwpbzzkjhq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcGp1Znl5eHNqd3BienpramhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjY4MTIsImV4cCI6MjA3NTEwMjgxMn0.1uUxHDIsH6OHOnW9Z7rJsnLNZYtjbcbbY6YDuwBTVCE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('Setting up Smart Pantry database...')
  
  try {
    // Test connection first
    const { data: { user } } = await supabase.auth.getUser()
    console.log('✅ Supabase connection successful')
    
    // Try to create a test profile to see if tables exist
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error && error.code === 'PGRST116') {
      console.log('❌ Database tables not created yet.')
      console.log('Please run the SQL schema in your Supabase dashboard:')
      console.log('1. Go to https://supabase.com/dashboard/project/sepjufyyxsjwpbzzkjhq')
      console.log('2. Click "SQL Editor"')
      console.log('3. Copy and paste the contents of simple-schema.sql')
      console.log('4. Click "Run"')
      return
    }
    
    if (error) {
      console.log('❌ Error:', error.message)
      return
    }
    
    console.log('✅ Database tables exist!')
    console.log('You can now test the app at http://localhost:3001')
    
  } catch (err) {
    console.log('❌ Setup failed:', err.message)
  }
}

setupDatabase()
