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
    tools: {
      functionDeclarations: [selectCategories, generateDefinition],
    },
  });

  const prompt = `${data.text}`;
  const result = await model.generateContent(prompt);
  const call = result.response.functionCalls()[0];
  console.log(call);
  return NextResponse.json({ data: call }, { status: 200 });
});

const selectCategories = {
  name: "selectCategories",
  parameters: {
    type: "OBJECT",
    description: "Select categories to filter the books.",
    properties: {
      categories: {
        type: "ARRAY",
        description: "The categories to filter the books.",
        items: {
          type: "STRING",
        },
      },
    },
  },
};

const generateDefinition = {
  name: "generateDefinition",
  parameters: {
    type: "OBJECT",
    description: "Generate a definition for a word.",
    properties: {
      text: {
        type: "STRING",
        description: "The word to generate a definition for it",
      },
    },
    required: ["text"],
  },
};
