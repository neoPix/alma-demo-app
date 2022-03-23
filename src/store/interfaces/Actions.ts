import RobotAction, { RobotPlaces } from "./RobotAction";

export enum StoreActions {
    ADD_ROBOT_ACTION,
    ADD_FOO,
    ADD_BAR,
    ADD_FOOBAR,
    CONSUME_FOO,
    CONSUME_BAR,
    CONSUME_FOOBAR,
    CREATE_ROBOT,
    PROCESS_ROBOT_ACTION,
    ROBOT_ACTION_PROCESSED,
    SELECT_ROBOT,
    MOVE_ROBOT,
}

export interface AddFooAction {
    type: StoreActions.ADD_FOO;
    amount: number;
}

export interface AddBarAction {
    type: StoreActions.ADD_BAR;
    amount: number;
}

export interface AddFooBarAction {
    type: StoreActions.ADD_FOOBAR;
    amount: number;
}

export interface ConsumeFooAction {
    type: StoreActions.CONSUME_FOO;
    amount: number;
}

export interface ConsumeBarAction {
    type: StoreActions.CONSUME_BAR;
    amount: number;
}

export interface ConsumeFooBarAction {
    type: StoreActions.CONSUME_FOOBAR;
    amount: number;
}

export interface CreateRobotAction {
    type: StoreActions.CREATE_ROBOT;
}

export interface ProcessRobotAction {
    type: StoreActions.PROCESS_ROBOT_ACTION;
    robotIndex: number;
}

export interface RobotProcessedAction {
    type: StoreActions.ROBOT_ACTION_PROCESSED;
    robotIndex: number;
}

export interface AddRobotAction {
    type: StoreActions.ADD_ROBOT_ACTION;
    robotIndex: number;
    params: RobotAction;
}

export interface SelectRobotAction {
    type: StoreActions.SELECT_ROBOT;
    robotIndex: number;
}

export interface MoveRobotAction {
    type: StoreActions.MOVE_ROBOT;
    robotIndex: number;
    position: RobotPlaces;
}

export type PossibleStoreActions = MoveRobotAction | SelectRobotAction | AddFooBarAction | ConsumeFooBarAction | AddRobotAction | CreateRobotAction | AddFooAction | AddBarAction | ConsumeFooAction | ConsumeBarAction | AddRobotAction | ProcessRobotAction | RobotProcessedAction;