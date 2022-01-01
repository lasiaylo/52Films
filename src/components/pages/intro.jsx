import React, {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Typist from 'react-typist'
import {isBrowser} from "../../services/auth";

export default function Intro({children, isShowing, isFrameExpanded, setLogoCentered, setShowIntro}) {
    let text = children
    let shouldAllowIntoSite = true
    if(isBrowser() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        text = 'This site is formatted for desktop. Mobile coming soon'
        shouldAllowIntoSite = false
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
                        transition={{type: "tween", duration: 0.2}}
                        onAnimationStart={() => {
                            setLogoCentered(true)
                        }}
                        onAnimationComplete={() => {
                                setLogoCentered(false)
                        }}
                            >
                            <AnimatePresence>
                        {isShowing &&
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
                                if (shouldAllowIntoSite) {
                                    setShowIntro(false)
                                }
                        }, 1000)
                        }}
                            >
                        {text}
                            </Typist>
                            </motion.div>
                        }
                            </AnimatePresence>
                            </motion.div>
                            </div>
                            )
                        }