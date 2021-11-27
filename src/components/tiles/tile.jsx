import "../../styles/tile.sass"
import * as THREE from 'three'
import {extend, Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import React, {useState} from "react"
import {Text} from "troika-three-text"
import {getTileXRotation, getTileZRotation, useHover} from "./dump"
import {useDrag} from "@use-gesture/react";
import {clamp, clampRange} from "../../util/MathUtils";
import {useSpring} from "@react-spring/three";

extend({Text})

const TileSize = 2

export default function Tile({film, ...props}) {
    const {title, logline, stillPreview} = film
    const [, , largeSrc] = getSources(stillPreview)
    const texture = useLoader(THREE.TextureLoader, largeSrc)
    const number = "23"
    const [position, setPosition] = useState([props['position-x'], props['position-y'], 0])
    const [rotation, setRotation] = useState([props['rotation-x'], 0, props['rotation-z']])
    // const [position, setPosition] = useState([0, 0, 0]);

    const {size, viewport} = useThree();
    const aspect = size.width / viewport.width;
    console.log(size.width)
    const bind = useDrag(({offset: [ox, oy], down}) => {
        console.log(ox)
        const [x, y] = position
        if (down) {
            ox = ox/aspect
            oy = -oy/aspect
            setPosition([ox, oy, 1])
            setRotation([0, 0, 0])
        } else {
            setPosition([x, y, props['position-z']])
            setRotation([getTileXRotation(), 0, getTileZRotation()])
        }
    }, {
        pointerEvents: true,
        from: () => [position[0] * aspect, -position[1] * aspect],
        bounds: {
            left: -viewport.width * aspect / 3,
            right: viewport.width * aspect / 3,
            top: -viewport.height * aspect / 3,
            bottom: viewport.height * aspect / 3,
            // bottom: -100,
        }
    })

    return (
        <group
            {...props}
            position={position}
            position-z={props['position-z']}
            rotation={rotation}
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
            <mesh {...useHover()}>
                <planeBufferGeometry attach="geometry" args={[TileSize, TileSize]}/>
                <meshStandardMaterial attach="material" map={texture}/>
            </mesh>
        </group>
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
