import styled from "styled-components";

import BarMineTexture from '../../assets/barMine.png';
import { RobotPlaces } from "../../store/interfaces/RobotAction";
import BarIcon from "../Icons/Bar";
import RobotList from "../RobotList";

const FooMineDiv = styled.div`
  width: 250px;
  height: 250px;
  background-image: url(${BarMineTexture});
  background-size: contain;
  packground-position: center center;
  background-repeat: no-repeat;
`;

const Indicator = styled.div`
  font-size: 2rem;
`;

export default function BarMineComponent() {
  return (<div>
    <FooMineDiv>
      <Indicator><BarIcon /></Indicator>
    </FooMineDiv>
    <RobotList position={RobotPlaces.BAR_MINE} />
  </div>);
}