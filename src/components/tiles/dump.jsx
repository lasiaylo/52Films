import Tile from "./tile";
import {Canvas} from "@react-three/fiber";
import React from "react"

export default function Dump(film) {
    return (
        <Canvas className={"dump"}>
            <Tile film={film}/>
        </Canvas>
    )
}