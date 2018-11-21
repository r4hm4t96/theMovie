import { createStore, Reducer, applyMiddleware, Middleware, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

export function createAppStore(reducer, middleWare) {

    return createStore(reducer, applyMiddleware(middleWare));

}

export function createPersistStore(combinedReducers, middleWare) {
    let store = createStore(combinedReducers, applyMiddleware(middleWare))
    let persistor = persistStore(store)
    return { store, persistor }
}