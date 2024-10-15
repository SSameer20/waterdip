import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { Spinner } from "@nextui-org/react";
// import { Skeleton } from "@nextui-org/skeleton";
import Total from "./components/Total";
// import Children from "./components/Children";
// import Adult from "./components/Adult";
// import Visitors from "./components/Visitors";
import { Button } from "@nextui-org/react";
import { data } from "./data/data";
import { HotelData, Theme } from "./components/types";
import Country from "./components/Visitors";
import Adult from "./components/Adult";
import Children from "./components/Children";

const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function App({ theme }: { theme: Theme }) {
  const [start, setStart] = useState<Date>(new Date("2015-01-01"));
  const [end, setEnd] = useState<Date>(new Date("2016-01-01"));
  const [load, setLoad] = useState<boolean>(false);

  const [hotelData, setHotelData] = useState<HotelData[]>([]);
  const fetchData = async (startDate: Date, endDate: Date) => {
    setLoad(true);
    const newFilteredData: HotelData[] = data.filter((item) => {
      if (item) {
        const month =
          monthMap[item.arrival_date_month as keyof typeof monthMap];
        const dt = new Date(
          item.arrival_date_year || 2015,
          month,
          item.arrival_date_day_of_month
        );
        return dt >= startDate && dt <= endDate;
      }
    });
    if (newFilteredData.length < 1) {
      setLoad(false);
      return alert("No Data Availbale on Selected Dates");
    }

    setHotelData([...newFilteredData]);
    setLoad(false);
  };
  useEffect(() => {
    fetchData(start, end);
    console.log(hotelData);
  }, [start, end]);

  return (
    <div className="flex flex-col w-full h-[150vh] gap-5 overflow-y-auto">
      <div className="navigation w-full h-[10vh]">
        <Navigation />
      </div>

      <div className="home px-[10vw] flex flex-col gap-5 min-h-[100vh]">
        <span className="text-3xl font-bold">Dashboard</span>
        <span className="flex flex-row justify-start items-center gap-5">
          <div className="flex flex-row gap-5 border-[1px] rounded-[25px] border-[rgba(0,0,0,0.4)] px-5 py-5">
            <div className="date flex flex-col gap-2">
              <label htmlFor="startDate" className="text-xl font-bold">
                Start date
              </label>
              <input
                type="date"
                id="startDate"
                min="2015-01-01"
                max="2016-01-01"
                defaultValue={"2015-01-01"}
                value={start.toISOString().split("T")[0]}
                onChange={(e) => setStart(new Date(e.target.value))}
                className="bg-transparent px-3 py-2 border-[1px] rounded-[5px] hover:bg-[rgba(255,255,255,0.4)] hover:text-black"
              />
            </div>
            <div className="date flex flex-col gap-2">
              <label htmlFor="endDate" className="text-xl font-bold">
                End date
              </label>
              <input
                type="date"
                id="endDate"
                min="2015-01-01"
                max="2016-01-01"
                defaultValue={"2015-12-31"}
                value={end.toISOString().split("T")[0]}
                onChange={(e) => setEnd(new Date(e.target.value))}
                className="bg-transparent px-3 py-2 border-[1px] rounded-[5px] hover:bg-[rgba(255,255,255,0.4)] hover:text-black"
              />
            </div>
          </div>
          <Button color={theme === "light" ? "secondary" : "default"}>
            Search
          </Button>
        </span>
        <div
          className={`w-[100%] h-[100vh] border-2 overflow-y-scroll flex flex-col p-1 gap-1`}
        >
          <div className="flex flex-row h-[50vh] w-[100%] gap-1">
            <div className="flex flex-col grow basis-2/3 justify-center items-center border-1">
              {load ? <Spinner size="lg" /> : <Total data={hotelData} />}
            </div>
            <div className="flex flex-col shrink basis-1/2 justify-center items-center border-1">
              {load ? <Spinner size="lg" /> : <Country data={hotelData} />}
            </div>
          </div>
          <div className="flex flex-row h-[50vh] w-[100%] gap-1">
            <div className="flex flex-col grow basis-1 justify-center items-center border-1">
              {load ? <Spinner size="lg" /> : <Adult data={hotelData} />}
            </div>
            <div className="flex flex-col basis-1/2 justify-center items-center border-1">
              {load ? <Spinner size="lg" /> : <Children data={hotelData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
