import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getCookie, setCookie } from "../../utils/cookies";
import Player from "./Player/Player";
import Chat from "./Chat/Chat";
import Controls from "./Controls/Controls";
import Online from "./Online/Online";
import history from "../../utils/history";
import { socket } from "../../utils/socket";
import "./Room.scss";

export default (props) => {
  const [url, setUrl] = useState("");
  const [pip] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [controls] = useState(true);
  const [light] = useState(false);
  const [volume] = useState(0.8);
  const [muted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate] = useState(1.0);
  const [loop] = useState(false);

  const playerRef = useRef(null);

  useEffect(() => {
    let roomid = props.match.params.roomid;
    setCookie("roomid", roomid, 365);
    let name = getCookie("username");

    if (name === "") history.push("/");

    socket.emit("enterRoom", { room: roomid, name }, (error) => {
      if (error) {
        alert(error);
        return;
      }
    });

    socket.on("play", ({ progress }) => {
      setPlaying(true);
      playerRef.current.seekTo(progress);
    });

    socket.on("pause", ({ progress }) => {
      setPlaying(false);
      playerRef.current.seekTo(progress);
    });

    socket.on("changeVideo", ({ url }) => {
      setUrl(url);
      setProgress(0);
      setLoaded(0);
    });

    socket.on("sync", ({ url, progress, playing }) => {
      setUrl(url);
      playerRef.current.seekTo(progress);
      setPlaying(playing);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [props.match.params]);

  useEffect(() => {
    const fitChat = () => {
      let playerHeight = document.querySelector(".react-player")?.clientHeight;
      let chatViewStyle = document.querySelector(".chat-view")?.style;

      if (chatViewStyle === undefined || playerHeight === undefined) return;

      chatViewStyle.maxHeight = `${playerHeight}px`;
    };
    fitChat();
    window.addEventListener("resize", fitChat);
  }, []);

  return (
    <Container id="Room">
      <h1>Room</h1>
      <Row className="mb-5">
        <Col lg={8}>
          <Player
            playerRef={playerRef}
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            volume={volume}
            muted={muted}
            progress={progress}
            loaded={loaded}
            duration={duration}
            playbackRate={playbackRate}
            loop={loop}
            setDuration={setDuration}
            setProgress={setProgress}
            setLoaded={setLoaded}
          />
        </Col>
        <Col lg={4}>
          <Chat />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Controls playing={playing} url={url} progress={progress} />
        </Col>
        <Col lg={4}>
          <Online />
        </Col>
      </Row>
    </Container>
  );
};
