import React, {useRef, useState, Suspense, useEffect} from 'react'
import {Canvas, useFrame, useLoader} from '@react-three/fiber'


const previewX = 0.7
const previewY = .75

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [video] = useState(() => {
        const vid = document.createElement("video")
        vid.src = props.image
        vid.crossOrigin = 'anonymous'
        vid.loop = true
        vid.muted = true
        return vid
    })
    video.play()

    useEffect(() => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // Automatic playback started!
            }).catch(function (error) {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }
    }, [video]);

    useFrame((state, delta) => {
        //TODO: Interp to smooth animation
        // Consider Anime.js

        // noinspection JSSuspiciousNameCombination
        ref.current.rotation.y = (state.mouse.x - previewX) * .05
        ref.current.rotation.x = (-state.mouse.y + previewY) * .05
        //TODO: Consider scrubbing based off mouse x
    })
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}>
            <planeBufferGeometry attach="geometry" args={[8.5, 4.78125]}/>
            <meshBasicMaterial>
                <videoTexture attach="map" args={[video]}/>
            </meshBasicMaterial>
        </mesh>
    )
}

export default function Preview({image}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Canvas className={"canvas"}>
                <Box position={[previewX, previewY, 0]} image={image}/>
            </Canvas>
        </Suspense>
    )
}