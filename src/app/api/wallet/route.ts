import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return unified wallet demo data
    // In production, this would fetch from the database based on user ID
    return NextResponse.json({
      balance: 484.50, // Calculated from transactions: 1000 - 500 - 127.50 - 85 + 125 + 72 = 484.50
      transactions: [
        {
          id: "1",
          type: "earning",
          amount: 125.00,
          description: "Payment from Tech Product Launch campaign",
          date: "2024-01-22T10:30:00Z",
          status: "completed",
          metadata: { channel_id: "1", role: "publisher" }
        },
        {
          id: "2", 
          type: "earning",
          amount: 72.00,
          description: "Payment from Business Consulting campaign",
          date: "2024-01-20T14:15:00Z",
          status: "completed",
          metadata: { channel_id: "2", role: "publisher" }
        },
        {
          id: "3",
          type: "ad_spend",
          amount: 127.50,
          description: "Tech Product Launch campaign spend",
          date: "2024-01-20T09:45:00Z",
          status: "completed",
          metadata: { campaign_id: "1", role: "advertiser" }
        },
        {
          id: "4",
          type: "ad_spend", 
          amount: 85.00,
          description: "Business Consulting campaign spend",
          date: "2024-01-18T16:20:00Z",
          status: "completed",
          metadata: { campaign_id: "2", role: "advertiser" }
        },
        {
          id: "5",
          type: "deposit",
          amount: 1000.00,
          description: "Initial wallet funding",
          date: "2024-01-15T08:00:00Z",
          status: "completed"
        },
        {
          id: "6",
          type: "withdrawal",
          amount: 500.00,
          description: "Withdrawal to bank account",
          date: "2024-01-18T11:30:00Z", 
          status: "completed"
        }
      ]
    });
  } catch (error) {
    console.error('Wallet API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle POST requests for wallet operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, amount, description, metadata } = body;

    switch (action) {
      case 'deposit':
        return NextResponse.json({ 
          transaction: {
            id: Date.now().toString(),
            type: 'deposit',
            amount: amount,
            description: description || 'Funds added to wallet',
            date: new Date().toISOString(),
            status: 'completed'
          }
        });

      case 'spend':
        return NextResponse.json({ 
          transaction: {
            id: Date.now().toString(),
            type: 'ad_spend',
            amount: amount,
            description: description || 'Campaign spending',
            date: new Date().toISOString(),
            status: 'completed',
            metadata: metadata
          }
        });

      case 'earn':
        return NextResponse.json({ 
          transaction: {
            id: Date.now().toString(),
            type: 'earning',
            amount: amount,
            description: description || 'Channel earnings',
            date: new Date().toISOString(),
            status: 'completed',
            metadata: metadata
          }
        });

      case 'withdraw':
        return NextResponse.json({ 
          transaction: {
            id: Date.now().toString(),
            type: 'withdrawal',
            amount: amount,
            description: description || 'Withdrawal request',
            date: new Date().toISOString(),
            status: 'pending', // Withdrawals start as pending
            metadata: metadata
          }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Wallet API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}