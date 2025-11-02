import { NextRequest, NextResponse } from 'next/server';
import { chatFlow } from '@/ai/dev';

// Next.js automatically loads .env.local, but ensure it's available
// The API route runs on the server where env vars are available

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request. Messages array is required.' },
        { status: 400 }
      );
    }

    // Call the chat flow function
    const result = await chatFlow(messages);

    return NextResponse.json({
      message: result,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

