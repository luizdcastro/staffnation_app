import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { apiMiddleware } from "../services/apiMiddleware";
import AsyncStorage from "@react-native-community/async-storage";

import rootReducer from "./reducers";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	compose(applyMiddleware(apiMiddleware))
);

const persistor = persistStore(store);

export { persistor, store };
