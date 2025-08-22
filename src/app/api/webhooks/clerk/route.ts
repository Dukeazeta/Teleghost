import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/supabaseService'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
  
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
  
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
  
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
  
  let evt: WebhookEvent
  
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
  
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  
  // Handle user creation
  if (eventType === 'user.created') {
    const { id, email_addresses, primary_email_address_id } = evt.data;
    
    // Find the primary email address
    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id
    );
    
    if (!primaryEmail) {
      return NextResponse.json({ error: 'No primary email found' }, { status: 400 });
    }
    
    // Determine user type based on email (this is a simple example)
    // In a real application, you might determine this from metadata or another source
    const userType = primaryEmail.email_address.includes('publisher') ? 'publisher' : 'advertiser';
    
    try {
      // Create user in Supabase
      await createUser(id, primaryEmail.email_address, userType as 'advertiser' | 'publisher');
      
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error('Error creating user in Supabase:', error);
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
  }
  
  return new Response('', { status: 200 })
}