import Adult from "./components/Adult";
import Children from "./components/Children";
import Navigation from "./components/Navigation";
import Total from "./components/Total";
import Visitors from "./components/Visitors";
type Theme = "dark" | "light";
function App({ theme }: { theme: Theme }) {
  return (
    <div className="flex flex-col w-full h-screen gap-5">
      <div className="navigation w-full h-[10vh]">
        <Navigation />
      </div>
      <div className="home px-[10vw] flex flex-col gap-5 h-[100vh] overflow-y-scroll">
        <span className="text-3xl font-bold">Dashboard</span>
        <div
          className={`w-[100%] h-[80vh] border-2 ${
            theme === "light" ? "border-red" : "border-red"
          } flex flex-col p-1 gap-1`}
        >
          <div className="l1 w-[100%] h-[50vh] flex flex-row gap-2">
            <div className="total w-[60%] h-[100%] border-[1px]">
              <Total />
            </div>
            <div className="visitors w-[40%] h-[100%] border-[1px]">
              <Visitors />
            </div>
          </div>
          <div className="l2 w-[100%] h-[40vh] flex flex-row gap-2">
            <div className="adult w-[50%] h-[100%] border-[1px]">
              <Adult />
            </div>
            <div className="children w-[50%] h-[100%] border-[1px]">
              <Children />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
