import {AsyncStorage} from 'react-native';
import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

import reducers from '../reducers';

const persistConfig = {
    key: 'persist',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancer = compose(applyMiddleware(thunkMiddleware));

export default (initialState: Object) => {
    let store = createStore(persistedReducer, initialState, enhancer);
    let persistor = persistStore(store);
    return {store, persistor}
}