import React, {useCallback, useEffect, useMemo, useState} from 'react'
import DumpLazy from "../archive/dumplazy"
import Directory from "../archive/directory"
import "../../styles/archive.sass"
import Credits from "../archive/credits";
import {isMobile} from "../../services/auth";
import {graphql, useStaticQuery} from "gatsby";
import Film from "../data/Film";

export const lastyearQuery = graphql`
    query {
        films: allContentfulFilm(
            filter: {createdAt:{lt: "2024-01-01"}},
            sort: { fields: [createdAt],
                order: ASC}
        ) {
            edges {
                ...FilmQuery
            }
        },
    }
`

const scrollTo = (index) => {
    const element = document.getElementById(`film${index}`)
    if (element) {
        element.scrollIntoView({block: "center", behavior: "smooth"})
    }
}

const fillerText = "?????"

export function getListWithFiller(filmsToAdd) {
    const films = new Array(52).fill({
        title: fillerText,
        filmmaker: [
            {
                firstName: fillerText,
                lastName: "",
            }
        ],
        filler: true
    })
    films.splice(0, filmsToAdd.length, ...filmsToAdd)
    return films.map(
        (film, i) => {
            let filmInfo = film ?? {}
            return {
                ...filmInfo,
                index: i,
                hidden: false,
            }
        }
    )
}

export default function Archive(props) {
    const data = useStaticQuery(lastyearQuery, props);
    const filmMap = useMemo(() => {
        const map = new Map();

        data.films.edges.forEach(
            film => {
                const year = (new Date(film.node.publishDate ?? film.node.createdAt)).getFullYear();
                if (!map.has(year)) {
                    map.set(year, [])
                }
                map.get(year).push(new Film(film.node))
            }
        );
        map.set(2024, props.films);

        Array.from(map.keys()).forEach(key => {
            map.set(key, getListWithFiller(map.get(key)))
        })
        return map
    }, [data.films.edges])
    

    const [year, setYear] = useState(2024)
    const {setShowFilm} = props

    // TODO: Hacky solution. Fix
    // let filmsToAdd = year === 2022 ? lastyearFilms : props.films;
    // const films = filmsToAdd;
    const [filmList, setFilmListImpl] = useState(filmMap.get(2024));
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
        setFilm(filmMap.get(year))
    }, [year])

    const setFilm = useCallback(films => {
        setFilmListImpl(
            films.map(
                (film, i) => {
                    let filmInfo = film ?? {}
                    return {
                        ...filmInfo,
                        index: i,
                        hidden: false,
                    }
                }
            )
        )
    })

    const setSelected = useCallback((film, shouldScroll) => {
        if (typeof film !== 'undefined' && !film.filler) {
            const {index} = film
            setSelectedIndex(index)
            // TODO: Reimplement navigating. Be sure to clean up history when you reimplement
            // navigate(`/archive#${index + 1}`)

            if (shouldScroll && document) {
                scrollTo(index)
            }
        } else {
            setSelectedIndex(-1)
            // navigate(`/archive`)
        }
    }, [])

    return (
        <div className={"archive"}>
            <Directory films={filmList} selectedIndex={selectedIndex} setSelected={setSelected} setShowFilm={setShowFilm} year={year} setYear={setYear}/>
                {!isMobile() && <DumpLazy films={filmList} selectedIndex={selectedIndex} setSelected={setSelected} setShowFilm={setShowFilm}/>}
                {!isMobile() && selectedIndex !== -1  &&  <Credits film={filmList[selectedIndex]} setSelected={setSelected}/>}
        </div>
    )
}
