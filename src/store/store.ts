import { createStore } from "redux";
import { PossibleStoreActions } from "./interfaces/Actions";
import Store from "./interfaces/Store";
import FooBarReducer from "./reducer";

const store = createStore<Store, PossibleStoreActions, unknown, unknown>(FooBarReducer);

export type StoreType = typeof store;

export default store;