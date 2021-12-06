import React, {useEffect, useState} from "react"

const getFilmmaker = ({filmmaker}) => filmmaker[0].firstName + " " + filmmaker[0].lastName

const getHoveredClassName = (className, isHovered) => isHovered ? className + " hovered" : className

function ListElement({film, isSelected, selectedIndex, setSelected}) {
    const [isHovered, setHover] = useState(false)
    useEffect(() => {
        if (isHovered) {
            setSelected(film)
        }
    }, [isHovered])

    return (
        <div
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

// function Filter({films, setHidden}) {
//     const
// }

export default function Directory({films, ...props}) {
    return (
        <div className={"directoryContainer"}>
            <div className={"directory"}>
                <div className={"filler"}/>
                <div className={"filter"}/>
                <ul className={"list"}>
                    {films.map((film, i) =>
                        <ListElement
                            key={i}
                            film={film}
                            isSelected={props.selectedIndex === i}
                            {...props}
                        />
                    )}
                </ul>
            </div>
        </div>

    )
}