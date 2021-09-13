import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import i18n from "./config/i18n";
import AppRouter, { AppHistory } from "./config/router";
import "./index.css";

const Wrapper = () => {
  useEffect(() => {
    AppHistory.push("/" + i18n.language);
  }, []);
  return <AppRouter />;
};

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById("root")
);
