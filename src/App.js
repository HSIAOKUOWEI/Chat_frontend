import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./index.css";
import AuthPage from './features/auth/AuthPage';
import ChatPage from './features/chat/ChatPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          {/* 重定向根路径到 /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/chat" element={<ChatPage />} />
          {/* 你可以在这里添加更多的路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
