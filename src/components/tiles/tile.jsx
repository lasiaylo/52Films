import "../../styles/tile.sass"
import * as THREE from 'three'
import {extend, Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import React, {createContext, useState} from "react"
import {Text} from "troika-three-text"
import {getTileXRotation, getTileZRotation, useFocus, useHover} from "./dump"
import {useDrag} from "@use-gesture/react";
import {clamp, clampRange} from "../../util/MathUtils";
import {useSpring, animated} from "@react-spring/three";

extend({Text})

const TileSize = 2
const context = React.createContext()

export function focus() {
    console.log("Tap!")
}

export default function Tile({film, ...props}) {
    const {title, logline, stillPreview} = film
    const [, , largeSrc] = getSources(stillPreview)
    const texture = useLoader(THREE.TextureLoader, largeSrc)
    const number = "23"

    const [spring, setSpring] = useSpring(() =>
        ({
            position: [
                props['position-x'],
                props['position-y'],
                50,
            ],
            rotation: [
                getTileXRotation(),
                0,
                getTileZRotation(),
            ],
        })
    )

    setSpring(
        {
            position: [
                props['position-x'],
                props['position-y'],
                props['position-z'],
            ],
            delay: props.delay * 50
        }
    )
    const {position} = spring

    console.log(position.get())


    const {size, viewport} = useThree()
    const aspect = size.width / viewport.width;
    const bind = useDrag(({offset: [ox, oy], down, tap}) => {
        if (tap) {
            return
        }
        const [x, y] = position.animation.to
        const pos = down ? [ox, oy, 2] : [x, y, props['position-z']]
        const rot = down ? [0, 0, 0] : [getTileXRotation(), 0, getTileZRotation()]
        setSpring(
            {
                position: pos,
                rotation: rot
            }
        )
    }, {
        pointerEvents: true,
        from: () => [position.get()[0], position.get()[1]],
        bounds: {
            left: -viewport.width / 3,
            right: viewport.width / 3,
            top: -viewport.height / 3,
            bottom: viewport.height / 3,
        },
        transform: (([x, y]) => [x / aspect, -y / aspect]),
        filterTaps: true
    })

    return (
        <animated.group
            {...props}
            {...spring}
            position-z={props['position-z']}
            {...bind()}>
            <text
                position-x={-.45 * TileSize}
                position-y={.45 * TileSize}
                position-z={0.001}
                fontSize={.5}
                text={number}
                textAlign="left"
                anchorX="left"
                anchorY="top"
            >
                <meshBasicMaterial attach="material" color="red"/>
            </text>
            <animated.mesh {...useHover()}>
                <planeBufferGeometry attach="geometry" args={[TileSize, TileSize]}/>
                <meshStandardMaterial attach="material" map={texture}/>
            </animated.mesh>
        </animated.group>
    )
}

function getSources(gatsbyImage) {
    let [smallSrc, midSrc, largeSrc] = gatsbyImage.images.sources[0].srcSet.split(',')
    return [
        smallSrc.split(" ")[0],
        midSrc.split(" ")[0],
        largeSrc.split(" ")[0],
    ]
}
