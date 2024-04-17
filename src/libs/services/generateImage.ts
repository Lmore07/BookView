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

export async function saveAudio(audio: any): Promise<string> {
  const timestamp = new Date().getTime();
  const extension = audio.type.split("/")[1];
  const filename = `audio_${timestamp}.${extension}`;
  console.log("Audio: ", filename);
  const storageRef = ref(storage, `pages/audios/${filename}`);
  await uploadBytes(storageRef, audio);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function saveImage(image: any): Promise<string> {
  const timestamp = new Date().getTime();
  const extension = image.type.split("/")[1];
  const filename = `image_${timestamp}.${extension}`;
  console.log("Imagen: ", filename);
  const storageRef = ref(storage, `pages/images/${filename}`);
  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function saveVideo(video: any): Promise<string> {
  if (typeof video === "string") {
    return video;
  } else {
    const timestamp = new Date().getTime();
    const extension = video.type.split("/")[1];
    const filename = `video_${timestamp}.${extension}`;
    console.log("Video: ", filename);
    const storageRef = ref(storage, `pages/videos/${filename}`);
    await uploadBytes(storageRef, video);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}
