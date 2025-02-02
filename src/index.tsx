import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/index.ts';

const persistedState = localStorage.getItem('appState')
  ? JSON.parse(localStorage.getItem('appState')!)
  : undefined;

const store = createStore(rootReducer, persistedState);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
);
