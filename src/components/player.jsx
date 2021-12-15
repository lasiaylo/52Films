import React, {useEffect, useRef} from "react"
import Vimeo from '@vimeo/player'

// Source: https://github.com/Darth-Knoppix/example-react-fullscreen/tree/master/src/utils
function useFullscreenStatus(elRef) {
    const [isFullscreen, setIsFullscreen] = React.useState(
        document[getBrowserFullscreenElementProp()] != null
    );

    const setFullscreen = () => {
        if (elRef.current == null) return;
        console.log(elRef)
        elRef.current
            .requestFullscreen()
            .then(() => {
                console.log("Everything rocks")
                setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
            })
            .catch(() => {
                console.log("Everything sucks")
                setIsFullscreen(false);
            });

    };

    React.useLayoutEffect(() => {
        document.onfullscreenchange = () =>
            setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

        return () => (document.onfullscreenchange = undefined);
    });

    return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== "undefined") {
        return "fullscreenElement";
    } else if (typeof document.mozFullScreenElement !== "undefined") {
        return "mozFullScreenElement";
    } else if (typeof document.msFullscreenElement !== "undefined") {
        return "msFullscreenElement";
    } else if (typeof document.webkitFullscreenElement !== "undefined") {
        return "webkitFullscreenElement";
    } else {
        throw new Error("fullscreenElement is not supported by this browser");
    }
}

// export default class VideoPlayer extends React.Component {
//     constructor(props) {
//         super();
//         this.ref = React.createRef()
//         console.log(this.ref)
//     }
//
//     componentDidMount() {
//         let options = {
//             url: "https://vimeo.com/594424473",
//             width: 200
//         }
//         const player = new Vimeo(this.ref.current, options)
//     }
//
//     render() {
//         return (
//             <div className={"players"}
//                  ref={this.ref}
//                  id="vidplay">
//             </div>
//         )
//     }
// }

export default function VideoPlayer({src}) {
    const ref = useRef()
    let isFullscreen, setIsFullscreen;
    let errorMessage;

    useEffect(() => {
        let options = {
            url: "https://vimeo.com/594424473",
        }

        const player = new Vimeo(ref.current, options)
        player.play()

        console.log(player)
    })

    return (
        <div className={"player"}
             ref={ref}
        >
        </div>

    );
}