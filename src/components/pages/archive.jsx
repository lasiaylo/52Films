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
                }
            }
        )
    )

    const [selectedIndex, setSelectedIndex] = useState(-1)

    const setSelected = (film) => {
        if (typeof film !== 'undefined') {
            setSelectedIndex(film.index)
        } else {
            setSelectedIndex(-1)
        }
    }

    const Credits = ({film}) => {
        const cast = film.cast.map((member, i) => {
            return (
                <span key={i}>{member}</span>
            )
        })
        return <div className={"credits"}>
            <span className={"column"}>Cast:</span>
            {cast}
        </div>
    }

    const credits = selectedIndex !== -1 ? <Credits film={films[selectedIndex]}/> : undefined

    return (
            <div className={"archive"}>
                <Directory films={filmList} selectedIndex={selectedIndex} setSelected={setSelected}/>
                <Dump films={filmList} selectedIndex={selectedIndex} setSelected={setSelected}/>
                {credits}
            </div>
    )
}
