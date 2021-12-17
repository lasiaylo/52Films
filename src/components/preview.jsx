import React, {useRef, useState, Suspense, useEffect} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import "../styles/playerOverlayContainer.sass"
import PlayerOverlay from "./PlayerOverlay";
import {useSpring, animated} from "@react-spring/three";

const previewX = 0.7
const previewY = .75

function Card(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()

    // TODO: Shape Canvas properly with CSS and position card in center

    const [spring, setSpring] = useSpring(() => ({
        position: [
            previewX,
            previewY,
            40
        ],
        rotation: [
            0,
            0,
            0
        ]
    }))

    const [hovered, hover] = useState(false)
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
                        previewX,
                        previewY,
                        0
                    ],
                    rotation: [
                        0,
                        0,
                        0
                    ]
                })
            }).catch(function (error) {

                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }
    }, [video]);

    useFrame((state, delta) => {
        // TODO: Interp to smooth animation
        // Consider Anime.js
        // ref.current.position.z = Math.sin(Date.now() / 800) / 40

        // noinspection JSSuspiciousNameCombination
        setSpring({
            position: [
                previewX + (state.mouse.x / 8),
                previewY + (state.mouse.y / 8),
                Math.sin(Date.now()/ 500) / 40
            ],
            rotation: [
                (-state.mouse.y + previewY) * .05,
                (state.mouse.x - previewX) * .05,
                0
            ]
        })
    })
    return (
        <animated.mesh
            {...props}
            {...spring}
            ref={ref}
            onClick={() => props.setShowFilm(true)}
        >
            <planeBufferGeometry attach="geometry" args={[8.5, 4.78125]}/>
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
            <Card position={[previewX, previewY, 0]} image={image} setShowFilm={setShowFilm}/>
        </Canvas>
    )
}