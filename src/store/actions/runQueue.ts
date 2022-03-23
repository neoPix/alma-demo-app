import sleep from "../../tools/sleep";
import { StoreActions } from "../interfaces/Actions";
import { StoreType } from "../store";

export default function runQueue(store: StoreType) {
    const runTask = (index: number) => {
        if (!store.getState().robots[index].currentAction) {
            store.dispatch({ type: StoreActions.PROCESS_ROBOT_ACTION, robotIndex: index });
        }
    };

    const taskMiddleware = (index: number, fn: () => Promise<void>): () => Promise<void> => {
        return async () => {
            await sleep();
            try {
                await fn();
            } catch(e) {}
            finally {
                store.dispatch({ type: StoreActions.ROBOT_ACTION_PROCESSED, robotIndex: index });
                runTask(index);
            }
        }
    };

    return {
        runTask,
        taskMiddleware
    }
}