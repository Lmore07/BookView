import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/files";

export async function convertToText(
  name: string,
  path: string,
  mimeType: string
) {
  const genAI = new GoogleGenerativeAI(`${process.env.API_KEY_GEMINI}`);
  const model = genAI.getGenerativeModel({
    model: process.env.MODEL_GEMINI ?? "gemini-1.5-flash",
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

  const files = [await uploadToGemini(path, mimeType, name)];

  const chat = model.startChat();

  const result = await chat.sendMessage([
    {
      fileData: {
        mimeType: files[0].mimeType,
        fileUri: files[0].uri,
      },
    },
    {
      text: "Quiero que transcribas el audio a texto en formato de oración, respetando puntuaciones, signos y caracteres especiales. Debes ser capaz de reconocer números, caracteres especiales como (@, $, %, &, +, -, *, /, ., #), si detectas correos electrónicos transcribe todo en minúscula y unido, es decir cualquier cosa dicha por un humano debes saber interpretarla como si fueras tu también un humano. Evita colocar saltos de linea, hazlo todo en una misma linea",
    },
  ]);
  return result.response.text();
}

export async function uploadToGemini(
  path: string,
  mimeType: string,
  name: string
) {
  const fileManager = new GoogleAIFileManager(`${process.env.API_KEY_GEMINI}`);
  console.log("File manager", await fileManager.listFiles());

  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: "audio",
    name,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  fileManager.deleteFile(file.name);
  return file;
}
