import { createStore } from 'redux';
import { PossibleStoreActions } from '../interfaces/Actions';
import Store from '../interfaces/Store';
import FooBarReducer from '../reducer';
import addEconomics from './addEconomics';

const store = () => createStore<Store, PossibleStoreActions, unknown, unknown>(FooBarReducer);

test('should not change anything to the state', () => {
    const ref = store();
    const before = ref.getState();
    addEconomics(ref)({ bar: 0, foo: 0, foobar: 0 });
    const after = ref.getState();
    expect(before).toStrictEqual(after);
});

test('should only change the bar part', () => {
    const ref = store();
    addEconomics(ref)({ bar: 1, foo: 0, foobar: 0 });
    addEconomics(ref)({ bar: 4, foo: 0, foobar: 0 });
    const after = ref.getState();
    expect(after.economics).toStrictEqual({ bar: 5, foo: 0, foobar: 0 });
});

test('should only change the foo part', () => {
    const ref = store();
    addEconomics(ref)({ bar: 0, foo: 4, foobar: 0 });
    addEconomics(ref)({ bar: 0, foo: 4, foobar: 0 });
    const after = ref.getState();
    expect(after.economics).toStrictEqual({ bar: 0, foo: 8, foobar: 0 });
});

test('should only change the foobar part', () => {
    const ref = store();
    addEconomics(ref)({ bar: 0, foo: 0, foobar: 4 });
    addEconomics(ref)({ bar: 0, foo: 0, foobar: 5 });
    const after = ref.getState();
    expect(after.economics).toStrictEqual({ bar: 0, foo: 0, foobar: 9 });
});

test('should change and add multiple values', () => {
    const ref = store();
    addEconomics(ref)({ bar: 2, foo: 6, foobar: 0 });
    addEconomics(ref)({ bar: 0, foo: 2, foobar: 5 });
    const after = ref.getState();
    expect(after.economics).toStrictEqual({ bar: 2, foo: 8, foobar: 5 });
});

test('should not cxhange the values for < 0 inputs', () => {
    const ref = store();
    addEconomics(ref)({ bar: -2, foo: -6, foobar: -4 });
    const after = ref.getState();
    expect(after.economics).toStrictEqual({ bar: 0, foo: 0, foobar: 0 });
});
