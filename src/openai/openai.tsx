import {OpenAI,} from 'openai';
const apiKey= process.env.OPENAI_API_KEY || "";
// console.log("Open api Key ",apiKey);
export const chatGpt = new OpenAI({apiKey});    