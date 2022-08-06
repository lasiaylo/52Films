import React, {memo, useEffect, useState} from "react"
import {motion} from "framer-motion"
import {isMobile} from "../../services/auth";
import {GatsbyImage} from "gatsby-plugin-image";
import { getFilmmakerNames } from "../about/FilmmakerBio"

const getHoveredClassName = (className, isHovered) => isHovered ? className + " hovered" : className

const getShouldHighlight = (isSelected, isHovered, film) => isSelected || (!film.filler && isHovered)

function ListElement({film, isSelected, setSelected, setShowFilm}) {
    const {filler, index, title, stillPreview} = film
    const [isHovered, setHover] = useState(false)
    useEffect(() => {
        if (isHovered) {
            setSelected(film)
        }
    }, [isHovered])
    const shouldHighlight = getShouldHighlight(isSelected, isHovered, film)

    const listInfo = filler ? (
        <span className={"listFiller"}>?</span>
    ) : <div className={"listInfo"}>
        <span className={getHoveredClassName("listTitle", shouldHighlight)}>{title.toUpperCase()}</span>
        <span className={getHoveredClassName("listFilmmaker", shouldHighlight)}>{getFilmmakerNames(film).toLowerCase()}</span>
    </div>

    const delay = index < 10 ? index * 0.125 : 0
    const animationDelay = {"animationDelay": `${delay}s`}
    const fadeInDelay = {"animationDelay": `${delay + 0.1}s`}
    const animationDuration = {"animationDuration": index < 10 ? "0.35s" : "0s"}

    const orientation = index % 2 ? "left" : "right"
    const isFiller = filler ? "fillerRow" : ""
    return (
        <div className={"listRow"}>
            <div
                id={`film${index}`}
                className={getHoveredClassName(`listRowInfo ${orientation} ${isFiller}`, shouldHighlight)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setShowFilm(film)}
                style={filler ? {...fadeInDelay, ...animationDuration} : {cursor: "pointer", ...fadeInDelay, ...animationDuration}}
            >
                {listInfo}
                {<div className={getHoveredClassName(`listNumber ${orientation}`, shouldHighlight)}>{index + 1}</div>}
                {isMobile() && !filler &&
                <GatsbyImage
                    className={"filmStillPreview"}
                    alt={"FilmImage"}
                    image={stillPreview}
                />
                }
            </div>
            <span className="rowLine" style={{...animationDelay, ...animationDuration}}/>
        </div>
    )
}

const MemoizedListElement = memo(ListElement,
    (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
)

export default function Directory({films, selectedIndex, setSelected, setShowFilm}) {
    return (
        <div className={"directoryContainer"}>
            <motion.div className={"directory"}>
                {!isMobile() && <div className={"filler"}/>}
                {!isMobile() && <span className={"filter"}/>}
                <ul className={"list"}>
                    {films.map((film, i) =>
                        <MemoizedListElement
                            key={`film${i}`}
                            film={film}
                            isSelected={selectedIndex === i}
                            setSelected={setSelected}
                            setShowFilm={setShowFilm}
                        />
                    )}
                </ul>
            </motion.div>
            <span className={"directoryLine"}/>
        </div>

    )
}
