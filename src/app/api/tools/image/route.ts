import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";


export const POST = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();
  console.log(data);
  console.log(storage);
  return NextResponse.json({ data: data }, { status: 200 });
});
