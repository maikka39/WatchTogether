import React from "react"
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import "./Online.scss"

export default () => {
  return (
    <Container id="Online">
      <h2>Online</h2>
      <ListGroup className="online-list">
        <ListGroup.Item><FontAwesomeIcon icon={faUser} className="mr-2" /> Maik</ListGroup.Item>
        <ListGroup.Item><FontAwesomeIcon icon={faUser} className="mr-2" /> User</ListGroup.Item>
      </ListGroup>
    </Container>
  )
}