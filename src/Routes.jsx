import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Room from "./components/room/Room";
import NotFound from "./components/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/@:roomid" exact component={Room} />
      <Route component={NotFound} />
    </Switch>
  );
}
