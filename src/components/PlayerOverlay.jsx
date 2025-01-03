import React, { useEffect, useRef, useState } from "react";
import Vimeo from "@vimeo/player";
import { motion } from "framer-motion";

const VideoPlayer = ({ src }) => {
  const ref = useRef();

  useEffect(() => {
    let options = {
      url: src,
    };
    const player = new Vimeo(ref.current, options);
    player.play();
  }, []);

  return <div className={"player"} ref={ref} />;
};

export default function PlayerOverlay({ src, setShowFilm }) {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (showCloseButton) {
        setShowCloseButton(false);
      }
    }, 1500);
  }, [showCloseButton]);

  // TODO: Refactor into util
  const className = showCloseButton
    ? "closeButtonContainer"
    : "closeButtonContainer hidden";

  return (
    <div
      className={"playerOverlay"}
      onMouseMove={() => setShowCloseButton(true)}
    >
      <div className={className}>
        <svg
          className={"closeButton"}
          width="36"
          height="36"
          onClick={() => setShowFilm()}
        >
          <line className={"line"} x1={"1"} y1={"1"} x2={"35"} y2={"35"} />
          <line className={"line"} x1={"35"} y1={"1"} x2={"1"} y2={"35"} />
        </svg>
      </div>
      <VideoPlayer src={src} />
    </div>
  );
}
