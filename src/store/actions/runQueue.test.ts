import { createStore } from 'redux';
import sleep from '../../tools/sleep';
import { PossibleStoreActions, StoreActions } from '../interfaces/Actions';
import { RobotPossibleAction } from '../interfaces/RobotAction';
import Store from '../interfaces/Store';
import FooBarReducer from '../reducer';
import runQueue from './runQueue';

const store = () => createStore<Store, PossibleStoreActions, unknown, unknown>(FooBarReducer);

test('should run the action', () => {
    const ref = store();
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    ref.dispatch({ type: StoreActions.CREATE_ROBOT });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action, robotIndex: 0 });
    runQueue(ref).runTask(0);
    const after = ref.getState();
    expect(after.robots[0].currentAction).toStrictEqual(action);
    expect(action.run).toBeCalledTimes(1);
});

test('should not run when an action is already running', () => {
    const ref = store();
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn()
    };
    ref.dispatch({ type: StoreActions.CREATE_ROBOT });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action, robotIndex: 0 });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action, robotIndex: 0 });
    runQueue(ref).runTask(0);
    runQueue(ref).runTask(0);
    const after = ref.getState();
    expect(after.robots[0].currentAction).toStrictEqual(action);
    expect(action.run).toBeCalledTimes(1);
});

test('should use the middleware and clean the current task when done', async () => {
    const ref = store();
    const { runTask, taskMiddleware } = runQueue(ref);
    const runnableAction = jest.fn();
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn(taskMiddleware(0, runnableAction))
    };
    ref.dispatch({ type: StoreActions.CREATE_ROBOT });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action, robotIndex: 0 });
    runTask(0);
    await sleep(1);
    expect(action.run).toBeCalledTimes(1);
    expect(runnableAction).toBeCalledTimes(1);
    expect(ref.getState().robots[0].currentAction).toBe(null);
});

test('should use the middleware and run the next task until the queue is empty', async () => {
    const ref = store();
    const { runTask, taskMiddleware } = runQueue(ref);
    const runnableAction = jest.fn();
    const runnableAction2 = jest.fn();
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn(taskMiddleware(0, runnableAction))
    };
    const action2 = {
        duration: 21,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn(taskMiddleware(0, runnableAction2))
    };
    ref.dispatch({ type: StoreActions.CREATE_ROBOT });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action, robotIndex: 0 });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action2, robotIndex: 0 });
    runTask(0);
    await sleep(10);
    expect(action.run).toBeCalledTimes(1);
    expect(runnableAction).toBeCalledTimes(1);
    expect(action2.run).toBeCalledTimes(1);
    expect(runnableAction2).toBeCalledTimes(1);
    expect(ref.getState().robots[0].currentAction).toBe(null);
});

test('should use the middleware and run the next task until the queue is empty even when one task returns an error', async () => {
    const ref = store();
    const { runTask, taskMiddleware } = runQueue(ref);
    const runnableAction = jest.fn();
    const runnableAction2 = jest.fn().mockRejectedValueOnce(0);
    const action = {
        duration: 20,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn(taskMiddleware(0, runnableAction))
    };
    const action2 = {
        duration: 21,
        type: RobotPossibleAction.FOOBAR,
        run: jest.fn(taskMiddleware(0, runnableAction2))
    };
    ref.dispatch({ type: StoreActions.CREATE_ROBOT });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action, robotIndex: 0 });
    ref.dispatch({ type: StoreActions.ADD_ROBOT_ACTION, params: action2, robotIndex: 0 });
    runTask(0);
    await sleep(10);
    expect(action.run).toBeCalledTimes(1);
    expect(runnableAction).toBeCalledTimes(1);
    expect(action2.run).toBeCalledTimes(1);
    expect(ref.getState().robots[0].currentAction).toBe(null);
    expect(ref.getState().robots[0].actionQueue.length).toBe(0);
    expect(runnableAction2).toBeCalledTimes(1);
});
