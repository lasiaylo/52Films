import "../../styles/tile.sass"
import * as THREE from 'three'
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import React from "react";

export default function Tile({film}) {
    const {title, logline, stillPreview} = film.film
    const [smallSrc, midSrc, largeSrc] = getSources(stillPreview)
    const texture = useLoader(THREE.TextureLoader, largeSrc)
    return (
        <mesh>
            <planeBufferGeometry attach="geometry" args={[1, 1]}/>
            <meshBasicMaterial attach="material" color="red"/>
            <meshBasicMaterial attach="material" map={texture}/>
        </mesh>
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
