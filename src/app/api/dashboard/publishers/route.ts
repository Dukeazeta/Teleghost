import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return demo data for development testing
    return NextResponse.json({
      user: { id: 'demo', user_type: 'publisher' },
      channels: [
        {
          id: "1",
          publisher_id: "demo",
          name: "Tech News Africa",
          niche: "Technology",
          subscribers: 15420,
          engagement_rate: 8.5,
          rating: 4.8,
          price_per_post: 25.00,
          status: "active",
          new_orders: 3,
          total_orders: 47,
          created_at: "2024-01-10",
          updated_at: "2024-01-22",
          telegram_link: "https://t.me/technewsafrica",
          description: "Latest technology news and updates in Africa"
        },
        {
          id: "2",
          publisher_id: "demo",
          name: "Business Hub Nigeria",
          niche: "Business & Finance",
          subscribers: 8900,
          engagement_rate: 12.3,
          rating: 4.6,
          price_per_post: 18.00,
          status: "active",
          new_orders: 1,
          total_orders: 29,
          created_at: "2024-01-05",
          updated_at: "2024-01-20",
          telegram_link: "https://t.me/businesshubnigeria",
          description: "Business opportunities and financial insights"
        },
        {
          id: "3",
          publisher_id: "demo",
          name: "Lifestyle Kenya",
          niche: "Lifestyle & Entertainment",
          subscribers: 12800,
          engagement_rate: 7.2,
          rating: 4.4,
          price_per_post: 22.00,
          status: "paused",
          new_orders: 0,
          total_orders: 33,
          created_at: "2023-12-28",
          updated_at: "2024-01-18",
          telegram_link: "https://t.me/lifestylekenya",
          description: "Lifestyle trends and entertainment news in Kenya"
        }
      ],
      transactions: [
        {
          id: "1",
          type: "earning",
          amount: 125.00,
          description: "Payment from Tech Product Launch campaign",
          date: "2024-01-22",
          status: "completed",
          channel_id: "1"
        },
        {
          id: "2",
          type: "earning",
          amount: 72.00,
          description: "Payment from Business Consulting campaign",
          date: "2024-01-20",
          status: "completed",
          channel_id: "2"
        },
        {
          id: "3",
          type: "withdrawal",
          amount: 500.00,
          description: "Withdrawal to bank account",
          date: "2024-01-18",
          status: "completed"
        }
      ],
      balance: 1250.50
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle POST requests for updating publisher data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'add_channel':
        return NextResponse.json({ 
          channel: {
            id: Date.now().toString(),
            ...data,
            status: 'pending_review',
            new_orders: 0,
            total_orders: 0,
            rating: 0
          }
        });

      case 'request_withdrawal':
        return NextResponse.json({ 
          withdrawal: {
            id: Date.now().toString(),
            amount: data.amount,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}