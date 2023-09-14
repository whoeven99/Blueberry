require('dotenv').config();

const { OpenAIClient, AzureKeyCredential, ChatMessage } = require("@azure/openai");
const fs = require("fs");

const client = new OpenAIClient(
  "https://stp-openai-ppe.openai.azure.com/", 
  new AzureKeyCredential(process.env.OPENAI_API_KEY)
);

const chatHistory = {};

async function chatCall(message) {
  console.log("chat start ", message[0].content);
  const { choices, error } = await client.getChatCompletions("gpt35", message, {maxTokens: 256, temperature: 0.55});
  console.log("chat res ", choices);
  return choices[0];
}

const generatePrompt = (username, characterName, message) => {
    if(!chatHistory[username + '_' + characterName]) {
        const buffer = fs.readFileSync("data/" + characterName);
        const fileContent = buffer.toString();
        const messages = fileContent.split('|');
        chatHistory[username + '_' + characterName] = [];
        chatHistory[username + '_' + characterName].push({role: "user", content: messages[0]});
        chatHistory[username + '_' + characterName].push({role: "system", content: messages[1]});
    }

    chatHistory[username + '_' + characterName].push({role: "user", content: message});
    return chatHistory[username + '_' + characterName];
}

const updateHistory = (username, characterName, question, answer) => {
    chatHistory[username + '_' + characterName].push({role: "system", content: answer});
}

module.exports = {
    chatCall,
    generatePrompt,
    updateHistory
};