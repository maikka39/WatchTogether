import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import io from "socket.io-client";
import { getCookie } from "../../cookies"
import { SEVER_ENDPOINT } from "../../config"
import Player from "./Player/Player"
import Chat from "./Chat/Chat"
import Controls from "./Controls/Controls"
import Online from "./Online/Online"
import "./Room.scss";

let socket;

export default (props) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) return;

    let roomid = props.match.params.roomid;
    let name = getCookie("username");

    socket = io(SEVER_ENDPOINT);

    socket.emit("join", { room: roomid, name }, (error) => {
      if (error) {
        alert(error);
        return;
      }
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [props.match.params]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages((messages) => [...messages, {
        avatar: 'https://maik.dev/assets/images/logo.svg',
        alt: 'Avatar',
        title: user,
        subtitle: text,
        date: new Date(),
        unread: 0,
      }])
    });

    socket.on("newUser", ({ users }) => {
      setUsers(users);
    });
  }, [props.match.params]);

  useEffect(() => {
    const fitChat = () => {
      document.querySelectorAll(".chat-view").forEach(el => {
        el.style.maxHeight = document.querySelector(".react-player").clientHeight + "px";
      });
    };
    fitChat()
    window.onresize = fitChat;
  });

  const sendMessage = (message, callback) => {
    if (message === "") return;

    socket.emit("message", { text: message }, () => {
      callback();
    })
  };

  return (
    <Container id="Room">
      <h1>Room</h1>
      <Row className="mb-5">
        <Col lg={8}>
          <Player />
        </Col>
        <Col lg={4}>
          <Chat messages={messages} sendMessage={sendMessage} />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Controls />
        </Col>
        <Col lg={4}>
          <Online users={users} />
        </Col>
      </Row>
    </Container>
  );
}
