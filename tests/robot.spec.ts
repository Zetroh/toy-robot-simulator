import { Robot } from "../src/robot";
import { Direction } from "../src/utils";

describe("Robot", () => {
  describe("left", () => {
    it("should turn left given the robot is on the table", () => {
      // arrange
      const robot = new Robot()
      robot.place({x: 3, y: 3}, Direction.NORTH)
      // act
      robot.left()
      // assert
      expect(robot.getDirection()).toEqual(Direction.WEST)
    })
    it("should not turn left given the robot is off the table", () => {
      // arrange
      const robot = new Robot()
      // act
      robot.left()
      // assert
      expect(robot.getDirection()).toBeUndefined()
    })
  })

  describe("right", () => {
    it("should turn right given the robot is on the table", () => {
      // arrange
      const robot = new Robot()
      robot.place({x: 3, y: 3}, Direction.NORTH)
      // act
      robot.right()
      // assert
      expect(robot.getDirection()).toEqual(Direction.EAST)
    })
    it("should not turn right given the robot is off the table", () => {
      // arrange
      const robot = new Robot()
      // act
      robot.right()
      // assert
      expect(robot.getDirection()).toBeUndefined()
    })
  })

  describe("report", () => {
    it("should report position and direction given the robot is on the table", () => {
      // arrange
      const robot = new Robot()
      robot.place({x: 3, y: 3}, Direction.NORTH)
      const logSpy = jest.spyOn(global.console, 'log')
      // act
      robot.report()
      // assert
      expect(logSpy).toHaveBeenCalledTimes(1)
      expect(logSpy).toHaveBeenCalledWith("Output: 3,3,NORTH")
      logSpy.mockRestore()
    })
    it("should not report position and direction given the robot is off the table", () => {
      // arrange
      const robot = new Robot()
      const logSpy = jest.spyOn(global.console, 'log')
      // act
      robot.report()
      // assert     
      expect(logSpy).not.toHaveBeenCalled()
      logSpy.mockRestore()
    })
  })

  describe("place", () => {
    const validTestCases = [
      { x: 0, y: 0 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
      { x: 4, y: 0 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
    ];
    it.each(validTestCases)("should place the robot on the table given a valid position and direction", (position) => {
      // arrange
      const robot = new Robot()
      // act
      robot.place(position, Direction.NORTH)
      // assert
      expect(robot.isOnTheTable()).toBeTruthy()
      expect(robot.getPosition()).toEqual(position)
      expect(robot.getDirection()).toEqual(Direction.NORTH)
    })
    const invalidTestCases = [
      { x: 0, y: -2 },
      { x: 5, y: 0 },
      { x: 10, y: 10 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
      { x: -1, y: -1 },
    ];
    it.each(invalidTestCases)("should not place the robot on the table given invalid position", (position) => {
      // arrange
      const robot = new Robot()
      // act
      robot.place(position, Direction.SOUTH)
      // assert
      expect(robot.isOnTheTable()).toBeFalsy()
      expect(robot.getPosition()).toBeUndefined()
      expect(robot.getDirection()).toBeUndefined()
    })
    it("should not place the robot on the table given the robot is already on the table", () => {
      // arrange
      const robot = new Robot()
      robot.place({x: 3, y: 3}, Direction.NORTH)
      // act
      robot.place({x: 0, y: 0}, Direction.EAST)
      // assert
      expect(robot.getDirection()).toEqual(Direction.NORTH)
      expect(robot.getPosition()).toEqual({x: 3, y: 3})
    })
  })

  describe("move", () => {
    const validTestCases = [
      { position: { x: 4, y: 4 }, direction: Direction.SOUTH, output: { x: 4, y: 3 }},
      { position: { x: 0, y: 0 }, direction: Direction.NORTH, output: { x: 0, y: 1 } },
      { position: { x: 0, y: 4 }, direction: Direction.EAST, output: { x: 1, y: 4 } },
      { position: { x: 4, y: 0 }, direction: Direction.WEST, output: { x: 3, y: 0 } },
      { position: { x: 1, y: 3 }, direction: Direction.NORTH, output: { x: 1, y: 4 } },
    ];
    it.each(validTestCases)("should move the robot given it will not fall off the table", (testData) => {
      // arrange
      const robot = new Robot()
      robot.place(testData.position, testData.direction)
      // act
      robot.move()
      // assert
      expect(robot.isOnTheTable()).toBeTruthy()
      const t = 
      expect(robot.getPosition()).toEqual(testData.output)
      expect(robot.getDirection()).toEqual(testData.direction)
    })
    const invalidTestCases = [
      { position: { x: 4, y: 4 }, direction: Direction.EAST },
      { position: { x: 0, y: 0 }, direction: Direction.SOUTH },
      { position: { x: 0, y: 4 }, direction: Direction.WEST },
      { position: { x: 4, y: 0 }, direction: Direction.SOUTH },
      { position: { x: 0, y: 2 }, direction: Direction.WEST },
    ];
    it.each(invalidTestCases)("should not move the robot given it will fall off the table", (testData) => {
      // arrange
      const robot = new Robot()
      robot.place(testData.position, testData.direction)

      // act
      robot.move()
      // assert
      expect(robot.isOnTheTable()).toBeTruthy()
      expect(robot.getPosition()).toEqual(testData.position)
      expect(robot.getDirection()).toEqual(testData.direction)
    })
  })
})