import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();
  const options = {
    method: "POST",
    headers: {
      "xi-api-key": "c5943e12f0d17a95d1864fc1d8ee0f17",
      "Content-Type": "application/json",
    },
    body: `{"text":"${data.text}","voice_settings":{"stability":0.75,"similarity_boost":0.5,"style":0,"use_speaker_boost":true},"model_id":"eleven_multilingual_v2"}`,
  };
  fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/5Q0t7uMcjvnagumLfvZi",
    options
  )
    .then((response) => console.log(response.body))
    .catch((err) => console.error(err));
  return NextResponse.json({ data: { url: "url" } }, { status: 200 });
});
