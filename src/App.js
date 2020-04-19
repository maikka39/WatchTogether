import React from "react";
import { Router } from "react-router-dom";
import history from "./history";
import Routes from "./Routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export default function App(props) {
  return (
    <Router history={history}>
      <div className="App container">
        <Routes appProps={{ history }} />
      </div>
    </Router>
  );
}
