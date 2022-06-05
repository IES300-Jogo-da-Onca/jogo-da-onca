//componente de login

import React, { useState, useContext } from 'react';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo-sem-fundo.png';
import cadeado from '../assets/icons/cadeado.svg';
import user from '../assets/icons/user.svg';
import { validarlogin, validarSenha } from '../utils/validadores';
import { executaRequisicao } from '../services/api';
import { UserContext } from '../context/UserContext';



export const Login = () => {

    //variáveis que pegam as informações de login
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [msgErro, setMsgErro] = useState('');
    const [isLoading, setLoading] = useState(false); //uma variável que guarda o estado do carregamento ao clicar no botão Entrar
    const {userInfo, setUserInfo} = useContext(UserContext)
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

            //body que vai na requisição
            const body = {
                login,
                senha
            }

            const resultado = await executaRequisicao('/login', 'post', body);
            if (resultado?.data) {
                setUserInfo(resultado.data.data)
                localStorage.setItem("loggedUser", JSON.stringify(resultado.data.data))
                navigate('home')
            }
            
        } catch (e) {
            if(e.response.status === 401){
                setMsgErro(e.response.data.mensagem)
                console.log(msgErro)
            }
            else{
                console.log(e)
            }

        }
        setLoading(false);

    }

    return (
        <div className='container-all'>
            <div className='logo-img'>
                <img 
                    className='logo' 
                    src={logo} 
                    alt="onça pintada" 
                />
            </div>
            <div className='container-login'>
                <form>
                    {msgErro && <p className='msg-erro'>{msgErro}</p>}
                    <Input
                        srcImg={user}
                        altImg={'icone usuário'}
                        inputType="text"
                        inputName="login"
                        inputPlaceholder="Usuário"
                        value={login}
                        setValue={setLogin}
                        mensagemValidacao="Usuário inválido"
                        exibirMensagemValidacao={login && !validarlogin(login)}

                    />
                    
                    <Input
                        srcImg={cadeado}
                        altImg={'icone senha'}
                        inputType="password"
                        inputName="senha"
                        inputPlaceholder="Senha"
                        value={senha}
                        setValue={setSenha}
                        mensagemValidacao="Senha inválida"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}

                    />
                
                
                    <button onClick={executaLogin} disabled={!validarFormulario()}>Entrar</button>
                    <br/>
                    <br/>
                    <p className='link-cadastro'>Ainda não tem cadastro?  <Link to='/cadastro'>Cadastre-se</Link></p>
                </form>
            </div>
        </div>
    );
}