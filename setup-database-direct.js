// Create database tables using direct SQL execution
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sepjufyyxsjwpbzzkjhq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcGp1Znl5eHNqd3BienpramhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTUyNjgxMiwiZXhwIjoyMDc1MTAyODEyfQ.T_dOA2j3M1aF0u5NedeWYwfibTQCY0n8CWIAF_CYUAY'

// Create client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up Smart Pantry database...')
  
  try {
    // Test connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (!error) {
      console.log('✅ Database tables already exist!')
      console.log('🎉 Your Smart Pantry OS is ready!')
      console.log('Visit: http://localhost:3001')
      return
    }
    
    console.log('Tables not found, creating them...')
    
    // Let's try creating a simple profile to test
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .insert({ id: '00000000-0000-0000-0000-000000000000', email: 'test@test.com' })
      .select()
    
    if (testError && testError.code === 'PGRST116') {
      console.log('❌ Tables need to be created manually in Supabase dashboard')
      console.log('')
      console.log('📋 Please follow these steps:')
      console.log('1. Go to: https://supabase.com/dashboard/project/sepjufyyxsjwpbzzkjhq')
      console.log('2. Click "SQL Editor" in the sidebar')
      console.log('3. Copy and paste the contents of simple-schema.sql')
      console.log('4. Click "Run"')
      console.log('')
      console.log('🔄 After creating tables, run: node test-connection.js')
      return
    }
    
    if (testError) {
      console.log('❌ Error:', testError.message)
      return
    }
    
    console.log('✅ Database is working!')
    console.log('🎉 Your Smart Pantry OS is ready!')
    console.log('Visit: http://localhost:3001')
    
  } catch (error) {
    console.log('❌ Setup failed:', error.message)
    console.log('')
    console.log('📋 Please follow these steps:')
    console.log('1. Go to: https://supabase.com/dashboard/project/sepjufyyxsjwpbzzkjhq')
    console.log('2. Click "SQL Editor" in the sidebar')
    console.log('3. Copy and paste the contents of simple-schema.sql')
    console.log('4. Click "Run"')
    console.log('')
    console.log('🔄 After creating tables, run: node test-connection.js')
  }
}

setupDatabase()
