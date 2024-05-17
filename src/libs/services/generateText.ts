const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function generateText(text: string) {
  const genAI = new GoogleGenerativeAI(
    `AIzaSyDUpQOlXtL6O-Omdab-eBUOA0HHupVZF3o`
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Quiero una definición corta, clara y sencilla, sobre la palabra: '${text}'`;
  const result = await model.generateContent(prompt);
  const textResult = result.response.text();
  return textResult;
}
