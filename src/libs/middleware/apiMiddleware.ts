import { ResponseData } from "@/libs/interfaces/response.interface";
import { NextRequest, NextResponse } from "next/server";

export function apiMiddleware(
  handler: (req: NextRequest, params: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, params: any) => {
    try {
      const res = await handler(req, params);
      const data: ResponseData = await res.json();
      if (res.status == 200 || res.status == 201) {
        return NextResponse.json(
          {
            message: data.message || "Realizado correctamente",
            statusCode: data.statusCode || res.status,
            data: data.data,
            pagination: data.pagination,
          },
          { status: res.status }
        );
      }

      return NextResponse.json(
        {
          message: data.message,
          statusCode: data.statusCode || res.status,
          error: data.error || "Error",
          data: data.data,
        },
        { status: data.statusCode ?? res.status }
      );
    } catch (e: any) {
      return NextResponse.json(
        {
          message: "Error",
          statusCode: 500,
          error: e.message,
        },
        { status: 500 }
      );
    }
  };
}
