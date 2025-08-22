import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client with Clerk session
export const createSupabaseServerClient = async () => {
  const { getToken } = await auth()
  const token = await getToken({ template: 'supabase' })
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  return supabase
}