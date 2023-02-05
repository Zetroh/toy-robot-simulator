export enum Command {
  MOVE = "MOVE",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  PLACE = "PLACE",
  REPORT = "REPORT",
}

export enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  WEST = "WEST",
  EAST = "EAST",
}

export interface Position {
  x: number;
  y: number;
}
