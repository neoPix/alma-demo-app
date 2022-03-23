import { StoreActions } from "../interfaces/Actions";
import Economics from "../interfaces/Economics";
import { StoreType } from "../store";

export default function consumeEconomics(store: StoreType) {
    return (economics: Economics) => {
        if (economics.bar > 0) {
            store.dispatch({ type: StoreActions.CONSUME_BAR, amount: economics.bar });
        }
        if (economics.foo > 0) {
            store.dispatch({ type: StoreActions.CONSUME_FOO, amount: economics.foo });
        }
        if (economics.foobar > 0) {
            store.dispatch({ type: StoreActions.CONSUME_FOOBAR, amount: economics.foobar });
        }
    }
}

export const checkEconomics = (economics: Economics, cost: Economics): boolean => {
    return economics.bar >= cost.bar && economics.foo >= cost.foo && economics.foobar >= cost.foobar;
}