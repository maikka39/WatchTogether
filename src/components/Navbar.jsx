import React from "react";
import { Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import { Link, useLocation, matchPath } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <Navbar id="Navbar">
      <Navbar.Brand as={Link} to="/">
        Watch-Together
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <RoomText />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

function RoomText() {
  const match = matchPath(useLocation().pathname, {
    path: "/@:roomid",
    exact: true,
    strict: false
  });

  return match ? (

    <OverlayTrigger
      trigger="focus"
      placement="bottom"
      // delay={{ show: 250, hide: 400 }}
      overlay={
        <Popover id="copiedPopover">
          <Popover.Title as="h3">Copied!</Popover.Title>
          <Popover.Content>
            A link to this room has been copied to your clipboard.
          </Popover.Content>
        </Popover>
      }
    >
      <span>
        Room: <Link onClick={() => { navigator.clipboard.writeText(window.location.href); }} to="#">{match.params.roomid}</Link>
      </span>
    </OverlayTrigger>
    // eslint-disable-next-line react/jsx-no-target-blank
  ) : (<span>Made with <FontAwesomeIcon icon={faHeart} color="#FF0001" /> by <a className="font-weight-bold" href="https://maik.dev/" target="_blank" rel="noopener">Maik de Kruif</a></span>)
}