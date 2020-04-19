import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Routes() {
  return (
    <Navbar id="Navbar">
      <Navbar.Brand as={Link} to="/">
        Watch-Together
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>Hello</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
