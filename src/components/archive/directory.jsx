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
    return (
        <div
            id={`film${film.index}`}
            className={getHoveredClassName("listRow", shouldHighlight)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setShowFilm(film)}
            style={film.filler ? {} : {cursor: "pointer"}}
        >
            <div className={"listInfo"}>
                <span className={getHoveredClassName("listTitle", shouldHighlight)}>{film.title.toUpperCase()}</span>
                <span
                    className={getHoveredClassName("listFilmmaker", shouldHighlight)}>{getFilmmaker(film).toLowerCase()}</span>
            </div>
            <div className={getHoveredClassName("listNumber", shouldHighlight)}>{film.index + 1}</div>
        </div>
    )
}

const MemoizedListElement = memo(ListElement,
    (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
)

export default function Directory({films, selectedIndex, setSelected, setShowFilm}) {
    return (
        <div className={"directoryContainer"}>
            <motion.div className={"directory"}
                        initial={{left: "20px"}}
                        animate={{left: "0px"}}
                        exit={{left: "20px"}}
            >
                <div className={"filler"}/>
                <div className={"filter"}/>
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
        </div>

    )
}