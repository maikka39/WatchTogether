import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../../../utils/socket";
import { sanitize } from "../../../utils/sanitize";

import "./Online.scss";

export default () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("usersUpdated", ({ users }) => {
      setUsers(users);
    });
  }, []);

  return (
    <Container id="Online">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Online</h2>
        <span>({users.length})</span>
      </div>
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
