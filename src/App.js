import React, { useEffect } from "react";
import { animated, useTrail, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import randomColor from "randomcolor";
import "./styles.css";

export default function App() {
  const [trail, setTrail] = useTrail(6, () => ({
    left: -500,
    top: 100,
    backgroundColor: randomColor(),
    config: config.gentle
  }));

  const bind = useDrag(({ args, down, movement: [mx, my] }) => {
    if (args[0] !== 0) return;
    setTrail({
      left: mx,
      top: my
    });
    if (!down) {
      setTrail({
        left: 0,
        top: 0,
        backgroundColor: randomColor()
      });
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setTrail({
        left: 0,
        top: 0
      });
    }, 0);
  }, [setTrail]);

  return (
    <>
      Drag bubble
      <div style={{ display: "flex" }}>
        {trail.map((props, i, arr) => (
          <animated.div className="box" key={i} {...bind(i)} style={props} />
        ))}
      </div>
    </>
  );
}
