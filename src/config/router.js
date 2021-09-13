import React from "react";
import { Router, Route, Switch } from "react-router";
import App from "../pages/landing";
import i18n from "./i18n";
import { createBrowserHistory } from "history";

export const AppHistory = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={AppHistory}>
      <Switch>
        <Route exact path={"/"} component={App} />
        <Route exact path={"/zh-TW"} component={App} />
        <Route exact path={"/en-US"} component={App} />
        <Route exact path={"/zh-CN"} component={App} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
