import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();
  const date = new Date();
  const timestamp = date.getTime();
  const filename = `image_${timestamp}.png`;
  const storageRef = ref(storage, `folders/${filename}`);
  var inputs = {
    inputs: `Una imagen clara y concisa a color, solo mediante objetos, sin letras o palabras, que represente: "${data.text}"`,
  };
  const response = await fetch(
    "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(inputs),
    }
  );
  const result = await response.blob();
  const uploadTask = await uploadBytes(storageRef, result);
  const url = await getDownloadURL(uploadTask.ref);
  return NextResponse.json({ data: { url: url } }, { status: 200 });
});
