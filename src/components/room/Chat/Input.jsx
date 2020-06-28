import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

export default ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      sendMessage(message, () => {
        setMessage("");
      });
    }
  };

  return (
    <Container className="Input p-0">
      <Form>
        <Form.Row>
          <Col fluid="true">
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Message
            </Form.Label>
            <Form.Control
              id="inlineFormInput"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => event.key === "Enter" ? handleSubmit(event) : null}
              placeholder="Message"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" onClick={(event) => handleSubmit(event)}>
              Send
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}
