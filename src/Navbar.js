import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Auth = {
  isAuthenticated: true,
  signIn(email, password, cb) {
    Auth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signOut(cb) {
    Auth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const account = {
  name: "Maik de Kruif",
};

export default function Routes() {
  return (
    <Navbar id="Navbar">
      <Navbar.Brand as={Link} to="/">
        Watch-Together
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <ProfileText />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

function ProfileText() {
  return Auth.isAuthenticated ? (
    <p>
      Signed in as: <Link to="/profile">{account.name}</Link>
    </p>
  ) : (
    <p>
      <Link to="/login">Log in</Link>
    </p>
  );
}
