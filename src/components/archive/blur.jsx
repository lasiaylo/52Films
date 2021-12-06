import {useThree} from "@react-three/fiber";
import {animated, useSpring} from "@react-spring/three";
import React, {useEffect} from "react";

export default function Blur({isSelected, setSelected}) {
    const {viewport} = useThree()
    const dimensions = [viewport.width, viewport.height]
    // const dimensions = [1, 1]
    const [spring, setSpring] = useSpring(() => ({opacity: 0}))
    useEffect(() => {
        console.log(isSelected)
        if (isSelected) {
            setSpring({opacity: 0.8})
        } else {
            setSpring({opacity: 0})
        }
    }, [isSelected])
    return (
        <animated.mesh
            opacity={0.5}
            position={[0, 0, 0.8]}
        >
            <planeBufferGeometry attach="geometry"
                                 args={dimensions}/>
            <animated.meshStandardMaterial attach="material" color="red" transparent={true} {...spring}/>
        </animated.mesh>
    )
}