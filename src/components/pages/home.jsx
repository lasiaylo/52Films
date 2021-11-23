import * as React from "react"
import Film from "../Film"
import PropTypes from "prop-types"
import "../../styles/home.sass"
import Preview from "../preview";

function Home({film}) {
    const {title, logline, preview} = film
    return (
        <div className={'home'}>
            <div className={'imageContainer'}>
                <div className={'imageBorder'}>
                    <Preview image={preview}/>
                </div>
            </div>
            <div className={'footer'}>
                <h1>{title.toUpperCase()}</h1>
                <h2>{logline.toUpperCase()}</h2>
            </div>
        </div>
    )
}

Home.propTypes = ({
    film: PropTypes.instanceOf(Film).isRequired
})

export default Home