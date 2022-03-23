import Economics from "./Economics";
import RobotAction, { RobotPlaces } from "./RobotAction";

export interface Robot {
    actionQueue: RobotAction[],
    currentAction: RobotAction | null;
    position: RobotPlaces;
}

export interface RobotWithIndex {
    robot: Robot;
    index: number;
}

export default interface Store {
    robots: Robot[];
    economics: Economics;
    selectedRobot: number;
};