/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Container } from "react-bootstrap";

export default () => {
  return (
    <footer id="Footer" className="pt-4 my-md-5 pt-md-5 border-top">
      <Container className="row">
        <Container className="col-12 col-md">
          <small className="d-block mb-3 text-muted text-center">
            Copyright &copy;{" "}
            <a href="https://maik.dev/" target="_blank" rel="noopener">
              Maik de Kruif
            </a>{" "}
            2020
          </small>
        </Container>
      </Container>
    </footer>
  );
};
