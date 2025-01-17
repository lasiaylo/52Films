import "../../styles/tile.sass";
import { useThree } from "@react-three/fiber";

import React, { useEffect, useState } from "react";
import { getTileXRotation, getTileZRotation, useHover } from "./dump";
import { useDrag } from "@use-gesture/react";
import { clampRange, RandomInNegativeRange } from "../../util/MathUtils";
import { useSpring, animated } from "@react-spring/three";

const TileSize = 1.5;
const fallbackImage = "fallback.jpg";

export default function Tile({
  film,
  setSelected,
  isSelected,
  isOnSelection,
  setShowFilm,
  delay,
  finalDelay,
  texture,
}) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const posX = RandomInNegativeRange(getBounds(viewport.width));
  const posY = RandomInNegativeRange(getBounds(viewport.height));
  const margin = 20 / aspect;
  const selectedPos = [
    -viewport.width / 2.74 + (TileSize * 1.5) / 2.74 + margin / 0.74,
    0.1,
    1,
  ];
  const selectScale = [1.5, 1.5, 1.5];

  const [spring, setSpring] = useSpring(() => ({
    position: [posX, posY, 40],
    rotation: [10, 0, getTileZRotation()],
  }));

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (isSelected) {
      setSpring({
        position: selectedPos,
        rotation: [0, 0, 0],
        scale: selectScale,
        delay: firstRender ? finalDelay : 0,
      });
    } else {
      setSpring({
        position: [posX, posY, film.index * 0.01 - 0.5],
        rotation: [getTileXRotation(), 0, getTileZRotation()],
        scale: [1, 1, 1],
        delay: firstRender ? delay : 0,
      });
    }
  }, [isSelected]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const { position } = spring;
  const bind = useDrag(
    ({
      offset: [ox, oy],
      velocity: [vx, vy],
      direction: [dx, dy],
      down,
      tap,
    }) => {
      if (isOnSelection && !isSelected) {
        setSelected();
        return;
      }
      if (tap) {
        if (isSelected) {
          setShowFilm(film);
          return;
        }
        setSelected(film, true);
        return;
      }
      const [x, y] = position.animation.to;
      setSpring({
        position: down ? [ox, oy, 1] : [x, y, film.index * 0.01 - 0.5],
        rotation: down
          ? [-clampRange(vy * dy * 40, 0.5), clampRange(vx * dx * 40, 0.5), 0]
          : [getTileXRotation(), 0, getTileZRotation()],
      });
      if (isSelected) {
        setSelected();
      }
    },
    {
      pointerEvents: true,
      from: () => [position.get()[0], position.get()[1]],
      bounds: {
        left: getBounds(-viewport.width),
        right: getBounds(viewport.width),
        top: getBounds(-viewport.height),
        bottom: getBounds(viewport.height),
      },
      transform: ([x, y]) => [x / aspect, -y / aspect],
      filterTaps: true,
    }
  );

  return (
    <animated.mesh {...spring} {...bind()} {...useHover()}>
      <planeBufferGeometry attach="geometry" args={[TileSize, TileSize]} />
      <meshStandardMaterial attach="material" map={texture} />
    </animated.mesh>
  );
}

export function getSources(gatsbyImage) {
  if (gatsbyImage == null) {
    return Array(3).fill(fallbackImage);
  }
  let [smallSrc, midSrc, largeSrc] =
    gatsbyImage.images.sources[0].srcSet.split(",");
  return [smallSrc.split(" ")[0], midSrc.split(" ")[0], largeSrc.split(" ")[0]];
}

function getBounds(dimension) {
  return dimension / 2.5;
}
