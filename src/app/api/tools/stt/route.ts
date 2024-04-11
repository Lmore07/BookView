import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const data = readFileSync("./src/app/api/stt/audio.flac");
  const response = await fetch(
    "https://api-inference.huggingface.co/models/openai/whisper-large-v2",
    {
      body: data,
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
      },
    }
  );
  const result = await response.json();
  return NextResponse.json({ data: result }, { status: 200 });
});