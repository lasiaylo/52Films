import React from "react"
import VideoPlayer from "./player"

export default function PlayerOverlay({src, setShowFilm}){
    // TODO: Animate fade in
    return (
        <div className={"playerOverlay"}>
            <span className={"closeButton"} onClick={() => setShowFilm(false)}>X</span>
            <VideoPlayer src={src}/>
        </div>
    )
}