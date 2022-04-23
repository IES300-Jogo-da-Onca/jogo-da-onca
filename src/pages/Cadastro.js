import React, { useState } from 'react';
import { Input } from '../components/Input';
import logo from '../assets/icons/logo-sem-fundo.png';
import { validarSenha, validarlogin, validarNome, validarConfirmacaoSenha } from '../utils/validadores';
import { Navigate, Link } from 'react-router-dom';
import { executaRequisicao } from '../services/api';
export const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isLoading, setLoading] = useState(false);

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarlogin(login)
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmaSenha)
        )
    }

    const executaCadastro = evento => {
        evento.preventDefault(); //esse método faz com que o botão não dê submit nos dados de acesso pois ainda não foram validados pela API
        setLoading(true);
        //função apenas para testar o state do botão, enquanto não tem API
        executaRequisicao('/register', 'POST', {
            login,
            senha,
            nome
        }).then(console.log)
            .catch(console.error)
    }

    return (
        <div className='container-cadastro'>
            <img
                className='logo'
                src={logo}
                alt="onça pintada"
            />
            <form>

                <Input
                    inputType="text"
                    inputName="nome"
                    inputPlaceholder="Nome"
                    value={nome}
                    setValue={setNome}
                    mensagemValidacao="o nome deve ter pelo menos 3 caracteres"
                    exibirMensagemValidacao={nome && !validarNome(nome)}

                />

                <Input
                    inputType="text"
                    inputName="login"
                    inputPlaceholder="Usuário"
                    value={login}
                    setValue={setLogin}
                    mensagemValidacao="O Usuário informado é inválido"
                    exibirMensagemValidacao={login && !validarlogin(login)}

                />

                <Input
                    inputType="password"
                    inputName="senha"
                    inputPlaceholder="Senha"
                    value={senha}
                    setValue={setSenha}
                    mensagemValidacao="Senha inválida"
                    exibirMensagemValidacao={senha && !validarSenha(senha)}

                />

                <Input
                    inputType="password"
                    inputName="senha"
                    inputPlaceholder="Confirmar senha"
                    value={confirmaSenha}
                    setValue={setConfirmaSenha}
                    mensagemValidacao="As senhas precisam ser iguais "
                    exibirMensagemValidacao={confirmaSenha && !validarConfirmacaoSenha(senha, confirmaSenha)}
                />

                <button onClick={executaCadastro} disable={!validarFormulario()}>{isLoading === true ? 'Cadastrando' : 'Cadastrar'}</button>
                <br />
                <br />
                <p className='link-login'>Já possui uma conta? <Link to='/'>Faça login</Link></p>
            </form>
        </div>
    );
}