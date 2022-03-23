import { StoreActions } from './interfaces/Actions';
import { RobotPlaces, RobotPossibleAction } from './interfaces/RobotAction';
import FooBarReducer from './reducer';

test('should return an initial state', () => {
    const state = FooBarReducer(undefined, undefined);
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [],
        selectedRobot: -1
    });
});

test('should increment the foo ressources', () => {
    const state = FooBarReducer(undefined, { type: StoreActions.ADD_FOO, amount: 4 });
    expect(state).toStrictEqual({
        economics: { foo: 4, bar: 0, foobar: 0 },
        robots: [],
        selectedRobot: -1
    });
});

test('should increment the bar ressources', () => {
    const state = FooBarReducer(undefined, { type: StoreActions.ADD_BAR, amount: 4 });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 4, foobar: 0 },
        robots: [],
        selectedRobot: -1
    });
});

test('should increment the foobar ressources', () => {
    const state = FooBarReducer(undefined, { type: StoreActions.ADD_FOOBAR, amount: 4 });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 4 },
        robots: [],
        selectedRobot: -1
    });
});

test('should consume the foo ressources', () => {
    const state = FooBarReducer({
        economics: { foo: 4, bar: 0, foobar: 0 },
        robots: [],
        selectedRobot: -1
    }, { type: StoreActions.CONSUME_FOO, amount: 4 });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [],
        selectedRobot: -1
    });
});

test('should consume the bar ressources', () => {
    const state = FooBarReducer({
        economics: { foo: 0, bar: 4, foobar: 0 },
        robots: [],
        selectedRobot: -1
    }, { type: StoreActions.CONSUME_BAR, amount: 4 });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [],
        selectedRobot: -1
    });
});

test('should consume the foobar ressources', () => {
    const state = FooBarReducer({
        economics: { foo: 0, bar: 0, foobar: 4 },
        robots: [],
        selectedRobot: -1
    }, { type: StoreActions.CONSUME_FOOBAR, amount: 4 });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [],
        selectedRobot: -1
    });
});

test('should create a new robot', () => {
    const state = FooBarReducer(undefined, { type: StoreActions.CREATE_ROBOT });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
});

test('should select a robot', () => {
    const state = FooBarReducer(FooBarReducer(undefined, { type: StoreActions.CREATE_ROBOT }), { type: StoreActions.SELECT_ROBOT, robotIndex: 0 });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: 0
    });
});

test('should move a robot to a new position', () => {
    const state = FooBarReducer(FooBarReducer(undefined, { type: StoreActions.CREATE_ROBOT }), { type: StoreActions.MOVE_ROBOT, robotIndex: 0, position: RobotPlaces.FOO_MINE });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: null, position: RobotPlaces.FOO_MINE }],
        selectedRobot: -1
    });
});

test('should create an new action on a robot', () => {
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const state = FooBarReducer(FooBarReducer(undefined, { type: StoreActions.CREATE_ROBOT }), {
        type: StoreActions.ADD_ROBOT_ACTION,
        robotIndex: 0,
        params: action
    });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [action], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
});

test('should create two ordered actions on a robot', () => {
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const action2 = {
        duration: 21,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const state = FooBarReducer(FooBarReducer(FooBarReducer(undefined, { type: StoreActions.CREATE_ROBOT }), {
        type: StoreActions.ADD_ROBOT_ACTION,
        robotIndex: 0,
        params: action
    }), {
        type: StoreActions.ADD_ROBOT_ACTION,
        robotIndex: 0,
        params: action2
    });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [action, action2], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
});

test('should run a robot action', () => {
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const state = FooBarReducer(FooBarReducer(FooBarReducer(undefined, { type: StoreActions.CREATE_ROBOT }), {
        type: StoreActions.ADD_ROBOT_ACTION,
        robotIndex: 0,
        params: action
    }), {
        type: StoreActions.PROCESS_ROBOT_ACTION,
        robotIndex: 0,
    });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: action, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
    expect(action.run).toBeCalledTimes(1);
});

test('should end an action', () => {
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const state = FooBarReducer({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: action, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    }, {
        type: StoreActions.ROBOT_ACTION_PROCESSED,
        robotIndex: 0,
    });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
});

test('should not start action on empty queue', () => {
    const state = FooBarReducer({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    }, {
        type: StoreActions.PROCESS_ROBOT_ACTION,
        robotIndex: 0,
    });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [], currentAction: null, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
});

test('should not start process an action when the queue is busy', () => {
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const action2 = {
        duration: 21,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    const state = FooBarReducer({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [action2], currentAction: action, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    }, {
        type: StoreActions.PROCESS_ROBOT_ACTION,
        robotIndex: 0,
    });
    expect(state).toStrictEqual({
        economics: { foo: 0, bar: 0, foobar: 0 },
        robots: [{ actionQueue: [action2], currentAction: action, position: RobotPlaces.ROBOT_FACTORY }],
        selectedRobot: -1
    });
});
