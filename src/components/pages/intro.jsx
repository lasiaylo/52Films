import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Typist from "react-typist";
import { isMobile } from "../../services/auth";

export default function Intro({
  children,
  isFrameExpanded,
  isLogoCentered,
  isShowing,
  setLogoCentered,
  setShowIntro,
}) {
  let text = children;
  let shouldAllowIntoSite = true;
  return (
    <div className={"introContainer"}>
      <motion.div
        className={"introTextContainer"}
        initial={
          !isFrameExpanded
            ? {
                width: "310px",
                height: "310px",
              }
            : {
                width: "100%",
                height: "100%",
              }
        }
        animate={
          !isFrameExpanded
            ? undefined
            : {
                width: "100%",
                height: "100%",
              }
        }
        transition={{ type: "tween", duration: 0.2 }}
        onAnimationStart={() => {
          setLogoCentered(isLogoCentered);
        }}
        onAnimationComplete={() => {
          setLogoCentered(false);
        }}
      >
        <AnimatePresence>
          {isShowing && (
            <motion.div
              key="introText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Typist
                className={"intro"}
                cursor={{ show: false }}
                startDelay={100}
                avgTypingDelay={20}
                stdTypingDelay={0}
                onTypingDone={() => {
                  setTimeout(() => {
                    if (shouldAllowIntoSite) {
                      setShowIntro(false);
                    }
                  }, 1000);
                }}
              >
                {text}
              </Typist>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
