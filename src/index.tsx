import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes.tsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers/index.ts';
import rootSaga from './redux/sagas/index.ts';

const sagaMiddleware = createSagaMiddleware();

const persistedState = localStorage.getItem('appState')
  ? JSON.parse(localStorage.getItem('appState')!)
  : undefined;

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
);
