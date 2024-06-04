// middleware.ts
import { cookies } from "next/headers";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { DataLogin, RolEnum } from "./libs/interfaces/user.interface";
import TokenService from "./libs/services/TokenService";

const readerRoutes = ["/reader"];
const creatorRoutes = ["/creator"];
const adminRoutes = ["/admin"];
const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = cookies().get("token")?.value;
  const { pathname } = req.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const tokenInfo: DataLogin = (await TokenService.decode(token)).payload
        .data;
      switch (tokenInfo.role) {
        case RolEnum.ADMIN:
          return NextResponse.redirect(new URL("/admin", req.url));
        case RolEnum.CREATOR:
          return NextResponse.redirect(new URL("/creator", req.url));
        case RolEnum.READER:
          return NextResponse.redirect(new URL("/reader", req.url));
        default:
          console.log("rol no encontrado");
          break;
      }
    } else {
      return NextResponse.next();
    }
  }

  if (readerRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const tokenInfo: DataLogin = (await TokenService.decode(token)).payload
        .data;
      if (tokenInfo.role == RolEnum.READER) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (creatorRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const tokenInfo: DataLogin = (await TokenService.decode(token)).payload
        .data;
      if (tokenInfo.role == RolEnum.CREATOR) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const tokenInfo: DataLogin = (await TokenService.decode(token)).payload
        .data;
      if (tokenInfo.role == RolEnum.ADMIN) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/register",
    "/reader/:path*",
    "/creator/:path*",
    "/admin/:path*",
    "/:path*/api",
  ],
};
