import findLast from "../../tools/findLast";
import fn from "../../tools/fn";
import sleep from "../../tools/sleep";
import { StoreActions } from "../interfaces/Actions";
import Economics from "../interfaces/Economics";
import { placeToAction, RobotPlaces, RobotPossibleAction, TransitionRobotAction } from "../interfaces/RobotAction";
import { RobotWithIndex } from "../interfaces/Store";
import { actionCostRules, actionDurationRules, actionFailsRules } from "../rules";
import { StoreType } from "../store";
import addEconomics from "./addEconomics";
import consumeEconomics, { checkEconomics } from "./consumeEconomics";
import runQueue from "./runQueue";

export default function takeRobotAction(store: StoreType, place: RobotPlaces) {
    const { runTask, taskMiddleware } = runQueue(store);
    const consume = consumeEconomics(store);
    const produce = addEconomics(store);

    return (selectedRobot: RobotWithIndex) => {
        const robotNotInPlace = isRobotAtTheRightPlace(selectedRobot, place);
        if (!robotNotInPlace) {
            dispatchMoveAction({ store, selectedRobot, place, taskMiddleware });
        }
        dispatchAddRobotAction({ store, selectedRobot, place, consume, produce, taskMiddleware });
        runTask(selectedRobot.index);
    }
}

export function isRobotAtTheRightPlace(selectedRobot: RobotWithIndex, place: RobotPlaces) {
    const lastMove = findLast(selectedRobot.robot.actionQueue, action => action.type === RobotPossibleAction.TRANSITIONNING) as TransitionRobotAction | undefined;
    const isInTheRightPlace = (lastMove && lastMove.to === place) ||
        (selectedRobot.robot.currentAction && selectedRobot.robot.currentAction.type === RobotPossibleAction.TRANSITIONNING && (selectedRobot.robot.currentAction as TransitionRobotAction).to === place) ||
        (!lastMove && selectedRobot.robot.position === place);
    return isInTheRightPlace;
}

export function dispatchAddRobotAction({ store, selectedRobot, place, consume, produce, taskMiddleware, sleepFn = sleep }: { store: StoreType; selectedRobot: RobotWithIndex; place: RobotPlaces; consume: (economics: Economics) => void; produce: (economics: Economics) => void; taskMiddleware: (index: number, fn: () => Promise<void>) => () => Promise<void>; sleepFn?: (duration: number) => Promise<unknown>; }) {

    const actionType = placeToAction(place);
    const duration = fn(actionDurationRules[actionType].duration);
    const fails = fn(actionFailsRules[actionType].fail);
    const compensationOnFail = actionFailsRules[actionType].compensation;
    const costs = actionCostRules[actionType];

    store.dispatch({
        type: StoreActions.ADD_ROBOT_ACTION,
        robotIndex: selectedRobot.index,
        params: {
            type: placeToAction(place),
            duration,
            run: taskMiddleware(selectedRobot.index, async () => {
                if (checkEconomics(store.getState().economics, costs.costs)) {
                    consume(costs.costs);
                    await sleepFn(duration);
                    if (fails) {
                        if (compensationOnFail) {
                            produce(compensationOnFail);
                        }
                    }
                    else {
                        produce(costs.produces);
                        if (place === RobotPlaces.ROBOT_FACTORY) {
                            store.dispatch({ type: StoreActions.CREATE_ROBOT });
                        }
                    }
                }
            })
        }
    });
}

export function dispatchMoveAction({ store, selectedRobot, place, taskMiddleware, sleepFn = sleep }: { store: StoreType; selectedRobot: RobotWithIndex; place: RobotPlaces; taskMiddleware: (index: number, fn: () => Promise<void>) => () => Promise<void>; sleepFn?: (duration: number) => Promise<unknown>; }) {

    const duration = fn(actionDurationRules[RobotPossibleAction.TRANSITIONNING].duration);

    store.dispatch({
        type: StoreActions.ADD_ROBOT_ACTION,
        robotIndex: selectedRobot.index,
        params: {
            type: RobotPossibleAction.TRANSITIONNING,
            from: selectedRobot.robot.position,
            to: place,
            duration,
            run: taskMiddleware(selectedRobot.index, async () => {
                store.dispatch({ type: StoreActions.MOVE_ROBOT, position: RobotPlaces.TRANSITIONNING, robotIndex: selectedRobot.index });
                await sleepFn(duration);
                store.dispatch({ type: StoreActions.MOVE_ROBOT, position: place, robotIndex: selectedRobot.index });
            })
        }
    });
}

