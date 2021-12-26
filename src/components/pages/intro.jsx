import React, {useEffect} from "react"
import {motion} from "framer-motion"
import Typist from 'react-typist'

export default function Intro({children, setShowIntro, isShowing}) {
    return (
        <div className={"introContainer"}>
            <motion.div className={"introTextContainer"}
                        layoutId={"frame"}
                        layout={"size"}
                        layoutDependency={isShowing}
            >
                <Typist className={"intro"}
                        cursor={{show: false}}
                        startDelay={100}
                        avgTypingDelay={15} stdTypingDelay={0}
                        // onTypingDone={() => setTimeout(() => setShowIntro(false), 2000)}
                >
                    {children}
                </Typist>
            </motion.div>
        </div>
    )
}