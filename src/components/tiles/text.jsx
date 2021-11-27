import React, { useState } from "react"
import ReactDOM from "react-dom"
import { extend, Canvas } from '@react-three/fiber'
import { Text } from "troika-three-text"

extend({ Text })

const Textss({props}) {
    const [opts, setOpts] = useState({
        font: "Philosopher",
        fontSize: 12,
        color: "#99ccff",
        maxWidth: 300,
        lineHeight: 1,
        letterSpacing: 0,
        textAlign: "justify",
        materialType: "MeshPhongMaterial"
    });

    return  <text
        position-z={-180}
        rotation={rotation}
        {...opts}
        text={text}
        font={fonts[opts.font]}
        anchorX="center"
        anchorY="middle"
    >
        {opts.materialType === "MeshPhongMaterial" ? (
            <meshPhongMaterial attach="material" color={opts.color} />
        ) : null}
    </text>
}