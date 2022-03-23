import styled from "styled-components";

import FactoryTexture from '../../assets/fooMine.png';
import { RobotPlaces } from "../../store/interfaces/RobotAction";
import FooIcon from "../Icons/Foo";
import RobotList from "../RobotList";

const FooMineDiv = styled.div`
  width: 250px;
  height: 250px;
  background-image: url(${FactoryTexture});
  background-size: contain;
  packground-position: center center;
  background-repeat: no-repeat;
`;

const Indicator = styled.div`
  font-size: 2rem;
`;

export default function FooMineComponent() {
  return (<div data-testid="fooMine">
    <FooMineDiv>
      <Indicator><FooIcon /></Indicator>
    </FooMineDiv>
    <RobotList position={RobotPlaces.FOO_MINE} />
  </div>);
}