//componente de login

import React, {useState} from 'react';
import {Input} from '../components/Input';
import {useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo-sem-fundo.png';



export const Login = () => {

    //variáveis que pegam as informações de login
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setLoading] = useState(false); //uma variável que guarda o estado do carregamento ao clicar no botão Entrar

    const navigate = useNavigate();

    //função que faz o login com base nas variáveis acima e com um evento específico (Botão Entrar)
    const executaLogin = evento => {
        evento.preventDefault(); //esse método faz com que o botão não dê submit nos dados de acesso pois ainda não foram validados pela API
        setLoading(true);
        //função apenas para testar o state do botão, enquanto não tem API
        setTimeout(() => {
            setLoading(false);
            navigate('home')
        }, 3000)
    }

    return (
        <div className='container-login'>
            <img 
                className='logo' 
                src={logo} 
                alt="onça pintada" 
            />
            <form>
                <Input
                    //srcImg={mail}
                    //altImg={'icone email'}
                    inputType="text"
                    inputName="login"
                    inputPlaceholder="Usuário"
                    value={login}
                    setValue={setLogin}

                />
                
                <Input
                    //srcImg={lock}
                    //altImg={'icone senha'}
                    inputType="password"
                    inputName="senha"
                    inputPlaceholder="Senha"
                    value={senha}
                    setValue={setSenha}

                />
              
             
                <button onClick={executaLogin} disable={isLoading}>{isLoading === true ? 'Entrando' : 'Entrar'}</button>
                <br/>
                <br/>
                <p className='link-cadastro'>Ainda não tem cadastro? <a href='/cadastro'>Cadastre-se</a></p>
            </form>
        </div>
    );
}