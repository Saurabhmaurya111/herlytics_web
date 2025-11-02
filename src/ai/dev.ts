import 'dotenv/config';
import { getAi } from './genkit';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
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

  // Generate response using the model
  const ai = getAi();
  const response = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt: conversationContext,
  });

  // Extract text from response
  const responseText = response.text || 
                       'I apologize, but I couldn\'t generate a response. Please try again.';

  return {
    role: 'assistant',
    content: responseText,
  };
}
