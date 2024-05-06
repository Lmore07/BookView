import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export const POST = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDUpQOlXtL6O-Omdab-eBUOA0HHupVZF3o"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
  });
  const prompt = `Quiero una definición corta, clara y sencilla, sobre la palabra: '${data.text}'`;
  const result = await model.generateContent(prompt);
  const textResult = result.response.text();
  return NextResponse.json({ data: { text: textResult } }, { status: 200 });
});
