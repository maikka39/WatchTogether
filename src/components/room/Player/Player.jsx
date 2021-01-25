import React, { } from "react";
import { Container, ResponsiveEmbed } from "react-bootstrap";
import ReactPlayer from "react-player";
import "./Player.scss";
import { control } from "../../../utils/control"

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
          onReady={() => console.log("clientOnReady")}
          onStart={() => console.log("clientOnStart", {})}
          onPlay={() => control.play(progress)}
          onEnablePIP={() => console.log("onEnablePIP")}
          onDisablePIP={() => console.log("onDisablePIP")}
          onPause={() => control.pause(progress)}
          onBuffer={() => console.log("clientBuffering", { progress })}
          // onSeek={(_) => control.sync(url, progress, playing)}
          onEnded={() => console.log("clientOnEnded", { progress })}
          onError={(e) => console.log("clientOnError", { e })}
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
