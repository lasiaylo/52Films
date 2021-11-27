import "../../styles/tile.sass"
import * as THREE from 'three'
import {extend, Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import React, {useState} from "react"
import {Text} from "troika-three-text"
import {useHover} from "./dump"
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
    const [position, setPosition] = useState([props['position-x'], props['position-y'], 0]);
    // const [position, setPosition] = useState([0, 0, 0]);

    const {size, viewport} = useThree();
    const aspect = size.width / viewport.width;
    const bind = useDrag(({offset: [x, y]}) => {
        const [, , z] = position
        x = clampRange(x / aspect, viewport.width)
        y = clampRange(-y / aspect, viewport.height)
        setPosition([x, y, z])
    }, {pointerEvents: true, from: () => [position[0] * aspect, -position[1] * aspect]});
    return (
        <group
            {...props}
            position={position}
            {...bind()}>
            <text
                position-x={0 * TileSize}
                position-y={0 * TileSize}
                fontSize={.5}
                text={number}
                textAlign="left"
                anchorX="left"
                anchorY="top"
                // font= "Helvetica"
                // fontWeight="thin"
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
