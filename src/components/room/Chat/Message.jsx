import React from "react";
import { Container } from "react-bootstrap";

import "./Message.scss"

export default ({ author, text, date }) => {
  return (
    <Container className="Message p-2 border-bottom">
      <div className="title-bar">
        <span>{author}</span>
        <span className="timestamp">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </Container>
  );
}
