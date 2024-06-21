"use client";
import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Select from "../inputs/select";
import { validateNotEmpty } from "@/libs/validations/validations";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
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
  const [xaxis, setXaxis] = useState<any[]>([]);
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [range, setRange] = useState("week");

  useEffect(() => {
    setIsLoading(true);
    loadStats();
  }, [range]);

  const handleChange = (e: any) => {
    setRange(e.target.value);
  };

  const loadStats = async () => {
    try {
      const response = await fetch(
        `../api/books/stats?idBook=${id}&range=${range}`
      );
      const data: ResponseData<any> = await response.json();
      if (data.error) {
        handleShowToast(data.message!, ToastType.ERROR);
      } else {
        const xaxis: any[] = data.data.map(
          (item: any) => item.name.charAt(0).toUpperCase() + item.name.slice(1)
        );
        const seriesData: any[] = data.data.map((item: any) => item.value);
        setXaxis(xaxis.reverse());
        setSeriesData(seriesData.reverse());
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
        <div className="relative text-2xl text-primary-500 font-bold lg:before:content-[''] lg:before:block md:before:absolute lg:before:absolute xl:before:absolute before:h-full before:w-1 before:bg-primary-500 before:left-0">
          <span className="xl:ps-2 lg:ps-2 md:ps-2">Estadísticas del libro</span>
        </div>
      </div>
      <div className="w-64">
        <Select
          label="Filtro de fecha"
          name="range"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-iconBgColor"
            >
              <path
                fillRule="evenodd"
                d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                clipRule="evenodd"
              />
            </svg>
          }
          value={range}
          options={[
            { value: "week", label: "Semanal" },
            { value: "month", label: "Mensual" },
            { value: "year", label: "Anual" },
          ]}
          placeholder="Seleccione un rango"
          onChange={handleChange}
          validations={[validateNotEmpty]}
        ></Select>
      </div>
      <ApexChart
        options={{
          chart: {
            id: "chart",
            zoom: { autoScaleYaxis: false, enabled: false },
          },
          markers: {
            size: 4,
          },
          xaxis: {
            categories: xaxis,
          },
          stroke: {
            curve: "smooth",
          },
        }}
        series={[{ name: "Vistas", data: seriesData }]}
        type="line"
        height={350}
        width={"100%"}
      />
    </div>
  );
};

export default LineChart;
