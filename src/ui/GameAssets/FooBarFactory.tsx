import styled from "styled-components";

import FooBarTexture from '../../assets/fooBarFactory.png';
import { RobotPlaces } from "../../store/interfaces/RobotAction";
import FooBarIcon from "../Icons/FooBar";
import RobotList from "../RobotList";

const FooBarFactoryDiv = styled.div`
  width: 250px;
  height: 250px;
  background-image: url(${FooBarTexture});
  background-size: contain;
  packground-position: center center;
  background-repeat: no-repeat;
`;

const Indicator = styled.div`
  font-size: 2rem;
`;

export default function FooBarFactoryComponent() {
  return (<div data-testid="fooBarFactory">
    <FooBarFactoryDiv>
      <Indicator><FooBarIcon /></Indicator>
    </FooBarFactoryDiv>
    <RobotList position={RobotPlaces.FOOBAR_FACTORY} />
  </div>);
}