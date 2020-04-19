import React from "react";
import { Router } from "react-router-dom";
import history from "./history";
import Routes from "./Routes";
import Navbar from "./Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export default function App(props) {
  return (
    <Router history={history}>
      <div className="App container">
        <Navbar />
        <Routes appProps={{ history }} />
      </div>
    </Router>
  );
}
