import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { convertToText } from "@/libs/services/convertToText";
import { put } from "@vercel/blob";

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

  const tempDir = path.join(process.cwd(), "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  try {
    const fileExtension = path.extname(audioFile.name);
    const bytes = await audioFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uuid = uuidv4();
    /*const filePath = path.join(tempDir, `${uuid}${fileExtension}`);
    fs.writeFileSync(filePath, buffer);*/
    const blob = await put(`${uuid}${fileExtension}`, audioFile, {
      access: "public",
      token: process.env.VERCEL_TOKEN ?? "",
      multipart: true,
    });
    console.log("Blob", blob);
    try {
      text = await convertToText(uuid, blob.pathname, audioFile.type);
    } finally {
      await fs.unlink(blob.pathname, (err) => {
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
