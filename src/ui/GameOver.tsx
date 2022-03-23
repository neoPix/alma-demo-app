import { useSelector } from "react-redux";
import styled from "styled-components";
import Store from "../store/interfaces/Store";
import { copper } from "./colors";

const ROBOTS_COUNT_TO_WIN = 20;

const GameOverOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const GameOverModal = styled.div`
  padding: 1rem;
  background: ${copper};
  border-radius: .5rem;
  color: white;
  text-align: center;
`;

export default function GameOver() {
    const robotCount = useSelector<Store, number>(store => store.robots.length);
    const hasEnoughRobots = robotCount >= ROBOTS_COUNT_TO_WIN;
    if (!hasEnoughRobots) {
        return (<></>);
    }
    return (<GameOverOverlay>
        <GameOverModal>
            <h1>Congratulations !!</h1>
            <h2>You've done it !</h2>
            <p>You managed to reach <b>{robotCount}</b> robots in your production system.</p>
            <p>This game is now over, you can press <b>&lt;F5&gt;</b> to start over.</p>
        </GameOverModal>
    </GameOverOverlay>)
}