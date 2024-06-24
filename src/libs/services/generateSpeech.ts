export async function generateSpeech(text: string) {
  const body = {
    text: text,
    voice_settings: {
      stability: 0.75,
      similarity_boost: 0.5,
      style: 0,
      use_speaker_boost: true,
    },
    model_id: "eleven_multilingual_v2",
  };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "xi-api-key": `${process.env.E_LABS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "force-cache",
    keepalive: true,
  };
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.E_LABS_VOICE}`,
    options
  );
  const result = await response.arrayBuffer();
  return result;
}
