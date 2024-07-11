import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { convertToText } from "@/libs/services/convertToText";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const formData = await request.formData();
  const audioFile = formData.get("audio") as File;
  var text = "";
  if (!audioFile) {
    return NextResponse.json(
      { error: "No se agrego un archivo de audio" },
      { status: 400 }
    );
  }

  let tempDir=fs.mkdtempSync('/tmp');
  console.log(tempDir);

  try {
    const fileExtension = path.extname(audioFile.name);
    const bytes = await audioFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uuid = uuidv4();
    const filePath = path.join(tempDir, `${uuid}${fileExtension}`);
    fs.writeFileSync(filePath, buffer);

    try {
      text = await convertToText(uuid, filePath, audioFile.type);
    } finally {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log("path was deleted");
      });
    }

    return NextResponse.json(
      { message: "Success", data: [{ text }] },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
});
