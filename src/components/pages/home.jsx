import * as React from "react"
import Film from "../Film";
import VideoPlayer from "../player";
import PropTypes from "prop-types";

function Home({film}) {
    return (
        <div>
            <VideoPlayer/>
            <h1>{film.title}</h1>
            <h2>{film.logline}</h2>
        </div>
    )
}

Home.propTypes = ({
    film: PropTypes.instanceOf(Film).isRequired
})


export default Home