import { useEffect, useState } from "react";
import { HotelData } from "./types";
import ApexCharts from "apexcharts";

interface DataDictonary {
  [key: string]: number;
}

export default function Adult({ data }: { data: HotelData[] }) {
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number[]>([]);

  const calculateTotalVisit = async (data: HotelData[]) => {
    const countryMap: DataDictonary = {};
    data.forEach((item) => {
      if (item.adults) {
        const key = `${item.adults}`;

        if (countryMap[key] === undefined) {
          countryMap[key] = 0;
        }
        countryMap[key] += item.adults || 0;
        setCount((prev) => {
          return prev + (item.adults || 0);
        });
      }
    });

    const countValues = Object.values(countryMap);
    setTotal([...countValues]);
  };

  useEffect(() => {
    calculateTotalVisit(data);
  }, [data]);
  useEffect(() => {
    var options = {
      series: [
        {
          data: total,
        },
      ],
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0,
      },
      colors: ["#DCE6EC"],
      title: {
        text: count.toString(),
        offsetX: 0,
        style: {
          fontSize: "24px",
        },
      },
      subtitle: {
        text: "Total Adult Visitors",
        offsetX: 0,
        style: {
          fontSize: "14px",
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#AdultChart"), options);
    chart.render();
    return () => chart.destroy();
  }, [total, count]);

  return (
    <div className="w-full h-full p-5 flex flex-col justify-center items-center">
      <div id="AdultChart" className="w-[100%] h-[100%]"></div>
    </div>
  );
}
