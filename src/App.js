import React from "react";
import './styles/app.scss';
import {Login} from './pages/Login';
import { Route, Routes} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Home } from "./pages/Home";
import { Loja } from './pages/Loja';


function App() {
  return (

    <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
    </Routes>

  );
}

export default App;
