import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import React from "react";
import { ThemeContext } from "../store/context/ThemeContext";

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2 self-center">
      {theme === "dark" ? (
        <SunIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-5 h-5 text-gray-900 dark:text-white text-2xl cursor-pointer"
        />
      ) : (
        <MoonIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-5 h-5 text-gray-900 dark:text-white text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default Toggle;