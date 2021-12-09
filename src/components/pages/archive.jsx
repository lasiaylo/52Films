import React, {useEffect, useState} from 'react'
import Dump from "../archive/dump"
import Directory from "../archive/directory"
import "../../styles/archive.sass"
import {navigate} from '@reach/router'

const scrollTo = (index) => {
    const element = document.getElementById(`film${index}`)
    element.scrollIntoView({block: "center", behavior: "smooth"})
}

export default function Archive({film}) {
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

    useEffect(() => {
            const hash = window.location.hash
            if (hash) {
                const index = parseInt(hash.split("#")[1])
                if (index) {

                    setSelectedIndex(index - 1)
                    scrollTo(index - 1)
                }
            }
        },
        []
    )

    const setSelected = (film, scroll) => {
        if (typeof film !== 'undefined') {
            const {index} = film
            setSelectedIndex(index)
            navigate(`/archive#${index + 1}`)

            if (scroll && document) {
                scrollTo(index)
            }
        } else {
            setSelectedIndex(-1)
            navigate(`/archive`)
        }
    }

    const Credits = ({film, setSelected}) => {
        const aa = new Array(1).fill("Allamaprabhu Prattanashetty, Director")
        const cast = aa.map((line, i) => {
            let [role, member] = line.split(',')
            role = role.trim()
            member = `${member.trim()}: `

            return (
                <div key={`credit pair ${i}`}>
                    <span key={`member${i}`} className={"name"}>{member}</span>
                    <span key={`role${i}`}>{role}</span>
                </div>
            )
        })
        return <div className={"credits"} onClick={()=>setSelected()}>
            <div className={"roles"}>
                {cast}
            </div>
        </div>
    }

    const credits = selectedIndex !== -1 ?
        <Credits film={films[selectedIndex]} setSelected={setSelected}/> : undefined

    return (
        <div className={"archive"}>
            <Directory films={filmList} selectedIndex={selectedIndex} setSelected={setSelected}/>
            <Dump films={filmList} selectedIndex={selectedIndex} setSelected={setSelected}/>
            {credits}
        </div>
    )
}
