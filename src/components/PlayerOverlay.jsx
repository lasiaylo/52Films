import React, {useEffect, useRef, useState} from "react";
import Vimeo from "@vimeo/player";

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

const YoutubePlayer = ({ src }) => {
  let path = (new URL(src)).pathname;
  return <div className={"player"}>
    <iframe
      src={`https://www.youtube.com/embed/${path}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      />
  </div>
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
  let domain = new URL(src);
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
      { 
        domain.hostname === "vimeo.com" 
          ? <VideoPlayer src={src} /> 
          : <YoutubePlayer src={src}/>
      }
    </div>
  );
}
