import React, {useEffect, useRef, useState} from "react"
import Vimeo from '@vimeo/player'
import {AnimatePresence, motion} from 'framer-motion'

const VideoPlayer = ({src}) => {
    const ref = useRef()

    useEffect(() => {
        let options = {
            url: src
        }
        const player = new Vimeo(ref.current, options)
        // player.play()
    })

    return (
        <div className={"player"}
             ref={ref}
        >
        </div>
    );
}

export default function PlayerOverlay({src, setShowFilm}) {
    const [showCloseButton, setShowCloseButton] = useState(false)

    useEffect(() => {
            setTimeout(
                () => {
                    if (showCloseButton) {
                        setShowCloseButton(false)
                    }
                }, 2000
            )
        }, [showCloseButton]
    )


    return (
        <div className={"playerOverlay"} onMouseMove={() => setShowCloseButton(true)}>
                <motion.div
                    animate={{opacity: showCloseButton ? 1 : 0}}
                    transition={0.25}
                >
                    <svg
                        className={"closeButton"}

                        width="41"
                        height="41"
                        onClick={() => setShowFilm(false)}
                    >
                        <line className={"line"} x1={"1"} y1={"1"} x2={"40"} y2={"40"}/>
                        <line className={"line"} x1={"40"} y1={"1"} x2={"1"} y2={"40"}/>
                    </svg>
                </motion.div>
            <VideoPlayer src={src}/>
        </div>
    )
}