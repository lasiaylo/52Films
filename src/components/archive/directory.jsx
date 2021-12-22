import React, {memo, useEffect, useState} from "react"

const getFilmmaker = ({filmmaker}) => filmmaker[0].firstName + " " + filmmaker[0].lastName

const getHoveredClassName = (className, isHovered) => isHovered ? className + " hovered" : className

const getShouldHighlight = (isSelected, isHovered, film) => isSelected || (film.filler && isHovered)

function ListElement({film, isSelected, setSelected}) {
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
        >
            <div className={"listInfo"}>
                <span className={getHoveredClassName("listTitle", shouldHighlight)}>{film.title.toUpperCase()}</span>
                <span
                    className={getHoveredClassName("listFilmmaker", shouldHighlight)}>{getFilmmaker(film).toUpperCase()}</span>
            </div>
            <div className={getHoveredClassName("listNumber", shouldHighlight)}>{film.index + 1}</div>
        </div>
    )
}

const MemoizedListElement = memo(ListElement,
    (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
)

export default function Directory({films, selectedIndex, setSelected}) {
    return (
        <div className={"directoryContainer"}>
            <div className={"directory"}>
                <div className={"filler"}/>
                <div className={"filter"}/>
                <ul className={"list"}>
                    {films.map((film, i) =>
                        <MemoizedListElement
                            key={`film${i}`}
                            film={film}
                            isSelected={selectedIndex === i}
                            setSelected={setSelected}
                        />
                    )}
                </ul>
            </div>
        </div>

    )
}