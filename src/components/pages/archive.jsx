import React, {useState} from 'react'
import Dump from "../archive/dump"
import Directory from "../archive/directory"
import "../../styles/archive.sass"

export default function Archive({film}) {
    const {title, logline, preview} = film
    const films = new Array(52).fill(film)

    const [filmList, setFilmList] = useState(
        films.map(
            (film, i) => {
                return {
                    ...film,
                    index: i,
                    hidden: false,
                    focused: false,
                }
            }
        )
    )

    const setHiddenFilms = (films) => {
        const hiddenFilmSet = new Set(films.map(film => film.index))
        setFilmList(
            filmList.map(
                (film, i) => {
                    return {...film, hidden: hiddenFilmSet.has(i)}
                }
            )
        )
    }

    const setFocusedFilm = (focusedFilm) => {
        setFilmList(
            filmList.map(
                (film, i) => {
                    return {...film, focused: i === focusedFilm.index}
                }
            )
        )
    }

    return (
        <div className={"archive"}>
            <Directory films={filmList} setFocusedFilm={setFocusedFilm}/>
            <Dump films={filmList} setFocusedFilms={setFocusedFilm}/>
        </div>
    )
}
