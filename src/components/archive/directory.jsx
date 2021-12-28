import React, {memo, useEffect, useState} from "react"
import {motion} from "framer-motion"

const getFilmmaker = ({filmmaker}) => filmmaker[0].firstName + " " + filmmaker[0].lastName

const getHoveredClassName = (className, isHovered) => isHovered ? className + " hovered" : className

const getShouldHighlight = (isSelected, isHovered, film) => isSelected || (!film.filler && isHovered)

function ListElement({film, isSelected, setSelected, setShowFilm}) {
    const [isHovered, setHover] = useState(false)
    useEffect(() => {
        if (isHovered) {
            setSelected(film)
        }
    }, [isHovered])
    const shouldHighlight = getShouldHighlight(isSelected, isHovered, film)

    const listInfo = film.filler ? (
        <span className={"listFiller"}>?</span>
    ) : <div className={"listInfo"}>
        <span className={getHoveredClassName("listTitle", shouldHighlight)}>{film.title.toUpperCase()}</span>
        <span
            className={getHoveredClassName("listFilmmaker", shouldHighlight)}>{getFilmmaker(film).toLowerCase()}</span>
    </div>

    const animationDelay = {"animationDelay": `${film.index * 0.125}s`,}
    const fadeInDelay = {"animationDelay": `${(film.index * 0.125) + 0.1}s`,}

    return (
        <div className={"listRow"}>
            <div
                id={`film${film.index}`}
                className={getHoveredClassName("listRowInfo", shouldHighlight)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setShowFilm(film)}
                style={film.filler ? {...fadeInDelay} : {cursor: "pointer", ...fadeInDelay}}
            >
                {listInfo}
                <div className={getHoveredClassName("listNumber", shouldHighlight)}>{film.index + 1}</div>
            </div>
            <span className="rowLine" style={animationDelay}/>
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
                <div className={"filler"}/>
                <span className={"filter"}/>
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