import React, {useRef, useState, Suspense, useEffect} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import "../styles/playerOverlay.sass"
import {useSpring, animated} from "@react-spring/three";
import {useDrag} from "@use-gesture/react";


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
    const [clicked, setClicked] = useState(false)
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
        if (!clicked) {
            const scale = hover ? [1.02, 1.02, 1.02] : [1, 1, 1]
            setSpring({
                scale: scale
            })
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
                onRest: () => {
                    props.setShowFilm(true)
                }
            })
        }
    })

    return (
        <animated.mesh
            {...props}
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

export default function Preview({image, setShowFilm}) {
    return (
        <Canvas className={"canvas"}
                linear
        >
            <ambientLight intensity={0.1}/>
            <pointLight intensity={1} position={[10, 10, 10]} />

            <Card image={image} setShowFilm={setShowFilm}/>
        </Canvas>
    )
}