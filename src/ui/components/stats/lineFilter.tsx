import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";

interface LineChartProps {
  id: number;
  onViewClick?: (item: any) => void;
}

const LineChart: React.FC<LineChartProps> = ({ id, onViewClick }) => {
  const handleViewClick = (item: any) => {
    onViewClick?.(item);
  };
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;
  const [xaxis, setXaxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const range = "year";

  useEffect(() => {
    console.log("ID: ", id);
    setIsLoading(true);
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch(
        `../api/books/stats?idBook=${id}&range=${range}`
      );
      const data: ResponseData<any> = await response.json();
      if (data.error) {
        handleShowToast(data.message!, ToastType.ERROR);
      } else {
        if (range == "year") {
          const xaxis = data.data.map(
            (item: any) =>
              item.month.charAt(0).toUpperCase() + item.month.slice(1)
          );
          const seriesData = data.data.map((item: any) => item.countViews);
          setXaxis(xaxis);
          setSeriesData(seriesData);
        } else {
          const xaxis = data.data.map(
            (item: any) => item.day.charAt(0).toUpperCase() + item.day.slice(1)
          );
          const seriesData = data.data.map((item: any) => item.countViews);
          setXaxis(xaxis);
          setSeriesData(seriesData);
        }
      }
    } catch (error) {
      handleShowToast("", ToastType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-2xl p-4 mt-10 rounded-lg">
      <div className="flex flex-wrap justify-between mb-5">
        <h2 className="relative text-2xl text-primary-500 font-bold before:content-[''] before:block before:absolute before:h-full before:w-1 before:bg-primary-500 before:left-0">
          <span className="ps-2">Estadisticas del libro</span>
        </h2>
      </div>
      <Chart
        options={{
          chart: {
            id: "chart",
            zoom: { autoScaleYaxis: false, enabled: false },
          },
          xaxis: {
            categories: xaxis,
          },
        }}
        series={[{ name: "vistas", data: seriesData }]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
