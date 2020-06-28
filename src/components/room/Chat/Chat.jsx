import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Message from "./Message";
import Input from "./Input"

import "./Chat.scss"

export default ({ messages, sendMessage }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current.parentElement.scrollTo({
      left: 0,
      top: messagesEndRef.current.parentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <Container id="Chat">
      <h2>Chat</h2>
      <Container className="chat-view p-0 d-flex flex-column" fluid>
        <Container className="chat-messages p-0 flex-fill">
          {messages.map((msg, idx) => (
            <Message
              key={idx}
              author={msg.title}
              text={msg.subtitle}
              date={msg.date}
            />
          )
          )}
          <div ref={messagesEndRef} />
        </Container>
        <Input sendMessage={sendMessage} />
      </Container>
    </Container>
  );
}
