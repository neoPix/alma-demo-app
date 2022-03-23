import React, { useEffect } from 'react';
import styled from 'styled-components';
import Economics from './ui/Economics';
import { Provider } from 'react-redux';
import store from './store/store';

import GrassTexture from './assets/grass.jpg';
import FooMine from './ui/GameAssets/FooMine';
import BarMine from './ui/GameAssets/BarMine';
import RobotFactory from './ui/GameAssets/RobotFactory';
import FooBarFactory from './ui/GameAssets/FooBarFactory';
import initStore from './store/actions/initStore';
import RobotDetails from './ui/RobotDetails';
import Path from './ui/GameAssets/Path';
import GameOver from './ui/GameOver';

const MainGameDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${GrassTexture});
  background-size: 25%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 4rem;
`;

const storeInitializer = initStore(store);

function App() {
  useEffect(storeInitializer, []);
  return (
    <MainGameDiv>
      <GameOver />
      <Economics />
      <Row>
        <BarMine />
        <FooMine />
        <FooBarFactory />
        <RobotFactory />
      </Row>
      <Row>
        <Path />
      </Row>
      <RobotDetails />
    </MainGameDiv>
  );
}

export default App;
