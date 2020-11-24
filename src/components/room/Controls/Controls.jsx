import React, { useState } from "react";
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
import { socket } from "../../../utils/socket";

export default ({ playing, url, progress }) => {
  const [changeVideoUrl, setchangeVideoUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (changeVideoUrl) {
      changeVideo(changeVideoUrl, () => {
        setchangeVideoUrl("");
      });
    }
  };

  const changeVideo = (changeVideoUrl, callback) => {
    if (changeVideoUrl === "") return;

    socket.emit("changeVideo", { url: changeVideoUrl }, () => {
      callback();
    });
  };

  return (
    <Container id="Controls">
      <h2>Controls</h2>
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button onClick={() => socket.emit("play", { progress })}>
            <FontAwesomeIcon icon={faPlay} /> Play
          </Button>
          <Button onClick={() => socket.emit("pause", { progress })}>
            <FontAwesomeIcon icon={faPause} /> Pause
          </Button>
          <Button onClick={() => socket.emit(playing ? "pause" : "play", { progress })}>
            <FontAwesomeIcon icon={playing ? faToggleOn : faToggleOff} /> Toggle
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button
            onClick={() => socket.emit("sync", { url, progress, playing })}
          >
            <FontAwesomeIcon icon={faSync} /> Sync
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button
            onClick={() =>
              changeVideo(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                () => {}
              )
            }
          >
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
          <FormControl
            type="text"
            placeholder="Video URL"
            value={changeVideoUrl}
            onChange={(event) => setchangeVideoUrl(event.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? handleSubmit(event) : null
            }
          />
        </InputGroup>
        <ButtonGroup className="mr-2">
          <Button type="submit" onClick={(event) => handleSubmit(event)}>
            <FontAwesomeIcon icon={faExchangeAlt} /> Change video
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
};
