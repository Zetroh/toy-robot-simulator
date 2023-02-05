import { Direction, Robot } from "../src/robot";


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
      const logSpy = jest.spyOn(global.console, 'log');
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

    it.each(invalidTestCases)("should not place the robot on the table given an invalid position", (position) => {
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



})