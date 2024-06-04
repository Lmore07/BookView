import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config";
import { v4 as uuidv4 } from 'uuid';

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

export async function saveAudio(audio: any): Promise<string | null> {
  if (typeof audio === "string") {
    return audio;
  }
  if (audio != null) {
    const extension = audio.name.split('.').pop() || 'mp3';
    const uuid = uuidv4();
    const filename = `image_${uuid}.${extension}`;
    const storageRef = ref(storage, `pages/audios/${filename}`);
    const file = new File([audio], filename, { type: extension });
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } else {
    return null;
  }
}

export async function saveImage(image: any, action?: string): Promise<string | null> {
  if (typeof image === "string") {
    return image;
  }
  if (image != null) {
    const extension = image.name.split('.').pop() || 'jpg';
    const uuid = uuidv4();
    const filename = `image_${uuid}.${extension}`;
    const storageRef = ref(storage, `pages/images/${filename}`);
    const file = new File([image], filename, { type: extension });
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } else {
    return null;
  }
}

export async function saveVideo(video: any): Promise<string | null> {
  if (typeof video === "string") {
    return video;
  } else {
    if (video != null) {
      const extension = video.name.split('.').pop() || 'mp4';
      const uuid = uuidv4();
      const filename = `image_${uuid}.${extension}`;
      const storageRef = ref(storage, `pages/videos/${filename}`);
      const file = new File([video], filename, { type: extension });
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    }
    return null;
  }
}
