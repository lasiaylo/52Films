import "../../styles/tile.sass"
import * as THREE from 'three'
import {extend, useLoader, useThree} from '@react-three/fiber'
import React, {useEffect} from "react"
import {Text} from "troika-three-text"
import {getTileXRotation, getTileZRotation, useHover} from "./dump"
import {useDrag} from "@use-gesture/react";
import {clampRange, RandomInNegativeRange} from "../../util/MathUtils";
import {useSpring, animated} from "@react-spring/three";

extend({Text})

const TileSize = 1.5

export default function Tile({film, ...props}) {
    const {logline, stillPreview} = film
    const {size, viewport} = useThree()

    const [, , largeSrc] = getSources(stillPreview)
    const texture = useLoader(THREE.TextureLoader, largeSrc)

    const posX = RandomInNegativeRange(getBounds(viewport.width))
    const posY = RandomInNegativeRange(getBounds(viewport.height))

    const [spring, setSpring] = useSpring(() =>
        ({
            position: [
                posX,
                posY,
                40,
            ],
            rotation: [
                2,
                0,
                getTileZRotation(),
            ],
        })
    )

    const setOriginalPos = () =>
        setSpring(
            {
                position: [
                    posX,
                    posY,
                    (film.index * .01) - 0.5
                ],
                rotation: [
                    getTileXRotation(),
                    0,
                    getTileZRotation(),
                ],
                delay: props.delay * 50,
            }
        )

    useEffect(() => {
            if (film.focused) {
                setSpring(
                    {
                        position: [0, 0, 2],
                        rotation: [0, 0, 0,],
                    }
                )
            } else {
                setOriginalPos()
            }

        }, [film.focused]
    )
    useEffect(setOriginalPos, [])

    const {position} = spring
    const aspect = size.width / viewport.width;
    const bind = useDrag((
        {
            offset: [ox, oy],
            velocity: [vx, vy],
            direction: [dx, dy],
            down,
            tap
        }) => {
        if (tap) {
            props.setFocusedFilms(film)
            return
        }
        const [x, y] = position.animation.to
        setSpring(
            {
                position: down ? [ox, oy, 1] : [x, y, (film.index * .01) - 0.5],
                rotation: down ? [-clampRange(vy * dy * 40, 0.5), clampRange(vx * dx * 40, 0.5), 0] : [getTileXRotation(), 0, getTileZRotation()]
            }
        )

    }, {
        pointerEvents: true,
        from: () => [position.get()[0], position.get()[1]],
        bounds: {
            left: getBounds(-viewport.width),
            right: getBounds(viewport.width),
            top: getBounds(-viewport.height),
            bottom: getBounds(viewport.height),
        },
        transform: (([x, y]) => [x / aspect, -y / aspect]),
        filterTaps: true
    })

    return (
        <animated.mesh
            {...props}
            {...spring}
            position-z={props['position-z']}
            {...bind()}
            {...useHover()}
        >
            <planeBufferGeometry attach="geometry" args={[TileSize, TileSize]}/>
            <meshStandardMaterial attach="material" map={texture}/>
        </animated.mesh>
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

function getBounds(dimension) {
    return dimension / 3
}
