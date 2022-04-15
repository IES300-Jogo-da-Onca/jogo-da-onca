//componente de login

import React from 'react';
//importando o arquivo de imagem da onca numa variável
import onca from '../assets/icons/onca.png';
import style from '../styles/index.css';

export const Login = () => {
    return (
        <div>
            <img src={onca} alt="onça pintada"/>
            <form>
                <input type="text" name="login" placeholder="Usuário"/>
                <input type="password" name="senha" placeholder="Senha"/>
                <button>Entrar</button>
            </form>
        </div>
    );
}