import Tile from "./tile";
import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react"
import {Vector2} from "three";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader"
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {RandomInNegativeRange, UniqueRandomArray} from "../../util/MathUtils";

extend({EffectComposer, RenderPass, OutlinePass, ShaderPass})


const context = React.createContext()

export function useHover() {
    const ref = useRef()
    const setHovered = useContext(context)
    const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
    const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
    return {ref, onPointerOver, onPointerOut}
}

const Outline = ({children}) => {
    const {gl, scene, camera, size} = useThree()
    const composer = useRef()
    const [hovered, set] = useState([])
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
    useEffect(() => composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(), 1)
    return (
        <context.Provider value={set}>
            {children}
            <effectComposer ref={composer} args={[gl]}>
                <renderPass attachArray="passes" args={[scene, camera]}/>
                <outlinePass
                    attachArray="passes"
                    args={[aspect, scene, camera]}
                    selectedObjects={hovered}
                    visibleEdgeColor="white"
                    edgeStrength={10}
                    edgeThickness={0.1}
                />
                {/*<shaderPass attachArray="passes" args={[FXAAShader]}*/}
                {/*            uniforms-resolution-value={[1 / size.width, 1 / size.height]}/>*/}
            </effectComposer>
        </context.Provider>
    )
}

export function getTileXRotation() {
    return -0.3
}

export function getTileZRotation() {
    return RandomInNegativeRange(0.5)
}

function closestFilter(intersections) {
    return intersections?.length ? [intersections[0]] : intersections
}

export default function Dump({films}) {
    const zIndices = Array.from(new UniqueRandomArray(films.length).set)
    console.log(zIndices)
    const tiles = films.map((film, i) =>
        <Tile
            film={film}
            key={i}
            position-x={RandomInNegativeRange(4)}
            position-y={RandomInNegativeRange(2.5)}
            position-z={zIndices[i] - 1}
            rotation-x={getTileXRotation()}
            rotation-z={getTileZRotation(.7)}
        />)

    return (
        <Canvas
            pixelRatio={window.devicePixelRatio}
            raycaster={{filter: closestFilter}}
        >
            <ambientLight intensity={2}/>
            <Outline>
                {tiles}
            </Outline>
        </Canvas>
    )
}