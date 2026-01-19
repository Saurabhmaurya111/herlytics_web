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

// Helper function to check if quota is completely exhausted (limit: 0)
function isQuotaExhausted(error: any): boolean {
  const errorMessage = error?.message || '';
  // Check if error mentions "limit: 0" which indicates daily quota is exhausted
  return errorMessage.includes('limit: 0');
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
    
    // Also try to parse from error message (format: "Please retry in 52.807386645s")
    const retryMatch = error?.message?.match(/retry in ([\d.]+)s/i);
    if (retryMatch) {
      return Math.min(parseFloat(retryMatch[1]) * 1000, 60000);
    }
  } catch (e) {
    // Fallback if parsing fails
  }
  return 5000; // Default 5 seconds
}

// Retry function with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 2, // Reduced from 3 to 2 since exhausted quota won't help
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  let lastRetryDelay: number | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // If quota is exhausted, don't retry - it won't help until quota resets
      if (isQuotaError(error) && isQuotaExhausted(error)) {
        console.log('Quota completely exhausted (limit: 0). Skipping retries.');
        throw error;
      }
      
      // If it's a quota error and we have retries left, wait and retry
      if (isQuotaError(error) && attempt < maxRetries) {
        // Always use the API's suggested delay if available, otherwise use exponential backoff
        const suggestedDelay = getRetryDelay(error);
        const delay = suggestedDelay > 1000 ? suggestedDelay : baseDelay * Math.pow(2, attempt);
        lastRetryDelay = delay;
        
        console.log(`Quota error encountered. Retrying in ${Math.round(delay / 1000)}s (attempt ${attempt + 1}/${maxRetries + 1})...`);
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
      const isExhausted = isQuotaExhausted(error);
      console.error('Gemini API quota exceeded:', error.message);
      
      const quotaMessage = isExhausted
        ? `I apologize, but I've reached my daily usage limit. The quota will reset soon. Please try again later, or reach out to HERlytics directly through our contact form for immediate assistance.`
        : `I apologize, but I'm currently experiencing high demand. Please try again in a few moments. If the issue persists, you can reach out to HERlytics directly through our contact form for immediate assistance.`;
      
      return {
        role: 'assistant',
        content: `${quotaMessage}

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
