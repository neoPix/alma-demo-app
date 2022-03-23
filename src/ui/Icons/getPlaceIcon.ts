import { RobotPlaces } from "../../store/interfaces/RobotAction";
import BarIcon from "./Bar";
import FooIcon from "./Foo";
import FooBarIcon from "./FooBar";
import MovingIcon from "./Moving";
import RobotIcon from "./Robot";

export default function getPositionIcon(place: RobotPlaces) {
    switch (place) {
        case RobotPlaces.BAR_MINE:
            return BarIcon;
        case RobotPlaces.FOO_MINE:
            return FooIcon;
        case RobotPlaces.FOOBAR_FACTORY:
            return FooBarIcon;
        case RobotPlaces.TRANSITIONNING:
            return MovingIcon;
        case RobotPlaces.ROBOT_FACTORY:
        default:
            return RobotIcon;
    }
}