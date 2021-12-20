import React, {useEffect, useRef, useState} from "react"
import Vimeo from '@vimeo/player'

const VideoPlayer = ({src}) => {
    const ref = useRef()

    useEffect(() => {
        let options = {
            url: src
        }
        const player = new Vimeo(ref.current, options)
        player.play()
    })

    return (
        <div className={"player"}
             ref={ref}
        >
        </div>
    );
}

export default function PlayerOverlay({src, setShowFilm}) {
    return (
        <div className={"playerOverlay"}>
            <span className={"closeButton"} onClick={() => setShowFilm(false)}>X</span>
            <VideoPlayer src={src}/>
        </div>
    )
}