import React from "react";
import {
  Container,
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faToggleOn,
  faToggleOff,
  faMehRollingEyes,
  faSync,
  faLink,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

let isPlaying = false;

export default () => {
  return (
    <Container id="Controls">
      <h2>Controls</h2>
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button>
            <FontAwesomeIcon icon={faPlay} /> Play
          </Button>
          <Button>
            <FontAwesomeIcon icon={faPause} /> Pause
          </Button>
          <Button>
            <FontAwesomeIcon icon={isPlaying ? faToggleOn : faToggleOff} />{" "}
            Toggle
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button>
            <FontAwesomeIcon icon={faSync} /> Sync
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button>
            <FontAwesomeIcon icon={faMehRollingEyes} /> Rick-roll
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <ButtonToolbar className="mt-2">
        <InputGroup className="mr-2">
          <InputGroup.Prepend>
            <InputGroup.Text id="btnGroupAddon">
              <FontAwesomeIcon icon={faLink} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type="text" placeholder="Video URL" />
        </InputGroup>
        <ButtonGroup className="mr-2">
          <Button>
            <FontAwesomeIcon icon={faExchangeAlt} /> Change video
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
};
