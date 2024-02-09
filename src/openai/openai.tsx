import {OpenAI,} from 'openai';
const apiKey= process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
export const chatGpt = new OpenAI({apiKey});