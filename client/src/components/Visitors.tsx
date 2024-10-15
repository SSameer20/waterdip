import { useEffect, useState, useRef } from "react";
import { HotelData } from "./types";
import Chart from "chart.js/auto";

interface DataDictonary {
  [key: string]: number;
}

export default function Country({ data }: { data: HotelData[] }) {
  const [country, setCountry] = useState<string[]>([]);
  const [total, setTotal] = useState<number[]>([]);
  const chartRef = useRef<Chart | null>(null);

  const calculateTotalVisit = async (data: HotelData[]) => {
    const countryMap: DataDictonary = {};
    data.forEach((item) => {
      if (item.country) {
        const key = `${item.country}`;

        if (countryMap[key] === undefined) {
          countryMap[key] = 0;
        }
        countryMap[key] +=
          (item.adults || 0) + (item.babies || 0) + (item.children || 0);
      }
    });

    const keyValues = Object.keys(countryMap);
    setCountry([...keyValues]);
    const countValues = Object.values(countryMap);
    setTotal([...countValues]);
  };

  useEffect(() => {
    calculateTotalVisit(data);
  }, [data]);

  useEffect(() => {
    const ctx = document.getElementById(
      "CountryChart"
    ) as HTMLCanvasElement | null;

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: country,
          datasets: [
            {
              label: "Total Visitors by Country",
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
  }, [country, total]);

  return (
    <div className="w-full h-full p-5 flex flex-col justify-center items-center">
      <canvas id="CountryChart" className="w-[100%] h-[100%]"></canvas>
    </div>
  );
}
