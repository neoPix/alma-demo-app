import { createStore } from 'redux';
import { PossibleStoreActions } from '../interfaces/Actions';
import Store from '../interfaces/Store';
import FooBarReducer from '../reducer';
import initStore from './initStore';

const store = () => createStore<Store, PossibleStoreActions, unknown, unknown>(FooBarReducer);

test('should not change anything to the state', () => {
    const ref = store();
    initStore(ref)();
    const after = ref.getState();
    expect(after.robots.length).toEqual(2);
});
