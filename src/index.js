import React from "react";
import { registerRootComponent } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./navigation/App";
import { store, persistor } from "./redux/store";
import { decode, encode } from "base-64";

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

const RNRedux = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

registerRootComponent(RNRedux);
