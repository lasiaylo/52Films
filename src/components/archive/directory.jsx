import React, {useEffect, useState} from "react"

const getFilmmaker = ({filmmaker}) => filmmaker[0].firstName + " " + filmmaker[0].lastName

const getHoveredClassName = (className, isHovered) => isHovered ? className + " hovered" : className

function ListElement({film, setFocusedFilm}) {
    const [isHovered, setHover] = useState(false)
    useEffect(() => {
        setFocusedFilm(film)
    }, [isHovered])
    return (
        <div
            className={getHoveredClassName("listRow", isHovered)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={"listInfo"}>
                <span className={getHoveredClassName("listTitle", isHovered)}>{film.title.toUpperCase()}</span>
                <span
                    className={getHoveredClassName("listFilmmaker", isHovered)}>{getFilmmaker(film).toUpperCase()}</span>
            </div>
            <div className={getHoveredClassName("listNumber", isHovered)}>{film.index + 1}</div>
        </div>
    )
}

export default function Directory({films, setFocusedFilm}) {
    return (
        <div className={"directory"}>
            <div className={"filler"}/>
            <div className={"filter"}>Filter</div>
            <ul className={"list"}>
                {films.map((film, i) =>
                    <ListElement
                        key={i}
                        film={film}
                        setFocusedFilm={setFocusedFilm}
                    />
                )}
            </ul>
        </div>

    )
}