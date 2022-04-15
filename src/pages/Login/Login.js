//componente de login

import React from 'react';
import onca from '../../assets/icons/onca.png';


export const Login = () => {
    return (
        <div>
            <img src={onca} alt="onça pintada"  width="40%"/>
            <form align="center">
                <input type="text" name="login" placeholder="Usuário"/>
                <input type="password" name="senha" placeholder="Senha"/>
                <button>Entrar</button>
            </form>
        </div>
    );
}