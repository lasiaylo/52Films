import React from "react";
import "../../styles/about.sass";

const smallRowSize = 5;

export default function ProfilesContainer({ profilePictures }) {
  return <div className={"picturesContainer"}>{profilePictures}</div>;
}
