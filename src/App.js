import React from "react";
import './styles/app.scss';
import {Login} from './pages/Login';
import { Route, Routes} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Home } from "./pages/Home";
import { Loja } from './pages/Loja';
import { ComprarMoedas } from "./pages/ComprarMoedas";
import { Perfil } from "./pages/Perfil";


function App() {
  return (

    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/comprarMoedas" element={<ComprarMoedas />} />
        <Route path="/perfil" element={<Perfil />} />
    </Routes>

  );
}

export default App;
