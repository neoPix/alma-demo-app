import rand from "../tools/rand";
import Economics from "./interfaces/Economics";
import { RobotPossibleAction } from "./interfaces/RobotAction";

const free: Economics = { bar: 0, foo: 0, foobar: 0 };

export const actionCostRules : { [key in RobotPossibleAction]: { costs: Economics, produces: Economics } } = {
    [RobotPossibleAction.BAR]: { costs: free, produces: { bar: 1, foo: 0, foobar: 0 } },
    [RobotPossibleAction.FOO]: { costs: free, produces: { bar: 0, foo: 1, foobar: 0 } },
    [RobotPossibleAction.FOOBAR]: { costs: { bar: 1, foo: 1, foobar: 0 }, produces: { bar: 0, foo: 0, foobar: 1 } },
    [RobotPossibleAction.ROBOT]: { costs: { foobar: 3, foo: 3, bar: 0 }, produces: free },
    [RobotPossibleAction.TRANSITIONNING]: { costs: free, produces: free },
};

export const actionDurationRules : { [key in RobotPossibleAction]: { duration: number|(() => number) } } = {
    [RobotPossibleAction.BAR]: { duration: () => rand(500, 2000) },
    [RobotPossibleAction.FOO]: { duration: 1000 },
    [RobotPossibleAction.FOOBAR]: { duration: 2000 },
    [RobotPossibleAction.ROBOT]: { duration: 0 },
    [RobotPossibleAction.TRANSITIONNING]: { duration: 5000 },
};

export const actionFailsRules : { [key in RobotPossibleAction]: { fail: boolean|(() => boolean), compensation?: Economics } } = {
    [RobotPossibleAction.BAR]: { fail: false },
    [RobotPossibleAction.FOO]: { fail: false },
    [RobotPossibleAction.FOOBAR]: { fail: () => rand(0, 100) >= 60, compensation: { foo: 0, bar: 1, foobar: 0 } },
    [RobotPossibleAction.ROBOT]: { fail: false },
    [RobotPossibleAction.TRANSITIONNING]: { fail: false },
};