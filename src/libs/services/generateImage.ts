import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config";

export async function generateImage(text: string): Promise<string> {
  const timestamp = new Date().getTime();
  const filename = `image_${timestamp}.jpeg`;
  const storageRef = ref(storage, `folders/${filename}`);
  var inputs = {
    inputs: `Una imagen clara y concisa a color, solo mediante objetos, sin letras o palabras, que represente: "${text}"`,
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
  await uploadBytes(storageRef, result);
  const url = await getDownloadURL(storageRef);
  return url;
}
