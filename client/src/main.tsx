import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, NextUIProvider } from "@nextui-org/react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./components/Home.tsx";

type Theme = "dark" | "light";

const MainApp = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const handleTheme = () => {
    setTheme((state) => {
      if (state === "light") return "dark";
      return "light";
    });
  };

  return (
    <main
      className={`${theme} text-foreground bg-background w-full min-h-[100vh]`}
    >
      <Button
        className="absolute top-5 right-5"
        color={theme === "light" ? "primary" : "default"}
        onClick={handleTheme}
      >
        {theme === "light" ? (
          <span className="flex flex-row gap-2 justify-center items-center">
            <FaRegLightbulb /> Light
          </span>
        ) : (
          <span className="flex flex-row gap-2 justify-center items-center">
            <FaLightbulb /> Dark
          </span>
        )}
      </Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App theme={theme} />} />
      </Routes>
    </main>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <MainApp />
      </NextUIProvider>
    </BrowserRouter>
  </StrictMode>
);
