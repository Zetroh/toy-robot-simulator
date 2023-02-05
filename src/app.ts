import fs from "fs";
import readline from "readline";
import { Robot } from "./robot";
import { Command, Direction, Position } from "./utils";


const robot = new Robot();
const CommandMap: Record<string, any> = {
  [Command.MOVE]: () => {
    robot.move();
  },
  [Command.RIGHT]: () => {
    robot.right();
  },
  [Command.LEFT]: () => {
    robot.left();
  },
  [Command.REPORT]: () => {
    robot.report();
  },
  [Command.PLACE]: (position: Position, direction: Direction) => robot.place(position, direction),
};

const file = readline.createInterface({
  input: fs.createReadStream("test.txt"),
  output: process.stdout,
  terminal: false,
});

file.on("line", (line: string) => {
  const formattedLine = line?.trim()?.toLocaleUpperCase();
  if (!formattedLine) return;
  if (!robot.isOnTheTable() && !formattedLine.startsWith("PLACE")) return;
  if (robot.isOnTheTable() && formattedLine.startsWith("PLACE")) return;
  
  if (!robot.isOnTheTable()) {

    //validate place comm
    const placeArr = formattedLine.split(" ")
    const placeCommand = placeArr[0]
    const placeDetailsArr = placeArr[1].split(",")
    const x = Number(placeDetailsArr[0])
    const y = Number(placeDetailsArr[1])
    
    const direction = (<any>Direction)[placeDetailsArr[2]]
    CommandMap[placeCommand]?.call(robot,{x, y}, direction)
  } else {
    const command: Command = (<any>Command)[formattedLine];
    CommandMap[command]?.apply(robot);
  }
});
