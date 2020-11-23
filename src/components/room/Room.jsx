import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getCookie, setCookie } from "../../utils/cookies";
import Player from "./Player/Player";
import Chat from "./Chat/Chat";
import Controls from "./Controls/Controls";
import Online from "./Online/Online";
import history from "../../utils/history";
import { socket } from "../../utils/socket";
import "./Room.scss";

export default (props) => {
  useEffect(() => {
    let roomid = props.match.params.roomid;
    setCookie("roomid", roomid, 365);
    let name = getCookie("username");

    if (name === "") history.push("/");

    socket.emit("enterRoom", { room: roomid, name }, (error) => {
      if (error) {
        alert(error);
        return;
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [props.match.params]);

  useEffect(() => {
    const fitChat = () => {
      document.querySelectorAll(".chat-view").forEach((el) => {
        el.style.maxHeight =
          document.querySelector(".react-player").clientHeight + "px";
      });
    };
    fitChat();
    window.onresize = fitChat;
  });

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
        <Col lg={8}>
          <Controls />
        </Col>
        <Col lg={4}>
          <Online />
        </Col>
      </Row>
    </Container>
  );
};
