import ApexCharts from "apexcharts";
import { data } from "../data/data"; // Ensure the data import is correct
import { useEffect } from "react";

export default function Total() {
  return (
    <div className="w-full h-full p-5 flex flex-col justify-center items-center">
      <div id="visitorsChart" className="w-[100%] h-[100%]"></div>
    </div>
  );
}
