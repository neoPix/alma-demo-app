import styled from "styled-components";

import RobotFactoryTexture from '../../assets/robotFactory.png';
import { RobotPlaces } from "../../store/interfaces/RobotAction";
import RobotIcon from "../Icons/Robot";
import RobotList from "../RobotList";

const RobotFactoryDiv = styled.div`
  width: 250px;
  height: 250px;
  background-image: url(${RobotFactoryTexture});
  background-size: contain;
  packground-position: center center;
  background-repeat: no-repeat;
`;

const Indicator = styled.div`
  font-size: 2rem;
`;

export default function RobotFactoryComponent() {
  return (<div>
    <RobotFactoryDiv>
      <Indicator><RobotIcon /></Indicator>
    </RobotFactoryDiv>
    <RobotList position={RobotPlaces.ROBOT_FACTORY} />
  </div>);
}