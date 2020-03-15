import { Patient } from "./../src/pandemic.js";

describe("Patient-Status", () => {
  jest.useFakeTimers();
  let patient;
  let randomSpy;

  beforeEach(function() {
    patient = new Patient();
    patient.startInfection();
    randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.1);
  });

  afterEach(function() {
    jest.clearAllTimers();
  });

  test("should have a initial level of infection 0", () => {
    expect(patient.infectionLevel).toEqual(0);
  });

  test("should increase infection level every second", () => {
    jest.advanceTimersByTime(1001);
    expect(patient.infectionLevel).toEqual(1);
    jest.advanceTimersByTime(1001); // 1 second + 1 second = 2sec
    expect(patient.infectionLevel).toEqual(2);
    jest.advanceTimersByTime(1001);
    expect(patient.infectionLevel).toEqual(3);
  });

  test("should change infection level to 100 after 60 secs ending the game", function() {
    jest.advanceTimersByTime(100000); //1min,40sec
    console.log(patient.infectionLevel);
    expect(patient.infectionLevel).toEqual(100);
  });

  test("should end the game if the infection level reaches to 100 ending)", function() {
    patient.infectionLevel = 100;
    expect(patient.isDead()).toEqual(true);
  });

  test("should win the game if the infection level reaches to less than one)", function() {
    patient.infectionLevel = 1;
    expect(patient.hasWon()).toEqual(true);
  });

  // .........Cure............
  test("should cure/decrease the infection level to random whole number after 1 secs", () => {
    patient.cure();
    jest.advanceTimersByTime(1000);
    randomSpy.mockReturnValueOnce(0.5);
    console.log(patient.infectionLevel);
    jest.advanceTimersByTime(1);
    console.log(patient.infectionLevel);
    expect(patient.infectionLevel).toEqual(0);
  });

  test("should call the callback function after the patient is cured", () => {
    const callbackFn = jest.fn();
    patient.cure(callbackFn);
    jest.advanceTimersByTime(1000);
    expect(callbackFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callbackFn).toHaveBeenCalled();
  });
});
