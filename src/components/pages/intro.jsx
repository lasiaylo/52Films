import React, {useState} from "react"
import {motion} from "framer-motion"
import Typist from 'react-typist'

export default function Intro({children, setShowIntro, isShowing}) {
    const[isShowingText, setShowingText] = useState(isShowing)

    return (
        <div className={"introContainer"}>
            <motion.div className={"introTextContainer"}
                        initial={isShowingText ? {
                            width: "310px",
                            height: "63px",
                        } : {
                            width: "100%",
                            height: "100%",
                        }}
                        animate={isShowingText ? undefined :
                            {
                                width: "100%",
                                height: "100%",
                            }
                        }
                        transition={{type: "tween"}}
                        onAnimationComplete={() => {
                            setShowIntro(false)
                        }}
            >
                {isShowingText && <Typist className={"intro"}
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
                </Typist>}
            </motion.div>
        </div>
    )
}