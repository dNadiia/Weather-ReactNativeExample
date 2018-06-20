import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';

import createStore from './store/createStore';
import MainScreen from './screens/MainScreen';

const {persistor, store} = createStore();

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainScreen/>
                </PersistGate>
            </Provider>
        );
    }
}
