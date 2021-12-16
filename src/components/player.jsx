import React, {useEffect, useRef} from "react"
import Vimeo from '@vimeo/player'

export default function VideoPlayer({src}) {
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