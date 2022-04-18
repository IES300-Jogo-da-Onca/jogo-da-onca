import React from 'react';
import './styles/app.scss';
import {Login} from './pages/Login/Login';
import { Switch, Route, Routes} from 'react-router-dom';
import { HomeSU } from './pages/SU/HomeSU';
import {Skins} from './pages/SU/Skins';
import {Tabuleiro} from './pages/SU/Tabuleiro';




function App() {
  return (
    
    <Login/>

  );
}

export default App;
