import { createSupabaseServerClient } from '@/lib/supabaseServerClient'

// Create a new user in the database
export const createUser = async (clerkUserId: string, email: string, userType: 'advertiser' | 'publisher') => {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        clerk_user_id: clerkUserId,
        email,
        user_type: userType
      }
    ])
    .select()
  
  if (error) {
    throw new Error(`Error creating user: ${error.message}`)
 }
  
  return data[0]
}

// Get user by Clerk user ID
export const getUserByClerkId = async (clerkUserId: string) => {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()
  
  if (error) {
    throw new Error(`Error fetching user: ${error.message}`)
  }
  
  return data
}

// Create a new channel for a publisher
export const createChannel = async (publisherId: string, channelName: string, channelUsername: string, subscribersCount: number, category: string) => {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('channels')
    .insert([
      {
        publisher_id: publisherId,
        channel_name: channelName,
        channel_username: channelUsername,
        subscribers_count: subscribersCount,
        category
      }
    ])
    .select()
  
  if (error) {
    throw new Error(`Error creating channel: ${error.message}`)
  }
  
  return data[0]
}

// Create a new campaign for an advertiser
export const createCampaign = async (advertiserId: string, name: string, budget: number, startDate: Date, endDate: Date) => {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('campaigns')
    .insert([
      {
        advertiser_id: advertiserId,
        name,
        budget,
        start_date: startDate,
        end_date: endDate
      }
    ])
    .select()
  
  if (error) {
    throw new Error(`Error creating campaign: ${error.message}`)
  }
  
  return data[0]
}

// Create a new ad for a campaign
export const createAd = async (campaignId: string, title: string, content: string, mediaUrl?: string, targetUrl?: string) => {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('ads')
    .insert([
      {
        campaign_id: campaignId,
        title,
        content,
        media_url: mediaUrl,
        target_url: targetUrl
      }
    ])
    .select()
  
  if (error) {
    throw new Error(`Error creating ad: ${error.message}`)
  }
  
  return data[0]
}

// Create a new transaction
export const createTransaction = async (userId: string, amount: number, transactionType: 'deposit' | 'withdrawal' | 'payment' | 'earning', description?: string) => {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        user_id: userId,
        amount,
        transaction_type: transactionType,
        description
      }
    ])
    .select()
  
  if (error) {
    throw new Error(`Error creating transaction: ${error.message}`)
  }
  
  return data[0]
}