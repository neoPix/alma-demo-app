import styled from "styled-components";

import PathTexture from '../../assets/path.png';
import { RobotPlaces } from "../../store/interfaces/RobotAction";
import MovingIcon from "../Icons/Moving";
import RobotList from "../RobotList";

const MainPathDiv = styled.div`
  display: flex;
  flex: 1;
`;

const PathDiv = styled.div`
  flex: 1;
  height: 100px;
  padding: 20px;
  background-image: url(${PathTexture});
  background-size: contain;
  packground-position: center center;
`;

const Indicator = styled.div`
  font-size: 2rem;
`;

export default function PathComponent() {
    return (<MainPathDiv data-testid="path">
        <PathDiv>
            <Indicator><MovingIcon /></Indicator>
            <RobotList position={RobotPlaces.TRANSITIONNING} />
        </PathDiv>
    </MainPathDiv>);
}