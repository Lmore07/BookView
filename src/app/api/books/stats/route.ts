import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { format, isSameDay, isSameMonth, subMonths, subDays } from "date-fns";
import { es } from "date-fns/locale";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const url = new URL(request.url);
  const range = url.searchParams.get("range") ?? "total";
  const idBook = parseInt(url.searchParams.get("idBook") ?? "0", 10);

  if (!idBook) {
    return NextResponse.json(
      { error: "No se proporcionó un libro" },
      { status: 404 }
    );
  }

  const now = new Date();
  const views = await prisma.viewBooks.findMany({
    where: {
      idBook: idBook,
      dateView: {
        gte:
          range == "week"
            ? subDay(now, 7)
            : range == "month"
            ? subMonth(now, 1)
            : range == "year"
            ? subYear(now, 1)
            : undefined,
      },
    },
  });
  const formattedViews = formatViews(views, range);
  return NextResponse.json(
    { data: formattedViews, message: "Libros hallados" },
    { status: 200 }
  );
});

function formatViews(views: any, range: string) {
  if (range == "week") {
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      subDays(new Date(), i)
    );
    const formattedViews = last7Days.map((day) => {
      const dayName = format(day, "eeee", { locale: es });
      const countViews = views.filter((view: any) =>
        isSameDay(view.dateView, day)
      ).length;

      return {
        name: dayName,
        value:countViews,
      };
    });

    return formattedViews;
  } else if (range == "month") {
    const last30Days = Array.from({ length: 30 }, (_, i) =>
      subDays(new Date(), i)
    );

    const formattedViews = last30Days.map((day) => {
      const dayName = format(day, "dd", { locale: es });
      const countViews = views.filter((view: any) =>
        isSameDay(view.dateView, day)
      ).length;

      return {
        name: dayName,
        value:countViews,
      };
    });

    return formattedViews;
  } else if (range == "year") {
    const last12Months = Array.from({ length: 12 }, (_, i) =>
      subMonths(new Date(), i)
    );

    // Formatea cada mes a su nombre de mes en español y cuenta las visitas.
    const formattedViews = last12Months.map((month) => {
      const monthName = format(month, "MMMM", { locale: es });
      const countViews = views.filter((view: any) =>
        isSameMonth(view.dateView, month)
      ).length;

      return {
        name: monthName,
        value:countViews,
      };
    });

    return formattedViews;
  }
}

function subDay(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function subMonth(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
}

function subYear(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() - years);
  return result;
}
