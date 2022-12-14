import PropTypes from "prop-types";
import React, { forwardRef } from "react";
// third-party
import { motion, useCycle } from "framer-motion";

// ==============================|| ANIMATION BUTTON ||============================== //

const AnimateButton = forwardRef(
  //@ts-ignore
  (props: any, ref: React.Ref<HTMLDivElement> | undefined) => {
    const { children, type, direction, offset, scale } = props;
    let scale2 = scale;
    let offset1;
    let offset2;
    switch (direction) {
      case "up":
      case "left":
        offset1 = offset;
        offset2 = 0;
        break;
      case "right":
      case "down":
      default:
        offset1 = 0;
        offset2 = offset;
        break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
      case "rotate":
        return (
          <motion.div
            ref={ref}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              repeatDelay: 0,
            }}
          >
            {children}
          </motion.div>
        );
      case "slide":
        if (direction === "up" || direction === "down") {
          return (
            <motion.div
              ref={ref}
              animate={{ y: y !== undefined ? y : "" }}
              onHoverEnd={() => cycleY()}
              onHoverStart={() => cycleY()}
            >
              {children}
            </motion.div>
          );
        }
        return (
          <motion.div
            ref={ref}
            animate={{ x: x !== undefined ? x : "" }}
            onHoverEnd={() => cycleX()}
            onHoverStart={() => cycleX()}
          >
            {children}
          </motion.div>
        );

      case "scale":
      default:
        if (typeof scale === "number") {
          scale2 = {
            hover: scale,
            tap: scale,
          };
        }
        return (
          <motion.div ref={ref} whileHover={{ scale: scale2?.hover }} whileTap={{ scale: scale2?.tap }}>
            {children}
          </motion.div>
        );
    }
  },
);

AnimateButton.propTypes = {
  //@ts-ignore
  children: PropTypes.node,
  offset: PropTypes.number,
  type: PropTypes.oneOf(["slide", "scale", "rotate"]),
  direction: PropTypes.oneOf(["up", "down", "left", "right"]),
  scale: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

AnimateButton.defaultProps = {
  //@ts-ignore
  type: "scale",
  offset: 10,
  direction: "right",
  scale: {
    hover: 1,
    tap: 0.9,
  },
};

export default AnimateButton;
