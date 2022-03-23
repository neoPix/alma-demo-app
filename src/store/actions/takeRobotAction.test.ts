import sleep from '../../tools/sleep';
import { createStore } from 'redux';
import { PossibleStoreActions, StoreActions } from '../interfaces/Actions';
import { RobotPlaces, RobotPossibleAction } from '../interfaces/RobotAction';
import Store from '../interfaces/Store';
import FooBarReducer from '../reducer';
import initStore from './initStore';
import takeRobotAction from './takeRobotAction';
import addEconomics from './addEconomics';
import { actionCostRules, actionFailsRules } from '../rules';

const mockedSleep = jest.fn().mockResolvedValue(undefined);

const store = () => {
    const instance = createStore<Store, PossibleStoreActions, unknown, unknown>(FooBarReducer);
    initStore(instance)();
    return instance;
}

test('should add a move action when switching to an other production station', () => {
    const testStore = store();
    takeRobotAction(testStore, RobotPlaces.BAR_MINE)({ index: 0, robot: testStore.getState().robots[0] });
    expect(testStore.getState().robots[0].currentAction?.type).toBe(RobotPossibleAction.TRANSITIONNING);
    expect(testStore.getState().robots[0].actionQueue[0].type).toBe(RobotPossibleAction.BAR);
});

test('should only add one extra action when not changing station', () => {
    const testStore = store();
    takeRobotAction(testStore, RobotPlaces.BAR_MINE)({ index: 0, robot: testStore.getState().robots[0] });
    takeRobotAction(testStore, RobotPlaces.BAR_MINE)({ index: 0, robot: testStore.getState().robots[0] });
    expect(testStore.getState().robots[0].currentAction).not.toBe(null);
    expect(testStore.getState().robots[0].actionQueue.length).toBe(2);
});

test('should unpile all the actions in the queue after a while', async () => {
    const testStore = store();
    takeRobotAction(testStore, RobotPlaces.BAR_MINE)({ index: 0, robot: testStore.getState().robots[0] }, { sleepFn: mockedSleep });
    await sleep(10);
    expect(testStore.getState().economics.bar).toBe(1);
    expect(testStore.getState().robots[0].actionQueue.length).toBe(0);
    expect(testStore.getState().robots[0].currentAction).toBe(null);
});

test('should create a robot when at the robot factory', async () => {
    const testStore = store();
    addEconomics(testStore)(actionCostRules[RobotPossibleAction.ROBOT].costs);
    takeRobotAction(testStore, RobotPlaces.ROBOT_FACTORY)({ index: 0, robot: testStore.getState().robots[0] }, { sleepFn: mockedSleep });
    await sleep(10);
    expect(testStore.getState().robots.length).toBe(3);
});

test('should apply a refund when FooBar production fails', async () => {
    const testStore = store();
    testStore.dispatch({ type: StoreActions.MOVE_ROBOT, position: RobotPlaces.FOOBAR_FACTORY, robotIndex: 0 });
    addEconomics(testStore)(actionCostRules[RobotPossibleAction.FOOBAR].costs);
    const initialFailMethod = actionFailsRules[RobotPossibleAction.FOOBAR].fail;
    actionFailsRules[RobotPossibleAction.FOOBAR].fail = true;
    takeRobotAction(testStore, RobotPlaces.FOOBAR_FACTORY)({ index: 0, robot: testStore.getState().robots[0] }, { sleepFn: mockedSleep });
    await sleep(10);
    expect(testStore.getState().economics).toStrictEqual({ bar: 1, foo: 0, foobar: 0 });
    actionFailsRules[RobotPossibleAction.FOOBAR].fail = initialFailMethod;
});
