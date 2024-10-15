import { useEffect, useState, useRef } from "react";
import { HotelData } from "./types";
import Chart from "chart.js/auto";

interface DataDictonary {
  [key: string]: number;
}

export default function Total({ data }: { data: HotelData[] }) {
  const [date, setDate] = useState<string[]>([]);
  const [total, setTotal] = useState<number[]>([]);
  const chartRef = useRef<Chart | null>(null); // Using useRef to store the chart instance

  const calculateTotalVisit = async (data: HotelData[]) => {
    const DateMap: DataDictonary = {};
    data.forEach((item) => {
      if (
        item.arrival_date_year &&
        item.arrival_date_month &&
        item.arrival_date_day_of_month
      ) {
        const key = `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`;

        if (DateMap[key] === undefined) {
          DateMap[key] = 0;
        }
        DateMap[key] +=
          (item.adults || 0) + (item.babies || 0) + (item.children || 0);
      }
    });

    const keyValues = Object.keys(DateMap);
    setDate([...keyValues]);
    const countValues = Object.values(DateMap);
    setTotal([...countValues]);
  };

  useEffect(() => {
    calculateTotalVisit(data);
  }, [data]);

  useEffect(() => {
    const ctx = document.getElementById(
      "visitorsChart"
    ) as HTMLCanvasElement | null;

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: "Total Visitors",
              data: total,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [date, total]);

  return (
    <div className="w-full h-full p-5 flex flex-col justify-center items-center">
      <canvas id="visitorsChart" className="w-[100%] h-[100%]"></canvas>
    </div>
  );
}
