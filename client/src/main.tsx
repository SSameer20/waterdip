import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, NextUIProvider } from "@nextui-org/react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import App from "./App.tsx";
import "./index.css";

type Theme = "dark" | "light";

const MainApp = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const handleTheme = () => {
    setTheme((state) => {
      if (state === "light") return "dark";
      return "light";
    });
  };

  return (
    <NextUIProvider>
      <main
        className={`${theme} text-foreground bg-background w-full h-screen`}
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
        <App theme={theme} />
      </main>
    </NextUIProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
