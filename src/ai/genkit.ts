import 'dotenv/config';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

let aiInstance: ReturnType<typeof genkit> | null = null;

export function getAi() {
  if (!aiInstance) {
    // Get API key from environment
    // Next.js automatically loads .env.local, but dotenv/config ensures it's loaded
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error('ERROR: GEMINI_API_KEY not found in environment variables');
      console.error('Please ensure .env.local exists in the project root with: GEMINI_API_KEY=your_key_here');
      throw new Error('GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required. Please set it in .env.local and restart your dev server.');
    }

    aiInstance = genkit({
      plugins: [
        googleAI({
          apiKey: apiKey,
        }),
      ],
      model: 'googleai/gemini-2.0-flash',
    });
  }
  return aiInstance;
}

// Note: Use getAi() function instead of exporting 'ai' directly
// This avoids build-time errors when API key is not available during build
