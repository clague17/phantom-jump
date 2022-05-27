import { Dimensions } from "react-native";

export const Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  GAP_SIZE: 320,
  PIPE_WIDTH: 100,
  GHOST_WIDTH: 50,
  GHOST_HEIGHT: 41,
};

export function getDimensions(body: any): Array<number> {
  const width: number = body.bounds.max.x - body.bounds.min.x;
  const height: number = body.bounds.max.y - body.bounds.min.y;
  const x: number = body.position.x - width / 2;
  const y: number = body.position.y - height / 2;
  return Array.of(width, height, x, y);
}
