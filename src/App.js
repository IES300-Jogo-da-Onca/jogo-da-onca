import React, {useContext, useEffect, useState} from "react";
import './styles/app.scss';
import {Login} from './pages/Login';
import { Route, Routes, useNavigate, useLocation, Navigate} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Home } from "./pages/Home";
import { Loja } from './pages/Loja';
import { ComprarMoedas } from "./pages/ComprarMoedas";
import { Perfil } from "./pages/Perfil";
import {Tabuleiro} from "./pages/Tabuleiro"
import UserProvider from "./context/UserContext";
import RequireAuth from './components/RequireAuth'

const App = () => {

  useEffect(()=>{
    //console.log("Teste: ", authenticatted)
  },[])
  
  return (
    <UserProvider>
      <Routes>
          <Route path="/" element={
            localStorage.getItem('userData') ? <Navigate to="/home" replace /> : <Login /> 
          } />

          <Route path="/cadastro" element={
            localStorage.getItem('userData') ? <Navigate to="/home" replace /> : <Cadastro/>
          } />
          
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/loja" element={
            <RequireAuth>
              <Loja />
            </RequireAuth>
          }/>
          <Route path="/comprarMoedas" element={
            <RequireAuth>
              <ComprarMoedas />
            </RequireAuth>
          }/>
          <Route path="/perfil" element={
            <RequireAuth>
              <Perfil />
            </RequireAuth>
          }/>
          <Route path="/tabuleiro" element={<Tabuleiro />}/>
      </Routes>
    </UserProvider>
  );
}

export default App