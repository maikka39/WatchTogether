import React from "react";
import { Container } from "react-bootstrap";
import ReactPlayer from 'react-player'
import "./Player.scss"

export default () => {
  return (
    <Container id="Player">
      <h2>Player</h2>
      <Container className="player-wrapper">
        <ReactPlayer
          className='react-player'
          url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          width='100%'
          height='100%'
          controls
          playing
          light
        />
      </Container>
    </Container>
  );
}
