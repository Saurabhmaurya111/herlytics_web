import 'dotenv/config';
import { getAi } from './genkit';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Helper function to check if error is a quota/rate limit error
function isQuotaError(error: any): boolean {
  const errorMessage = error?.message || '';
  return (
    error?.status === 429 ||
    errorMessage.includes('429') ||
    errorMessage.includes('quota') ||
    errorMessage.includes('rate limit') ||
    errorMessage.includes('Too Many Requests')
  );
}

// Helper function to extract retry delay from error
function getRetryDelay(error: any): number {
  try {
    // Try to extract retry delay from error details
    const errorDetails = error?.errorDetails || [];
    const retryInfo = errorDetails.find((detail: any) => 
      detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
    );
    if (retryInfo?.retryDelay) {
      // Parse delay (format: "56s" or similar)
      const delayStr = retryInfo.retryDelay.replace(/[^\d.]/g, '');
      return Math.min(parseFloat(delayStr) * 1000, 60000); // Max 60 seconds
    }
  } catch (e) {
    // Fallback if parsing fails
  }
  return 5000; // Default 5 seconds
}

// Retry function with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // If it's a quota error and we have retries left, wait and retry
      if (isQuotaError(error) && attempt < maxRetries) {
        const delay = attempt === 0 
          ? getRetryDelay(error) 
          : baseDelay * Math.pow(2, attempt);
        
        console.log(`Quota error encountered. Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // If it's not a quota error or we're out of retries, throw
      throw error;
    }
  }
  
  throw lastError;
}

export async function chatFlow(messages: ChatMessage[]): Promise<ChatMessage> {
  const systemPrompt = `You are a helpful AI assistant for HERlytics, a community for women in data and analytics. 
HERlytics was founded in 2020 and focuses on supporting women at every stage of their careers in data science and analytics.
Be friendly, professional, and helpful. Answer questions about HERlytics, its mission, events, and services.
If asked about events, mention that we organize various workshops, networking sessions, and career development programs.`;

  // Build conversation context from messages
  let conversationContext = systemPrompt + '\n\n';
  messages.forEach(msg => {
    conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
  });
  conversationContext += 'Assistant:';

  try {
    // Generate response using the model with retry logic
    const ai = getAi();
    const response = await retryWithBackoff(async () => {
      return await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: conversationContext,
      });
    });

    // Extract text from response
    const responseText = response.text || 
                         'I apologize, but I couldn\'t generate a response. Please try again.';

    return {
      role: 'assistant',
      content: responseText,
    };
  } catch (error: any) {
    // Handle quota/rate limit errors with user-friendly message
    if (isQuotaError(error)) {
      console.error('Gemini API quota exceeded:', error.message);
      return {
        role: 'assistant',
        content: `I apologize, but I'm currently experiencing high demand and have reached my usage limit. Please try again in a few moments. If the issue persists, you can reach out to HERlytics directly through our contact form for immediate assistance.

For general inquiries about HERlytics:
- We're a community for women in data and analytics, founded in 2020
- We organize workshops, networking sessions, and career development programs
- We support women at every stage of their careers in data science and analytics

Thank you for your patience!`,
      };
    }
    
    // Re-throw other errors to be handled by the API route
    throw error;
  }
}
