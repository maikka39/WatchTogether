import React from "react";
import { Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import history from "./utils/history";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export default () => {
  return (
    <Router history={history}>
      <Container id="App">
        <Navbar />
        <Routes appProps={{ history }} />
        <Footer />
      </Container>
    </Router>
  );
};
