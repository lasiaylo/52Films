import React, {useRef, useState, Suspense, useEffect} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import "../styles/playerOverlayContainer.sass"
import PlayerOverlay from "./PlayerOverlay";
import {useSpring, animated} from "@react-spring/three";


function Card(props) {
    const ref = useRef()

    const {viewport} = useThree()
    const cardWidth = viewport.width * .6
    const cardHeight = cardWidth / (16 / 9)
    const cardX = (viewport.width / 10)
    const cardY = viewport.height / 10

    const [spring, setSpring] = useSpring(() => ({
        position: [
            cardX,
            cardY,
            40
        ],
        rotation: [
            0,
            0,
            0
        ],
        scale: [1, 1, 1],
    }))

    const [hover, setHover] = useState(false)
    const isBrowser = typeof document !== "undefined"
    const [video] = useState(() => {
        if (isBrowser) {
            const vid = document.createElement("video")
            vid.src = props.image
            vid.crossOrigin = 'anonymous'
            vid.loop = true
            vid.muted = true
            return vid
        }
    })
    video?.play()

    useEffect(() => {
        const playPromise = video?.play()
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // Automatic playback started!
                setSpring({
                    position: [
                        cardX,
                        cardY,
                        0
                    ],
                    rotation: [
                        0,
                        0,
                        0
                    ],
                    config: {
                        mass: 1.4
                    }
                })
            }).catch(function (error) {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }
    }, [video])

    useEffect(() => {
        const scale = hover ? [1.02, 1.02, 1.02] : [1, 1, 1]
        setSpring({
            scale: scale
        })
    }, [hover])
    useFrame((state, delta) => {
        // TODO: Interp to smooth animation
        // Consider Anime.js
        // ref.current.position.z = Math.sin(Date.now() / 800) / 40

        // noinspection JSSuspiciousNameCombination
        const now = Date.now()
        const zRotate = hover ?
            (Math.sin((now + 40) / 12)) * .2
            : (Math.sin((now + 40) / 1600)) * .02
        setSpring({
            position: [
                cardX + ((state.mouse.x - (cardX / 2)) * .05),
                cardY + ((state.mouse.y + (cardY / 2)) * .05),
                // cardX,cardY, 0
                (Math.sin(now / 500) * 0.025)
            ],
            rotation: [
                (-state.mouse.y + (cardY / 2)) * .05,
                (Math.sin((now + 900) / 1400)) * .015 +
                (state.mouse.x - (cardX / 2)) * .02,
                zRotate
            ],
            config: {
                mass: 1
            }
        })
    })
    return (
        <animated.mesh
            {...props}
            {...spring}
            ref={ref}
            onClick={() => props.setShowFilm(true)}
            onPointerOver={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <planeBufferGeometry attach="geometry" args={[cardWidth, cardHeight]}/>
            <meshBasicMaterial>
                <videoTexture attach="map" args={[video]}/>
            </meshBasicMaterial>
        </animated.mesh>
    )
}

export default function Preview({image, videoSrc}) {
    const [showFilm, setShowFilm] = useState(false)

    if (showFilm) {
        return (
            <div className={"playerOverlayContainer"}>
                <PlayerOverlay src={videoSrc} setShowFilm={setShowFilm}/>
            </div>
        )
    }
    return (
        <Canvas className={"canvas"}>
            <Card image={image} setShowFilm={setShowFilm}/>
        </Canvas>
    )
}