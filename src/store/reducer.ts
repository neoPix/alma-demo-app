import { AddRobotAction, MoveRobotAction, PossibleStoreActions, ProcessRobotAction, RobotProcessedAction, StoreActions } from "./interfaces/Actions";
import { RobotPlaces } from "./interfaces/RobotAction";
import Store from "./interfaces/Store";

const defaultStore: Store = {
    economics: { bar: 0, foo: 0, foobar: 0 },
    robots: [],
    selectedRobot: -1,
}

export default function FooBarReducer(store: Store = defaultStore, action: PossibleStoreActions | undefined): Store {
    switch (action?.type) {
        case StoreActions.ADD_BAR:
            return {
                ...store,
                economics: { ...store.economics, bar: store.economics.bar + action.amount }
            };
        case StoreActions.ADD_FOO:
            return {
                ...store,
                economics: { ...store.economics, foo: store.economics.foo + action.amount }
            };
        case StoreActions.ADD_FOOBAR:
            return {
                ...store,
                economics: { ...store.economics, foobar: store.economics.foobar + action.amount }
            };
        case StoreActions.CONSUME_BAR:
            return {
                ...store,
                economics: { ...store.economics, bar: store.economics.bar - action.amount }
            };
        case StoreActions.CONSUME_FOO:
            return {
                ...store,
                economics: { ...store.economics, foo: store.economics.foo - action.amount }
            };
        case StoreActions.CONSUME_FOOBAR:
            return {
                ...store,
                economics: { ...store.economics, foobar: store.economics.foobar - action.amount }
            };
        case StoreActions.CREATE_ROBOT:
            return {
                ...store,
                robots: [...store.robots, { actionQueue: [], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }]
            }
        case StoreActions.SELECT_ROBOT:
            return {
                ...store,
                selectedRobot: action.robotIndex,
            }
        case StoreActions.ADD_ROBOT_ACTION:
            return AddActionToRobotQueue(store, action);
        case StoreActions.ROBOT_ACTION_PROCESSED:
            return EndCurrentRobotAction(store, action);
        case StoreActions.PROCESS_ROBOT_ACTION:
            return StartCurrentRobotAction(store, action);
        case StoreActions.MOVE_ROBOT:
            return MoveRobot(store, action);
        default:
            return store;
    }
}

function AddActionToRobotQueue(store: Store, action: AddRobotAction) {
    const robots = [...store.robots];
    const myRobot = { ...robots[action.robotIndex], actionQueue: [...robots[action.robotIndex].actionQueue, action.params] };
    robots[action.robotIndex] = myRobot;
    return {
        ...store,
        robots
    };
}

function EndCurrentRobotAction(store: Store, action: RobotProcessedAction) {
    const robots = [...store.robots];
    robots[action.robotIndex] = { ...robots[action.robotIndex], currentAction: null };
    return {
        ...store,
        robots
    };
}

function StartCurrentRobotAction(store: Store, action: ProcessRobotAction) {
    const robots = [...store.robots];
    if (robots[action.robotIndex].actionQueue.length && robots[action.robotIndex].currentAction === null) {
        const [currentAction, ...actionQueue] = robots[action.robotIndex].actionQueue;
        const myRobot = { ...robots[action.robotIndex], currentAction, actionQueue };
        robots[action.robotIndex] = myRobot;
        currentAction.run();
        return {
            ...store,
            robots
        };
    }
    return store;
}

function MoveRobot(store: Store, action: MoveRobotAction) {
    const robots = [...store.robots];
    robots[action.robotIndex] = { ...robots[action.robotIndex], position: action.position };
    return {
        ...store,
        robots
    };
}


