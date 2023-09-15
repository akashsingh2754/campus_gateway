import React from 'react';
import ReactDOM from 'react-dom/client';
import classes from "./styles.module.css"
import App from './App';
import { SocketContextProvider } from './SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
  </React.StrictMode>
);


