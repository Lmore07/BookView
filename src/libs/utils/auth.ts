import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import TokenService from "../services/TokenService";
import { DataLogin } from "../interfaces/user.interface";

export const withAuth = async (request: NextRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json(
      { message: "Falta el token de autorización" },
      { status: 401 }
    );
  }

  if (TokenService.verify(token.value) === false) {
    return NextResponse.json(
      { message: "Token de autorización inválido" },
      { status: 401 }
    );
  }
  const decoded: DataLogin = (await TokenService.decode(token.value)).payload
    .data;
  const userId = decoded.id;
  const requestWithUserId: NextRequestWithUserId =
    request.clone() as NextRequestWithUserId;
  requestWithUserId.userId = userId;
  return requestWithUserId;
};

interface NextRequestWithUserId extends NextRequest {
  userId: number;
}
