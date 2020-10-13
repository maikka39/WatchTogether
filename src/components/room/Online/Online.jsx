import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { sanitize } from "../../../utils/sanitize";

import "./Online.scss";

export default ({ users }) => {
  return (
    <Container id="Online">
      <h2>Online</h2>
      <ListGroup className="online-list">
        {users.map((usr, idx) => (
          <ListGroup.Item key={idx}>
            <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
            {sanitize(usr.name)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
