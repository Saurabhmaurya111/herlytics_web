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
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Check if it's a quota/rate limit error
    const errorMessage = error?.message || '';
    const isQuotaError = 
      error?.status === 429 ||
      errorMessage.includes('429') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('rate limit') ||
      errorMessage.includes('Too Many Requests');
    
    if (isQuotaError) {
      return NextResponse.json(
        { 
          error: 'The AI service is currently experiencing high demand. Please try again in a few moments.',
          retryAfter: 60 // Suggest retrying after 60 seconds
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}

