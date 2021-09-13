import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import config from "./config/config";
import i18n from "./config/i18n";
import AppRouter, { AppHistory } from "./config/router";
import "./index.css";

const Wrapper = () => {
  //run this when the app is initialize.
  useEffect(() => {
    AppHistory.push("/" + i18n.language);
    document.title = config.brand;
    document.querySelector("link[rel*='icon']").href =
      process.env.PUBLIC_URL + `/assets/favicon/${config.brand}.ico`;
  }, []);
  return <AppRouter />;
};

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById("root")
);
