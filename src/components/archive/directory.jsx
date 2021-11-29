import React from "react"

const getFilmmaker = ({filmmaker}) => filmmaker[0].firstName + " " + filmmaker[0].lastName

export default function Directory({films, setFocusedFilms}) {
    console.log(films)
    const getListElement = (film, i) => {
        return (
            <div className={"listRow"} key={i}>
                <div className={"listInfo"} key={i}>
                    <div className={"listTitle"}>{film.title.toUpperCase()}</div>
                    <div className={"listFilmmaker"}>{getFilmmaker(film).toUpperCase()}</div>
                </div>
                <div className={"number"}>{film.index + 1}</div>
            </div>
        )
    }

    return (
        <div className={"directory"}>
            <div className={"filler"}/>
            <div className={"filter"}>Filter</div>
            <ul className={"list"}>
                {films.map((film, i) => getListElement(film, i))}
            </ul>
        </div>

    )
}