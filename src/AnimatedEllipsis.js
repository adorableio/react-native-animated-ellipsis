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

    // Update target opacity based on the current dot's opacity
    const updatedTargetOpacity =
      dotOpacities[whichDot]._value === minOpacity ? 1 : minOpacity;

    // Animate the current dot's opacity
    Animated.timing(dotOpacities[whichDot], {
      toValue: updatedTargetOpacity,
      duration: animationDelay,
      useNativeDriver: false,
    }).start(() => {
      // Move to the next dot
      const nextDot = (whichDot + 1) % numberOfDots;
      animateDots(nextDot); // Call animateDots for the next dot
    });
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
