import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChatContextProvider } from './store/ChatContext';
import { QuizContextProvider } from './store/QuizContext';
import { AuthContextProvider } from './store/AuthContext';
import { VideocontextProvider } from './store/VideoContext';
import { SocketContextProvider } from './store/SocketContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizContextProvider>
    <VideocontextProvider>
    <AuthContextProvider>
    <ChatContextProvider>
    <App />    
    </ChatContextProvider>
    </AuthContextProvider>
    </VideocontextProvider>
    </QuizContextProvider>
  </React.StrictMode>
);