import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/index.scss';
import App from './components/App/App';
import Leaderboard from "./components/Leaderboard/Leaderboard"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/leaderboard" element={ <Leaderboard /> } />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
