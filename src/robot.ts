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
    if (!this.isMovementSafe(position.x, position.y)) return;
    this.position = position;
    this.direction = direction;
  }

  left() {
    if (!this.isOnTheTable()) return;
    this.direction = LeftCommandMap[this.direction!];
  }

  right() {
    if (!this.isOnTheTable()) return;
    this.direction = RightCommandMap[this.direction!];
  }

  report() {
    if (!this.isOnTheTable()) return;
    console.log(
      `Output: ${this.position!.x},${this.position!.y},${this.direction}`
    );
  }

  isPositionValid(): boolean {
    return (
      !!this.position &&
      this.position.x !== undefined &&
      this.position.x !== undefined
    );
  }

  isOnTheTable(): boolean {
    return this.isPositionValid() && !!this.direction;
  }

  private isMovementSafe(xPosition: number, yPosition: number): boolean {
    return xPosition >= 0 && xPosition < 5 && yPosition >= 0 && yPosition < 5;
  }

  move() {
    if (!this.isOnTheTable()) return;
    let newXPosition = this.getNewXPosition();
    let newYPosition = this.getNewYPosition();

    if (this.isMovementSafe(newXPosition, newYPosition)) {
      this.position = { x: newXPosition, y: newYPosition };
    }
  }

  private getNewYPosition(): number {
    if (this.isFacingNorth()) return this.position!.y + 1;
    if (this.isFacingSouth()) return this.position!.y - 1;
    return this.position!.y;
  }

  private getNewXPosition(): number {
    if (this.isFacingEast()) return this.position!.x + 1;
    if (this.isFacingWest()) return this.position!.x - 1;
    return this.position!.x;
  }

  private isFacingNorth() {
    return this.direction === Direction.NORTH;
  }

  private isFacingSouth() {
    return this.direction === Direction.SOUTH;
  }

  private isFacingWest() {
    return this.direction === Direction.WEST;
  }

  private isFacingEast() {
    return this.direction === Direction.EAST;
  }

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }
}
