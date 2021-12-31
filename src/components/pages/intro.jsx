import React, {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Typist from 'react-typist'
import {Link} from "@reach/router";
import Logo from "../Logo";

export default function Intro({children, isShowing, isFrameExpanded, setLogoCentered, setShowIntro}) {
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
                            setTimeout(() => {
                                setLogoCentered(false)
                            }, 150)
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
                            setShowIntro(false)

                        }, 1000)
                        }}
                            >
                        {children}
                            </Typist>
                            </motion.div>
                        }
                            </AnimatePresence>
                            </motion.div>
                            </div>
                            )
                        }