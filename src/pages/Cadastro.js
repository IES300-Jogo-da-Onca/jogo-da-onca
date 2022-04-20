import React, {useState} from 'react';
import {Input} from '../components/Input';
import logo from '../assets/icons/logo-sem-fundo.png';

export const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isLoading, setLoading] = useState(false);

    //validar se senha == confirmaSenha
    
    const executaCadastro = evento => {
        evento.preventDefault(); //esse método faz com que o botão não dê submit nos dados de acesso pois ainda não foram validados pela API
        setLoading(true);
        //função apenas para testar o state do botão, enquanto não tem API
        setTimeout(() => {
            setLoading(false);

        }, 3000)
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

                />

                <Input
                    inputType="text"
                    inputName="login"
                    inputPlaceholder="Usuário"
                    value={login}
                    setValue={setLogin}

                />
                
                <Input
                    inputType="password"
                    inputName="senha"
                    inputPlaceholder="Senha"
                    value={senha}
                    setValue={setSenha}

                />

                <Input
                    inputType="password"
                    inputName="senha"
                    inputPlaceholder="Confirmar senha"
                    value={confirmaSenha}
                    setValue={setConfirmaSenha}
                />
              
             
                <button onClick={executaCadastro} disable={isLoading}>{isLoading === true ? 'Cadastrando' : 'Cadastrar'}</button>
                <br/>
                <br/>
                <p className='link-login'>Já possui uma conta? <a href='/'>Faça login</a></p>
            </form>
        </div>
    );
}