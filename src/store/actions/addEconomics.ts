import { StoreActions } from "../interfaces/Actions";
import Economics from "../interfaces/Economics";
import { StoreType } from "../store";

export default function addEconomics(store: StoreType) {
    return (economics: Economics) => {
        if (economics.bar > 0) {
            store.dispatch({ type: StoreActions.ADD_BAR, amount: economics.bar });
        }
        if (economics.foo > 0) {
            store.dispatch({ type: StoreActions.ADD_FOO, amount: economics.foo });
        }
        if (economics.foobar > 0) {
            store.dispatch({ type: StoreActions.ADD_FOOBAR, amount: economics.foobar });
        }
    }
}
