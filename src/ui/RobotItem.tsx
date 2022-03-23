import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { PossibleStoreActions, StoreActions } from "../store/interfaces/Actions";
import {  RobotWithIndex } from "../store/interfaces/Store";
import RobotIcon from "./Icons/Robot";

export interface RobotItemProps {
  bot: RobotWithIndex;
}

const IdleAnimation = keyframes`
  0% { background: #aa2929; }
  50% { background: #d30e0e; }
  100% { background: #aa2929; }
`;

const ActiveAnimation = keyframes`
  0% { background: #2f606f; }
  50% { background: #3fa3ba; }
  100% { background: #2f606f; }
`;

const RobotItemIdle = styled.div`
  font-size: 1.5rem;
  padding: .5rem;
  background: #aa2929;
  border-radius: .5rem;
  animation: ${IdleAnimation} 1s infinite;
  cursor: pointer;
`;

const RobotItemActive = styled.div`
  font-size: 1.5rem;
  padding: .5rem;
  background: #2f606f;
  border-radius: .5rem;
  animation: ${ActiveAnimation} 1s infinite;
  cursor: pointer;
`;


export default function RobotItem({ bot }: RobotItemProps) {
  const dispatch = useDispatch()

  const robotClick = () => {
    dispatch<PossibleStoreActions>({ type: StoreActions.SELECT_ROBOT, robotIndex: bot.index });
  };

  const Component = bot.robot.currentAction ? RobotItemActive : RobotItemIdle;
  return (<Component onClick={robotClick}><RobotIcon /></Component>)
}