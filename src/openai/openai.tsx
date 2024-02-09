import {OpenAI,} from 'openai';
const apiKey= process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
const baseUrl = "https://api.openai.com/v1/engines/davinci/completions";
export const chatGpt = new OpenAI({apiKey:apiKey});