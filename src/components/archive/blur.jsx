import {useThree} from "@react-three/fiber";
import {animated, useSpring} from "@react-spring/three";
import React, {useEffect, useState} from "react";

export default function Blur({isSelected, setSelected}) {
    const {viewport} = useThree()
    const dimensions = [viewport.width * 2, viewport.height * 2]
    const [spring, setSpring] = useSpring(() => ({opacity: 0}))
    useEffect(() => {
        if (isSelected) {
            setSpring({opacity: 0.85})
        } else {
            setSpring({opacity: 0})
        }
    }, [isSelected])

    return (
        <animated.mesh
            position={[0,0,0.8]}
        >
            <planeBufferGeometry attach="geometry"
                                 args={dimensions}/>
            <animated.meshStandardMaterial attach="material" color="black" transparent={true} {...spring}/>
        </animated.mesh>
    )
}