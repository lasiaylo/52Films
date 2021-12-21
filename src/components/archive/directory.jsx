import React, {memo, useEffect, useState} from "react"

const getFilmmaker = ({filmmaker}) => filmmaker[0].firstName + " " + filmmaker[0].lastName

const getHoveredClassName = (className, isHovered) => isHovered ? className + " hovered" : className

function ListElement({film, isSelected, setSelected}) {
    const [isHovered, setHover] = useState(false)
    useEffect(() => {
        if (isHovered) {
            setSelected(film)
        }
    }, [isHovered])

    return (
        <div
            id={`film${film.index}`}
            className={getHoveredClassName("listRow", isSelected)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={"listInfo"}>
                <span className={getHoveredClassName("listTitle", isSelected)}>{film.title.toUpperCase()}</span>
                <span
                    className={getHoveredClassName("listFilmmaker", isSelected)}>{getFilmmaker(film).toUpperCase()}</span>
            </div>
            <div className={getHoveredClassName("listNumber", isSelected)}>{film.index + 1}</div>
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