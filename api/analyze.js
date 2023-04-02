const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const analyzeContract = async (contractText) => {
  try {
    const prompt = `Analyze the following contract and summarize its main points, highlight anything that could potentially help the user and anything that could be dangerous to the user, also provide suggestions to improve the contract:\n\n${contractText}\n`;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in analyzing contract:', error);
    throw error;
  }
};

module.exports = analyzeContract;
