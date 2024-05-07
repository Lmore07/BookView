import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export const POST = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDUpQOlXtL6O-Omdab-eBUOA0HHupVZF3o"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    tools: {
      functionDeclarations: [
        selectCategories,
        generateDefinition,
        removeCategories,
        setInputText,
        sortBooks,
      ],
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

const setInputText = {
  name: "setInputText",
  parameters: {
    type: "OBJECT",
    description: "Set the text of an input.",
    properties: {
      inputName: {
        type: "STRING",
        description: "The name of the input to set the text in.",
      },
      text: {
        type: "STRING",
        description: "The text to set in the input.",
      },
    },
  },
};

const sortBooks = {
  name: "sortBooks",
  parameters: {
    type: "OBJECT",
    description: "Sort the books by a field and order.",
    properties: {
      sortBy: {
        type: "STRING",
        description:
          "The field to sort the books by. Can be 'book' or 'author' or 'publicationDate'.",
      },
      order: {
        type: "STRING",
        description:
          "The order to sort the books in. Can be 'asc' for ascending order or 'desc' for descending order.",
      },
    },
    required: ["sortBy", "order"],
  },
};

const removeCategories = {
  name: "removeCategories",
  parameters: {
    type: "OBJECT",
    description: "Remove categories to filter the books.",
    properties: {
      categories: {
        type: "ARRAY",
        description: "The categories to remove from the books.",
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
