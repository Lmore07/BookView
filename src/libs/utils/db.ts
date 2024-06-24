import Dexie from "dexie";

interface Audio {
  url: string;
  audioData: ArrayBuffer;
}

class AudioCacheDB extends Dexie {
  audios: Dexie.Table<Audio, string>;

  constructor() {
    super("AudioCacheDB");
    this.version(1).stores({
      audios: "url",
    });
    this.audios = this.table("audios");
  }
}

const db = new AudioCacheDB();
export default db;
