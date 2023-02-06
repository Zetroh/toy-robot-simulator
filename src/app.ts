import fs from "fs";
import readline from "readline";
import { Robot } from "./robot";
import { Command, Direction, Position } from "./utils";

const runSimulator = () => {
  const robot = new Robot();
  const CommandMap: Record<string, Function> = {
    [Command.MOVE]: () => robot.move(),
    [Command.RIGHT]: () => robot.right(),
    [Command.LEFT]: () => robot.left(),
    [Command.REPORT]: () => robot.report(),
    [Command.PLACE]: (position: Position, direction: Direction) =>
      robot.place(position, direction),
  };

  try {
    const file = readline.createInterface({
      input: fs.createReadStream("./resources/commands.txt"),
      output: process.stdout,
      terminal: false,
    });

    file.on("line", (line: string) => {
      const formattedLine = line?.trim()?.toLocaleUpperCase();
      if (!formattedLine) return;
      if (!robot.isOnTheTable() && !formattedLine.startsWith("PLACE")) return;
      if (robot.isOnTheTable() && formattedLine.startsWith("PLACE")) return;

      if (!robot.isOnTheTable()) {
        const placeItems = formattedLine.split(" ");
        if (placeItems.length !== 2)
          logInputError("command name or position not from from input");

        const placeCommand = placeItems[0];
        const placeDetails = placeItems[1].split(",");
        if (placeDetails.length !== 3)
          logInputError(
            "command name or position or direction not from from input"
          );

        const x = Number(placeDetails[0]);
        const y = Number(placeDetails[1]);
        const direction = (<any>Direction)[placeDetails[2]];

        if (!isPositionValid(x, y) || !direction)
          logInputError("No valid direction, x or y position from the input");

        CommandMap[placeCommand]?.call(robot, { x, y }, direction);
      } else {
        const command: Command = (<any>Command)[formattedLine];
        CommandMap[command]?.apply(robot);
      }
    });
  } catch (error) {
    console.log("something went wrong, ", error);
  }
};

const isPositionValid = (x: number, y: number) => {
  return x !== undefined && y !== undefined && !isNaN(x) && !isNaN(y)
};

const logInputError = (message: string) => {
  console.log(`... InputError: ${message}`);
  return;
};

runSimulator();
