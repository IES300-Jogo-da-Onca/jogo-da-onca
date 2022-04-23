//componente de login

import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo-sem-fundo.png';
import { validarlogin, validarSenha } from '../utils/validadores';
import { executaRequisicao } from '../services/api';



export const Login = () => {

    //variáveis que pegam as informações de login
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [msgErro, setMsgErro] = useState('');
    const [isLoading, setLoading] = useState(false); //uma variável que guarda o estado do carregamento ao clicar no botão Entrar

    const navigate = useNavigate();

    const validarFormulario = () => {
        return (
            validarlogin(login)
            && validarSenha(senha)
        )
    }
    //função que faz o login com base nas variáveis acima e com um evento específico (Botão Entrar)
    const executaLogin = async evento => {
        try {
            evento.preventDefault();
            setLoading(true);
            setMsgErro('');
            navigate('home');

            //body que vai na requisição
            const body = {
                login,
                senha
            }

            const resultado = await executaRequisicao('/login', 'post', body);
            if (resultado?.data) {
                localStorage.setItem('usuarioNome', resultado.data.nome);
                localStorage.setItem('usuarioLogin', resultado.data.login);
            }
        } catch (e) {
            console.log(e);
            if (e?.response?.data?.erro) {
                setMsgErro(e.response.data.erro);
            }

        }
        setLoading(false);

    }

    return (
        <div className='container-login'>
            <img
                className='logo'
                src={logo}
                alt="onça pintada"
            />
            <form>
                {msgErro && <p className='msg-erro'>{msgErro}</p>}
                <Input
                    //srcImg={mail}
                    //altImg={'icone email'}
                    inputType="text"
                    inputName="login"
                    inputPlaceholder="Usuário"
                    value={login}
                    setValue={setLogin}
                    mensagemValidacao="Usuário inválido"
                    exibirMensagemValidacao={login && !validarlogin(login)}

                />

                <Input
                    //srcImg={lock}
                    //altImg={'icone senha'}
                    inputType="password"
                    inputName="senha"
                    inputPlaceholder="Senha"
                    value={senha}
                    setValue={setSenha}
                    mensagemValidacao="Senha inválida"
                    exibirMensagemValidacao={senha && !validarSenha(senha)}

                />


                <button onClick={executaLogin} disable={!validarFormulario()}>Entrar</button>
                <br />
                <br />
                <p className='link-cadastro'>Ainda não tem cadastro? <Link to='/cadastro'>Cadastre-se</Link></p>
            </form>
        </div>
    );
}