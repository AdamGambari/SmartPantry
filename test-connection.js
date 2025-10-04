// Test Supabase connection
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sepjufyyxsjwpbzzkjhq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcGp1Znl5eHNqd3BienpramhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjY4MTIsImV4cCI6MjA3NTEwMjgxMn0.1uUxHDIsH6OHOnW9Z7rJsnLNZYtjbcbbY6YDuwBTVCE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('profiles').select('count')
    if (error) {
      console.log('Tables not created yet. Please run the SQL schema first.')
      console.log('Error:', error.message)
    } else {
      console.log('✅ Connection successful! Tables exist.')
    }
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
  }
}

testConnection()
