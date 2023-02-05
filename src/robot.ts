import { Direction, Position } from "./utils";

const LeftCommandMap: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.WEST,
  [Direction.WEST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.EAST,
  [Direction.EAST]: Direction.NORTH,
};

const RightCommandMap: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.EAST,
  [Direction.EAST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.WEST,
  [Direction.WEST]: Direction.NORTH,
};

export class Robot {
  private position: Position | undefined;
  private direction: Direction | undefined;

  place(position: Position, direction: Direction) {
    if (this.isOnTheTable()) return;
    if (position.x > 4 || position.x < 0 || position.y > 4 || position.y < 0)
      return;
    this.position = position;
    this.direction = direction;
  }

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }

  left() {
    if (!this.isOnTheTable()) return;
    this.direction = LeftCommandMap[this.direction!];
  }

  right() {
    if (!this.isOnTheTable()) return;
    this.direction = RightCommandMap[this.direction!];
  }

  isPositionValid(): boolean {
    return !!this.position && this.position.x !== undefined && this.position.x !== undefined;
  }

  isOnTheTable(): boolean {
    return this.isPositionValid() && !!this.direction;
  }

  private isMovementSafe(): boolean {
    if (!this.position) return false;
    const xPosition = this.position.x + 1 < 5;
    const yPosition = this.position.y + 1 < 5;
    return xPosition && yPosition;
  }

  move() {
    if (!this.isOnTheTable()) return;
    //    if (!this.isMovementSafe()) return
    console.log("dddddddddddddddddd", this.position, this.direction);
    let newXPosition = this.position!.x;
    let newYPosition = this.position!.y;

    if (
      this.direction === Direction.SOUTH ||
      this.direction === Direction.NORTH
    ) {
      newYPosition =
        this.direction === Direction.NORTH
          ? this.position!.y + 1
          : this.position!.y - 1;
    }

    if (
      this.direction === Direction.WEST ||
      this.direction === Direction.EAST
    ) {
      newXPosition =
        this.direction === Direction.EAST
          ? this.position!.x + 1
          : this.position!.x - 1;
    }

    if (
      newXPosition >= 0 &&
      newXPosition < 5 &&
      newYPosition >= 0 &&
      newYPosition < 5
    ) {
      this.position = { x: newXPosition, y: newYPosition };
    }
  }

  private isFacingNorthOrSouth() {
    return (
      this.direction === Direction.NORTH || this.direction === Direction.SOUTH
    );
  }

  report() {
    if (!this.isOnTheTable()) return;
    console.log(
      `Output: ${this.position!.x},${this.position!.y},${this.direction}`
    );
  }
}
export { Direction };

