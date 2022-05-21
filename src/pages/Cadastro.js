import React, { useState } from 'react';
import { Input } from '../components/Input';
import logo from '../assets/icons/logo-sem-fundo.png';
import { validarSenha, validarlogin, validarNome, validarConfirmacaoSenha } from '../utils/validadores';
import { Link, useNavigate } from 'react-router-dom';
import { executaRequisicao } from '../services/api';
import cadeado from '../assets/icons/cadeado.svg';
import user from '../assets/icons/user.svg';
import { Alert } from 'react-bootstrap';
import checkIcon from '../assets/icons/pag-sucesso.png';


export const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [showSucesso, setShowSucesso] = useState(false);

    const navigate = useNavigate();
    //const msgSucesso = "Cadastro realizado com sucesso!";

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarlogin(login)
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmaSenha)
        )
    }

    const executaCadastro = evento => {
        evento.preventDefault(); 
        executaRequisicao('/register', 'POST', {
            login,
            senha,
            nome
        }).then(console.log)
        .then(setShowSucesso(true))
        .then(setTimeout(() => {
            navigate('/')
        }, 4000))
            .catch(console.error)
    } 

/*      const executaCadastro = evento => {
        evento.preventDefault(); 
        executaRequisicao('/register', 'POST', {
            login,
            senha,
            nome
        }).then(console.log)
            .catch(console.error)
    }  */

    return (
        <div className='container-all'>
            <div className='logo-img'>
                <img 
                    className='logo' 
                    src={logo} 
                    alt="onça pintada" 
                />
            </div>
            <div className='container-cadastro'>
                <form>

                    <Input
                        srcImg={user}   
                        inputType="text"
                        inputName="nome"
                        inputPlaceholder="Nome"
                        value={nome}
                        setValue={setNome}
                        mensagemValidacao="o nome deve ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}

                    />

                    <Input
                        srcImg={user}   
                        inputType="text"
                        inputName="login"
                        inputPlaceholder="Usuário"
                        value={login}
                        setValue={setLogin}
                        mensagemValidacao="O Usuário informado é inválido"
                        exibirMensagemValidacao={login && !validarlogin(login)}

                    />
                    
                    <Input
                        srcImg={cadeado}
                        inputType="password"
                        inputName="senha"
                        inputPlaceholder="Senha"
                        value={senha}
                        setValue={setSenha}
                        mensagemValidacao="Senha inválida"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}

                    />

                    <Input
                        srcImg={cadeado}
                        inputType="password"
                        inputName="senha"
                        inputPlaceholder="Confirmar senha"
                        value={confirmaSenha}
                        setValue={setConfirmaSenha}
                        mensagemValidacao="As senhas precisam ser iguais "
                        exibirMensagemValidacao={confirmaSenha && !validarConfirmacaoSenha(senha,confirmaSenha)}
                    />
                    
                    <Alert show={showSucesso} severity="success"><img src={checkIcon}></img>Cadastro realizado com sucesso! Direcionando...</Alert>
                
                    <button onClick={executaCadastro} disabled={!validarFormulario() || showSucesso === true}>Cadastrar</button>
                    <br/>
                    <br/>
                    <p className='link-login'>Já possui uma conta? <Link to='/'>Faça login</Link></p>
                </form>
            </div>
        </div>
    );
}