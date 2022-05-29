import React, { Component } from "react";
import { View, Image, Animated } from "react-native";
import Images from "../assets/Images";

interface GhostProps {
  body: any;
  pose: any;
}

const Ghost: React.FC<GhostProps> = ({ body, pose }) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  const animatedValue = new Animated.Value(body.velocity.y);
  animatedValue.setValue(body.velocity.y);

  let rotation = animatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ["-20deg", "0deg", "15deg", "45deg"],
    extrapolate: "clamp",
  });

  let image = Images["phantom" + pose];
  return (
    <Animated.Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ rotate: rotation }],
      }}
      resizeMode="stretch"
      source={image}
    />
  );
};

export default Ghost;
