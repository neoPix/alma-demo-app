import { useSelector } from "react-redux";
import styled from "styled-components";
import { RobotPlaces } from "../store/interfaces/RobotAction";
import Store, { RobotWithIndex } from "../store/interfaces/Store";
import { copper } from "./colors";
import RobotItem from "./RobotItem";

export interface RobotListProps {
    position: RobotPlaces;
}

const RobotPositionListDiv = styled.div`
  display: flex;
  row-gap: .5rem;
  column-gap: .5rem;
  padding: .5rem;
  flex-wrap: wrap;
  max-width: 200px;
  width: 100%;
  background: ${copper};
  border-radius: .5rem;
`;


export default function RobotList({ position = RobotPlaces.ROBOT_FACTORY }: RobotListProps) {
    const robots = useSelector<Store, RobotWithIndex[]>(store => store.robots.map((robot, index) => ({ index, robot })).filter(({ robot }) => robot.position === position));
    return robots.length ? (<RobotPositionListDiv data-testid={`robotLits-${position}`}>{robots.map(bot => (<RobotItem bot={bot} key={bot.index} />))}</RobotPositionListDiv>) : (<></>);
}