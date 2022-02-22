import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getTheme } from "@fluentui/react";
import { Navbar } from "./components/Navbar";
import { GridDisplay } from "./components/GridDisplay";

const App = () => {
  const theme = getTheme();
  const btnStyles = {
    root: {
      background: theme.palette.neutralTertiary,
    },
    rootHovered: {
      background: "green",
    },
  };
  const textStyles = () => ({
    root: [
      {
        background: theme.palette.themePrimary,
        foreground: theme.palette.white,
      },
    ],
  });

  return (
    <div className="App">
      <Navbar />
      <GridDisplay />
    </div>
  );
};

export default App;
