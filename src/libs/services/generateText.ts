import {
  HarmBlockThreshold,
  HarmCategory,
  GoogleGenerativeAI,
} from "@google/generative-ai";

export async function generateText(text: string) {
  const genAI = new GoogleGenerativeAI(`${process.env.API_KEY_GEMINI}`);
  const model = genAI.getGenerativeModel({
    model: process.env.MODEL_GEMINI ?? "gemini-1.0-pro",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  const prompt = `Quiero una definición corta, clara y sencilla, sobre la palabra: '${text}'`;
  const result = await model.generateContent(prompt);
  const textResult = result.response.text();
  return textResult;
}
