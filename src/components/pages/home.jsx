import * as React from "react"
import Film from "../data/Film"
import PropTypes from "prop-types"
import "../../styles/home.sass"
import CardCanvas from "../cardCanvas";
import {useMemo} from "react";

function Home({film, setShowFilm, filmCount}) {
    const {title, logline} = film
    const count = useMemo(() => filmCount.toString().padStart(2, "0"), [filmCount])

    return (
        <div className={'home'}>
            <div className={'cardContainer'}>
                <CardCanvas film={film} setShowFilm={setShowFilm}/>
            </div>
            <div className={'cardBorder'}>
                <span className={"cardCTA"}>CLICK TO WATCH</span>
                <span className={"cardNumber"}>{`${count} / 52`}</span>
            </div>
            <div className={'footer'}>
                <h1>{title.toUpperCase()}</h1>
                <h2>{logline}</h2>
            </div>
        </div>
    )
}

Home.propTypes = ({
    film: PropTypes.instanceOf(Film).isRequired
})

export default Home