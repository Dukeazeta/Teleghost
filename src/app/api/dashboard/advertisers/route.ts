import { createSupabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get the authenticated user
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get Supabase client with Clerk session
    const supabase = await createSupabaseServerClient()
    
    // Fetch user data from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', userId)
      .single()
    
    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
    }
    
    // Fetch campaigns
    const { data: campaignsData, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('advertiser_id', userData.id)
    
    if (campaignsError) {
      console.error('Error fetching campaigns:', campaignsError)
      return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
    }
    
    // Calculate balance from transactions
    const { data: transactionsData, error: transactionsError } = await supabase
      .from('transactions')
      .select('amount, transaction_type')
      .eq('user_id', userData.id)
    
    if (transactionsError) {
      console.error('Error fetching transactions:', transactionsError)
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }
    
    const calculatedBalance = transactionsData.reduce((acc, transaction) => {
      if (transaction.transaction_type === 'deposit') {
        return acc + transaction.amount
      } else if (transaction.transaction_type === 'payment') {
        return acc - transaction.amount
      }
      return acc
    }, 0)
    
    // Return the data
    return NextResponse.json({
      user: userData,
      campaigns: campaignsData,
      balance: calculatedBalance
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}