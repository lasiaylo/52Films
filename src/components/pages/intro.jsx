import React, {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Typist from 'react-typist'
import {Link} from "@reach/router";
import Logo from "../Logo";

export default function Intro({children, setShowIntro, isShowing}) {
    const [isShowingText, setShowingText] = useState(isShowing)
    const [isFrameExpanded, setFrameExpanded] = useState(!isShowingText)

    const showVariant = {
        hidden: {opacity: 0},
        center: {opacity: 1, position: "absolute", left: "30%", top: "30%"},
        topLeft: {opacity: 1, position: "absolute", left: "20px", top: "20px"}
    }

    let logoState = 'hidden'

    if (!isShowingText) {
        logoState = 'center'
        if (isFrameExpanded) {
            logoState = 'topLeft'
        }

    }
    return (
        <div className={"introContainer"}>
            <motion.div className={"introTextContainer"}
                        initial={!isFrameExpanded ? {
                            width: "310px",
                            height: "310px",
                        } : {
                            width: "100%",
                            height: "100%",
                        }}
                        animate={!isFrameExpanded ? undefined :
                            {
                                width: "100%",
                                height: "100%",
                            }
                        }
                        transition={{type: "tween"}}
                        onAnimationComplete={() => {
                            setShowIntro(true)
                        }}
            >
                {/*<AnimatePresence>*/}
                    {isShowingText &&
                    <motion.div
                        key="introText"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                    <Typist className={"intro"}
                            cursor={{show: false}}
                            startDelay={100}
                            avgTypingDelay={20} stdTypingDelay={0}
                            onTypingDone={() => {
                                setTimeout(() => {
                                    setShowingText(false)
                                }, 1000)
                            }}
                    >
                        {children}
                    </Typist>
                    </motion.div>
                    }
                    {!isShowingText && <motion.div
                        className={"logo"}
                        key="menu"
                        initial="hidden"
                        animate={logoState}
                        variants={showVariant}
                        transition={{type: "tween", duration: 0.5}}
                        onAnimationComplete={() => {
                            setFrameExpanded(true)
                        }}
                    >
                        <Link to={"/"}><Logo/></Link>
                    </motion.div>}
                {/*</AnimatePresence>*/}
            </motion.div>
        </div>
    )
}