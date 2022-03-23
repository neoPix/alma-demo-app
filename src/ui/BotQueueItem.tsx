
import RobotAction, { actionToPlace } from "../store/interfaces/RobotAction";
import getPositionIcon from "./Icons/getPlaceIcon";

export interface BotQueueItemProps {
  action: RobotAction;
}

export default function BotQueueItem({ action }: BotQueueItemProps) {
  const PositionComponent = getPositionIcon(actionToPlace(action.type));
  return (<PositionComponent />)
}