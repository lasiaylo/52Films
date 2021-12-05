import React, {useRef, useState, Suspense, useEffect} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import VideoPlayer from "./player";


const previewX = 0.7
const previewY = .75

function Card(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()

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
        const playPromise = video?.play();
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
        // TODO: Interp to smooth animation
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
            onClick={() => props.setShowFilm(true)}
        >
            <planeBufferGeometry attach="geometry" args={[8.5, 4.78125]}/>
            <meshBasicMaterial>
                <videoTexture attach="map" args={[video]}/>
            </meshBasicMaterial>
        </mesh>
    )
}

export default function Preview({image, videoSrc}) {
    const [showFilm, setShowFilm] = useState(false)

    if (showFilm) {
        return <VideoPlayer src={videoSrc}/>
    }
    return (
        <Canvas className={"canvas"}>
            <Card position={[previewX, previewY, 0]} image={image} setShowFilm={setShowFilm}/>
        </Canvas>
    )
}