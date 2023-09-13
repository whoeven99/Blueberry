require('dotenv').config();

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const client = new OpenAIClient(
  "https://stp-openai-ppe.openai.azure.com/", 
  new AzureKeyCredential(process.env.OPENAI_API_KEY)
);

async function chatCall(message) {
  console.log("chat start ", message);
  const { choices, error } = await client.getCompletions("gpt35", [message]);
  console.log("chat res ", choices);
  return choices[0].text;
}

module.exports = {
    chatCall
};