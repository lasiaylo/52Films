import * as React from "react"
import Film from "../Film"
import VideoPlayer from "../player"
import PropTypes from "prop-types"
import "../../styles/home.sass"

function Home({film}) {
    const {title, logline} = film
    return (
        <div className={'home'}>
            <div className={'video'}>
            <VideoPlayer/>
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