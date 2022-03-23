import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { RobotPlaces } from './store/interfaces/RobotAction';
import { Provider } from 'react-redux';
import FooBarReducer from './store/reducer';
import { PossibleStoreActions } from './store/interfaces/Actions';
import Store from './store/interfaces/Store';
import { createStore } from 'redux';
import initStore from './store/actions/initStore';
import takeRobotAction from './store/actions/takeRobotAction';
import sleep from './tools/sleep';

const store = () => {
  const instance = createStore<Store, PossibleStoreActions, unknown, unknown>(FooBarReducer);
  initStore(instance)();
  return instance;
};

test('should mount the app and renders the basic visual components', () => {
  // The major elements are visible
  render(<Provider store={store()}><App /></Provider>);
  const barMine = screen.getByTestId('barMine');
  expect(barMine).toBeInTheDocument();
  const path = screen.getByTestId('path');
  expect(path).toBeInTheDocument();
  const robotFactory = screen.getByTestId('robotFactory');
  expect(robotFactory).toBeInTheDocument();
  const fooBarFactory = screen.getByTestId('fooBarFactory');
  expect(fooBarFactory).toBeInTheDocument();
  const fooMine = screen.getByTestId('fooMine');
  expect(fooMine).toBeInTheDocument();
});

test('should render properly with the initial state', () => {
  // Two robots are present and the robot 0 is selected and is in the right position
  const testStore = store();
  render(<Provider store={testStore}><App /></Provider>);
  const selectedPanel = screen.getByTestId('selectedRobotDetailPanel');
  expect(selectedPanel).toBeInTheDocument();
  const robotList = screen.getByTestId(`robotLits-${RobotPlaces.ROBOT_FACTORY}`);
  expect(robotList).toBeInTheDocument();
  const robot1 = screen.getByTestId('robot-1');
  expect(robot1).toBeInTheDocument();
  const robot0 = screen.getByTestId('robot-0');
  expect(robot0).toBeInTheDocument();
  const selectedRobotIndex = screen.getByTestId('selectedRobotIndex');
  expect(selectedRobotIndex).toBeInTheDocument();
  expect(selectedRobotIndex.innerHTML).toBe('0');
  expect(screen.getByTestId('selectedRobotPosition').textContent).toBe('🤖');
});

test('should list the actions present of the queue of a robot', async() => {
  const testStore = store();
  takeRobotAction(testStore, RobotPlaces.BAR_MINE)({ index: 0, robot: testStore.getState().robots[0] });
  takeRobotAction(testStore, RobotPlaces.BAR_MINE)({ index: 0, robot: testStore.getState().robots[0] });
  takeRobotAction(testStore, RobotPlaces.FOO_MINE)({ index: 0, robot: testStore.getState().robots[0] });
  await sleep();
  render(<Provider store={testStore}><App /></Provider>);
  expect(screen.getByTestId('selectedRobotPosition').textContent).toBe('🪜');
  expect(screen.getByTestId('selectedRobotFullQueue').textContent).toBe('🪜☢️☢️🪜🛢️');
});
