const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  console.log('Using API Key:', apiKey ? 'Present' : 'Missing');
  
  if (!apiKey) {
    console.error('API Key is missing!');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    console.log('Sending test message...');
    const result = await model.generateContent('Hola');
    const response = await result.response;
    const text = response.text();
    console.log('Response:', text);
    console.log('Test successful!');
  } catch (error) {
    console.error('Test failed!');
    console.error(error);
  }
}

test();
