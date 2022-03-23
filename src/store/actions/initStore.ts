import { StoreActions } from "../interfaces/Actions";
import { StoreType } from "../store";

export default function iniStore(store: StoreType) {
    return () => {
        store.dispatch({ type: StoreActions.CREATE_ROBOT });
        store.dispatch({ type: StoreActions.CREATE_ROBOT });
        store.dispatch({ type: StoreActions.SELECT_ROBOT, robotIndex: 0 });
    }
}
