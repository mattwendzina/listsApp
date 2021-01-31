import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import inputReducer from './store/reducers/input';
import itemsReducer from './store/reducers/items';
import listsReducer from './store/reducers/lists';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const logger = (store) => {
    return (next) => {
        return (action) => {
            const result = next(action);
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    input: inputReducer,
    items: itemsReducer,
    lists: listsReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
