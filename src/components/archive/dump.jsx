import Tile, {MemoizedTile} from "./tile";
import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";
import React, {memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react"
import {Vector2} from "three"
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer"
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass"
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass"
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass"
import {RandomInNegativeRange} from "../../util/MathUtils"
import Blur from "./blur";

extend({EffectComposer, RenderPass, OutlinePass, ShaderPass})

const hoverContext = React.createContext()

export function useHover() {
    const ref = useRef()
    const setHovered = useContext(hoverContext)
    const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
    const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
    return {ref, onPointerOver, onPointerOut}
}

const Outline = ({children, enable}) => {
    const {gl, scene, camera, size} = useThree()
    const composer = useRef()
    const [hovered, set] = useState([])
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
    useEffect(() => composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(), 1)
    return (
        <hoverContext.Provider value={set}>
            {children}
            <effectComposer ref={composer} args={[gl]}>
                <renderPass attachArray="passes" args={[scene, camera]}/>
                <outlinePass
                    attachArray="passes"
                    args={[aspect, scene, camera]}
                    selectedObjects={hovered}
                    visibleEdgeColor="white"
                    edgeStrength={10}
                    edgeThickness={enable ? 0.1 : 0}
                />
            </effectComposer>
        </hoverContext.Provider>
    )
}

export function getTileXRotation() {
    return -0.2
}

export function getTileZRotation() {
    return RandomInNegativeRange(.7)
}

function closestFilter(intersections) {
    // TODO: Shouldn't put cursor management here.
    if (intersections?.length > 0) {
        if (document) {
            document.body.style.cursor = 'pointer'
        }
        return [intersections[0]]
    }
    else {
        if (document) {
            document.body.style.cursor = 'default'
        }
        return intersections
    }
}

export default function Dump(props) {
    const {films, selectedIndex, setSelected, setShowFilm} = props
    const filmIsSelected = selectedIndex !== -1
    const filmCount = useMemo(() => films.filter((film => !film.filler)).length, [])
    const tiles = films.map((film, i) => {
        if (!film.filler) {
            return <Tile
                key={`tile${i}`}
                film={film}
                delay={i * 18}
                finalDelay={(filmCount + 1) * 18}
                isSelected={selectedIndex === i}
                setSelected={setSelected}
                setShowFilm={setShowFilm}
            />
        }
    })

    const logline = filmIsSelected ?
        <div className={"logline"} onClick={() => setSelected()}>{[films[selectedIndex].logline]}</div>
        : undefined

    return (
        <div className={"dump"}>
            <div className={"canvas"}>
                <Canvas
                    raycaster={{filter: closestFilter}}
                    onPointerMissed={() => setSelected()}
                    linear
                    colorManagement={false}
                >
                    <ambientLight intensity={0.1}/>
                    <pointLight intensity={1} position={[10, 10, 10]}/>
                    <Outline
                        enable={!filmIsSelected}
                    >
                        {tiles}
                        <Blur {...props} isSelected={filmIsSelected}/>
                    </Outline>
                </Canvas>
            </div>
            {logline}
        </div>
    )
}