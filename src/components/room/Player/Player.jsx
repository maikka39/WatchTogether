import React, { } from "react";
import { Container, ResponsiveEmbed } from "react-bootstrap";
import ReactPlayer from "react-player";
import "./Player.scss";
import { socket } from "../../../utils/socket"

export default ({
  playerRef,
  url,
  pip,
  playing,
  controls,
  light,
  loop,
  playbackRate,
  volume,
  muted,
  progress,
  setDuration,
  setProgress,
  setLoaded,
}) => {
  return (
    <Container id="Player">
      <h2>Player</h2>
      <ResponsiveEmbed aspectRatio="16by9">
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          width="100%"
          height="100%"
          url={url}
          pip={pip}
          playing={playing}
          controls={controls}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={() => socket.emit("clientOnReady")}
          onStart={() => socket.emit("clientOnStart", {})}
          onPlay={() => socket.emit("clientOnPlay", { progress })}
          onEnablePIP={() => console.log("onEnablePIP")}
          onDisablePIP={() => console.log("onDisablePIP")}
          onPause={() => socket.emit("clientOnPause", { progress })}
          onBuffer={() => socket.emit("clientBuffering", { progress })}
          onSeek={(e) => socket.emit("clientOnSeek", { progress, e })}
          onEnded={() => socket.emit("clientOnEnded", { progress })}
          onError={(e) => socket.emit("clientOnError", { e })}
          onProgress={(e) => {
            setProgress(e.played);
            setLoaded(e.loaded);
          }}
          onDuration={(duration) => setDuration(duration)}
        />
      </ResponsiveEmbed>
    </Container>
  );
};
