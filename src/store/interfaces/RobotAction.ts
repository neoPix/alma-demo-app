export enum RobotPossibleAction {
    FOO=1,
    BAR,
    FOOBAR,
    ROBOT,
    TRANSITIONNING,
}

export enum RobotPlaces {
    FOO_MINE=1,
    BAR_MINE,
    FOOBAR_FACTORY,
    ROBOT_FACTORY,
    TRANSITIONNING
}

export function placeToAction(place: RobotPlaces): RobotPossibleAction {
    switch(place) {
        case RobotPlaces.BAR_MINE:
            return RobotPossibleAction.BAR;
        case RobotPlaces.FOO_MINE:
            return RobotPossibleAction.FOO;
        case RobotPlaces.FOOBAR_FACTORY:
            return RobotPossibleAction.FOOBAR;
        case RobotPlaces.ROBOT_FACTORY:
            return RobotPossibleAction.ROBOT;
        case RobotPlaces.TRANSITIONNING:
            return RobotPossibleAction.TRANSITIONNING;
    }
}

export function actionToPlace(action: RobotPossibleAction): RobotPlaces {
    switch(action) {
        case RobotPossibleAction.BAR:
            return RobotPlaces.BAR_MINE;
        case RobotPossibleAction.FOO:
            return RobotPlaces.FOO_MINE;
        case RobotPossibleAction.FOOBAR:
            return RobotPlaces.FOOBAR_FACTORY;
        case RobotPossibleAction.ROBOT:
            return RobotPlaces.ROBOT_FACTORY;
        case RobotPossibleAction.TRANSITIONNING:
            return RobotPlaces.TRANSITIONNING;
    }
}

interface StdRobotAction {
    type: RobotPossibleAction;
    duration: number;
    run: () => Promise<void>
}

export interface TransitionRobotAction extends StdRobotAction {
    type: RobotPossibleAction.TRANSITIONNING;
    from: RobotPlaces;
    to: RobotPlaces;
}

type RobotAction = StdRobotAction | TransitionRobotAction;

export default RobotAction;