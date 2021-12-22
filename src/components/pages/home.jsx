import * as React from "react"
import Film from "../data/Film"
import PropTypes from "prop-types"
import "../../styles/home.sass"
import Preview from "../preview";

function Home({film, setShowFilm}) {
    const {title, logline, videoSrc} = film

    return (
        <div className={'home'}>
            <div className={'cardContainer'}>
                <Preview film={film} videoSrc={videoSrc} setShowFilm={setShowFilm}/>
            </div>
            <div className={'cardBorder'}>
                <span className={"cardCTA"}>CLICK TO WATCH</span>
                <span className={"cardNumber"}>34 / 52</span>
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