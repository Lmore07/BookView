import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const slug = params.id;
  console.log("Parametros", params);
  return NextResponse.json({ data: { id: slug } }, { status: 200 });
}
