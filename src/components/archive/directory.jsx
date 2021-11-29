import React, {useEffect} from "react"


export default function Directory({films, setFocusedFilms}) {
    const getListElement = (film, i) => {
        return (
            <li key={i}>
                <h1 className={"listTitle"}>{film.title}</h1>
            </li>
        )


    }
    return (
        <div
            className={"directory"}>
            <div className={"filler"}/>
            <div
                className={"filter"}>Filter</div>
            <div className={"listContainer"}>
                <ul className={"list"}>
                    {/*{films.map((film, i) => getListElement(film, i))}*/}
                </ul>
            </div>
        </div>

    )
}