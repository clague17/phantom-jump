import React, { Component } from "react";
import { View, Image } from "react-native";
import { getDimensions } from "../util/utils";
import Images from "../assets/Images";

interface PipeTopProps {
  body: any;
}

const PipeTop: React.FC<PipeTopProps> = ({ body }) => {
  const [width, height, x, y] = getDimensions(body);
  return (
    <Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      resizeMode="stretch"
      source={Images.pipeTop}
    />
  );
};

export default PipeTop;
