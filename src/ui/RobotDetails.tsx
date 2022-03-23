import { useSelector, useStore } from "react-redux";
import styled from "styled-components";
import takeRobotAction from "../store/actions/takeRobotAction";
import { RobotPlaces } from "../store/interfaces/RobotAction";
import Store, { RobotWithIndex } from "../store/interfaces/Store";
import BotQueueItem from "./BotQueueItem";
import { copper, darkCopper } from "./colors";
import BarIcon from "./Icons/Bar";
import FooIcon from "./Icons/Foo";
import FooBarIcon from "./Icons/FooBar";
import getPositionIcon from "./Icons/getPlaceIcon";
import RobotIcon from "./Icons/Robot";

const RobotDetailPanel = styled.div`
  position: absolute;
  column-gap: .5rem;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  padding: .5rem;
  background: ${copper};
  border-radius: .5rem .5rem 0 0;
  display: flex;
`;

const PanelColumn = styled.div`
  border: 2px solid ${darkCopper};
  display: flex;
  background: black;
  flex-direction: column;
`;

const RobotInformation = styled.span`
  color: white;
  padding: .25rem .5rem;
  border-bottom: 1px solid grey;
`;

const RobotAction = styled.button`
  color: white;
  padding: .25rem .5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  border-bottom: 1px solid grey;
`;

const RobotActionsQueue = styled.span`
  border: 2px solid ${darkCopper};
  flex: 1;
  font-size: 1.5rem;
  letter-spacing: .2rem;
  background: black;
`;

export default function RobotDetails() {
    const selected = useSelector<Store, RobotWithIndex|null>(store => store.selectedRobot < 0 ? null : { robot: store.robots[store.selectedRobot], index: store.selectedRobot });
    const store = useStore();
    if (!selected) {
        return (<></>);
    }
    const mineBar = () => takeRobotAction(store, RobotPlaces.BAR_MINE)(selected);
    const mineFoo = () => takeRobotAction(store, RobotPlaces.FOO_MINE)(selected);
    const produceFooBar = () => takeRobotAction(store, RobotPlaces.FOOBAR_FACTORY)(selected);
    const produceRobot = () => takeRobotAction(store, RobotPlaces.ROBOT_FACTORY)(selected);
    const PositionComponent = getPositionIcon(selected.robot.position);
    return (<RobotDetailPanel data-testid="selectedRobotDetailPanel">
        <PanelColumn>
            <RobotInformation>Robot ID: <b data-testid="selectedRobotIndex">{ selected.index }</b></RobotInformation>
            <RobotInformation>Is active: <b data-testid="selectedRobotWorking">{ Boolean(selected.robot.currentAction) ? 'Yes' : 'No' }</b></RobotInformation>
            <RobotInformation>Nb actions in queue: <b data-testid="selectedRobotQueue">{ selected.robot.actionQueue.length }</b></RobotInformation>
            <RobotInformation>Position: <span data-testid="selectedRobotPosition"><PositionComponent /></span></RobotInformation>
        </PanelColumn>
        <PanelColumn>
            <RobotAction onClick={mineBar} data-testid="mineBarAction">Mine Bar <BarIcon /></RobotAction>
            <RobotAction onClick={mineFoo}>Mine Foo <FooIcon /></RobotAction>
            <RobotAction onClick={produceFooBar}>Produce FooBar <FooBarIcon /></RobotAction>
            <RobotAction onClick={produceRobot}>Produce Robot <RobotIcon /></RobotAction>
        </PanelColumn>
        <RobotActionsQueue data-testid="selectedRobotFullQueue">
          {selected.robot.currentAction ? <BotQueueItem action={selected.robot.currentAction} /> : <></> }
          { selected.robot.actionQueue.map((item, index) => (<BotQueueItem action={item} key={index} />)) }
        </RobotActionsQueue>
    </RobotDetailPanel>)
}