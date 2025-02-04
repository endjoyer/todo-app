import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import './styles/index.css';
import AppRoutes from './routes.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/index.ts';

const persistedState = localStorage.getItem('appState');
const initialState = persistedState ? JSON.parse(persistedState) : undefined;

const store = createStore(rootReducer, initialState);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

Modal.setAppElement('#root');

root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
);
