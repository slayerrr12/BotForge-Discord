const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const prompt = `Tell me a quote (${new Date().toISOString()})`;
async function generateQoute() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.4,
    max_tokens: 1000,
    
  });

  const quote = response.data.choices[0].text.trim();
  return quote;
}

module.exports = {
    generateQoute
}
