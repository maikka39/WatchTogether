import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Player from "./Player"
import Chat from "./Chat"
import "./Room.scss";

export default class Room extends React.Component {
  componentDidMount() {
    document.querySelectorAll(".chat-view").forEach(el => {
      el.style.maxHeight = document.querySelector(".react-player").clientHeight + "px";
    });
  }

  render() {
    return (
      <Container id="Room">
        <h1>Room</h1>
        <Row className="mb-5">
          <Col lg={8}>
            <Player />
          </Col>
          <Col lg={4}>
            <Chat />
          </Col>
        </Row>
        <Row>
          <h2>Other content</h2>
        </Row>
      </Container>
    );
  }
}
