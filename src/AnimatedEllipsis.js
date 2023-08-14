import React, { useState, useEffect, useRef } from "react";
import { Text, Animated, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const AnimatedEllipsis = ({
  numberOfDots = 3,
  animationDelay = 300,
  minOpacity = 0,
  style = {
    color: "#aaa",
    fontSize: 32,
  },
}) => {
  const [dotOpacities, setDotOpacities] = useState(() => initializeDots());
  const [targetOpacity, setTargetOpacity] = useState(1);
  const shouldAnimateRef = useRef(true);

  function initializeDots() {
    return Array.from({ length: numberOfDots }, () =>
      new Animated.Value(minOpacity)
    );
  }

  const animateDots = (whichDot) => {
    if (!shouldAnimateRef.current) return;

    // Swap fade direction when we hit the end of the list
    if (whichDot >= dotOpacities.length) {
      whichDot = 0;
      const min = minOpacity;
      setTargetOpacity((prevOpacity) =>
        prevOpacity === min ? 1 : min
      );
    }

    const nextDot = whichDot + 1;

    Animated.timing(dotOpacities[whichDot], {
      toValue: targetOpacity,
      duration: animationDelay,
      useNativeDriver: false,
    }).start(() => animateDots(nextDot));
  };

  useEffect(() => {
    animateDots(0);

    return () => {
      shouldAnimateRef.current = false;
    };
  }, []);

  const dots = dotOpacities.map((o, i) => (
    <Animated.Text key={i} style={[style, { opacity: o }]}>
      {" "}
      .
    </Animated.Text>
  ));

  return <View style={styles.container}>{dots}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default AnimatedEllipsis;
