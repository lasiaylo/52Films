import React, {useRef, useState, Suspense, useEffect} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import "../styles/playerOverlay.sass"
import {useSpring, animated} from "@react-spring/three";
import {useDrag} from "@use-gesture/react";
import {isMobile} from "../services/auth";


function Card({film, setShowFilm}) {
    const ref = useRef()
    const {viewport} = useThree()
    let cardWidth = isMobile() ? viewport.width * 0.9 : viewport.width * .6
    let cardX = isMobile() ? 0 : viewport.width / 10
    let cardY = isMobile() ? 0 : viewport.height / 10

    // TODO: BAD FIX FOR WIDE SCREENS LMAO
    if (cardWidth >= 10.4) {
        cardWidth = 10.4
        cardX = 1
        console.log("adlkajdlaskds")

    }
    const cardHeight = cardWidth / (16 / 9)
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
    const [clicked, setClicked] = useState(false)
    const isBrowser = typeof document !== "undefined"
    const [video] = useState(() => {
        if (isBrowser) {
            const vid = document.createElement("video")
            vid.src = film.animPreview
            vid.crossOrigin = 'anonymous'
            vid.loop = true
            vid.muted = true
            return vid
        }
    })
    useEffect(() => {
        if (!clicked) {
            const scale = hover ? [1.02, 1.02, 1.02] : [1, 1, 1]
            setSpring({
                scale: scale
            })
        }
        if (document) {
            document.body.style.cursor = hover ? 'pointer' : 'auto'
        }
    }, [hover])

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

    useFrame((state, delta) => {
        if (!clicked) {
            const now = Date.now()
            const zRotate = (Math.sin((now + 40) / 1600)) * .02
            setSpring({
                position: [
                    cardX,
                    cardY,
                    (Math.sin(now / 500) * 0.025)
                ],
                rotation: [
                    (Math.sin((now + 1800) / 1400)) * .015 +
                    (-state.mouse.y + (cardY / 6)) * .04,
                    (Math.sin((now + 900) / 1400)) * .005 +
                    (state.mouse.x - (cardX / 6)) * .025,
                    zRotate
                ],
                config: {
                    mass: 1
                }
            })
        }
    })

    const bind = useDrag((
        {down}
    ) => {
        if (down) {
            setSpring({
                scale: [0.95, 0.95, 1],
                rotation: [0, 0, 0],
                config: {
                    mass: 1
                },
            })
        } else {
            setClicked(true)
            setSpring({
                position: [cardX, cardY, 0],
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
                config: {
                    mass: 1,
                    tension: 400
                },
                onRest: {
                    scale: () => setShowFilm(film)
                }
            })
        }
    })

    return (
        <animated.mesh
            {...spring}
            ref={ref}
            {...bind()}
            onPointerOver={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <planeBufferGeometry attach="geometry" args={[cardWidth, cardHeight]}/>
            <meshStandardMaterial>
                <videoTexture attach="map" args={[video]}/>
            </meshStandardMaterial>
        </animated.mesh>
    )
}

export default function CardCanvas({film, showCard, setShowFilm}) {
    return (
        <Canvas className={"canvas"}
                linear
        >
            <ambientLight intensity={0.1}/>
            <pointLight intensity={0.75} position={[5, 10, 20]}/>
            {showCard && <Card film={film} setShowFilm={setShowFilm}/>}
        </Canvas>
    )
}