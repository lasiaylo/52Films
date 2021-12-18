import React, {useEffect, useRef, useState} from "react"
import Vimeo from '@vimeo/player'
import {useSpring, config, animated} from "@react-spring/three";

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
    // const [spring, setSpring] = useSpring(() => ({
    //     opacity: 0
    // }))
    // console.log(spring, setSpring)
    //
    // useEffect(
    //     setSpring({
    //         opacity: 1,
    //         // config: config.gentle
    //     })
    //     , []
    // )

    return (
        <div className={"playerOverlay"}>
            <span className={"closeButton"} onClick={() => setShowFilm(false)}>X</span>
            <VideoPlayer src={src}/>
        </div>
    )
}