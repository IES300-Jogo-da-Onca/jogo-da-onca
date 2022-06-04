import React, { useState } from 'react';
import { Bloco } from '../components/BlocoSkin';
import { Headers } from '../components/Headers';
import skinOnca from '../assets/icons/onçaClássicaPeça.svg'
import skinCachorro from '../assets/icons/dogClassicoPeça.svg'
import { executaRequisicao } from '../services/api';
import { Input } from '../components/Input';
import { validarSenha, validarNome, validarConfirmacaoSenha } from '../utils/validadores';


export const Perfil= () => {

    const moedas = '200'
    //const moedas = executaRequisicao('/comprarmoeda', 'GET', { moedas }) //trazendo qtd de moedas que o user tem
    //const skinUser = executaRequisicao('/', 'GET', { skins }) //pegar skins do usuário no banco
    
    const [nomeAlterar, setNome] = useState('');
    const [senhaAlterar, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');


    const alteraNome = evento => {
        evento.preventDefault(); 
        executaRequisicao('/register', 'POST', {
            nomeAlterar
        }).then(console.log)
           .then(setTimeout(() => {
        }, 4000))
            .catch(console.error)
    } 

    const alteraSenha = evento => {
        evento.preventDefault(); 
        executaRequisicao('/register', 'POST', {
            senhaAlterar
        }).then(console.log)
           .then(setTimeout(() => {
        }, 4000))
            .catch(console.error)
    } 
    return (
        <div className='container-generic'>
           <Headers />
           <div className='container-perfil'>
                <div className='usuario'>
                    <div>
                        <h1>Editar Perfil</h1>

                        <div className='container-botao'>
                            <div className='containerNome'>
                                <label>Nome: </label>
                                <Input
                                    //srcImg={user}
                                    //altImg={'icone usuário'}
                                    inputType="text"
                                    inputName="nome"
                                    inputPlaceholder="Nome"
                                    value={nomeAlterar}
                                    setValue={setNome}
                                    mensagemValidacao="Nome inválido"
                                    exibirMensagemValidacao={nomeAlterar && !validarNome(nomeAlterar)}
                                />

                                <button onClick={alteraNome} disabled={!validarNome(nomeAlterar)}>Alterar Nome</button>
                            </div>
                            
                            <div>
                                <div className='containerSenhas'>
                                    <label>Senha Atual: </label>
                                    <Input
                                        inputType="password"
                                        inputName="senhaAtual"
                                        inputPlaceholder="Senha Atual"
                                        setValue={setSenha}
                                        mensagemValidacao="Senha inválida"
                                        exibirMensagemValidacao={senhaAlterar && !validarSenha(senhaAlterar)}

                                    />
                                </div>

                                <div className='containerSenhas'>
                                    <label>Nova Senha: </label>
                                    <Input
                                        //srcImg={cadeado}
                                        inputType="password"
                                        inputName="senha"
                                        inputPlaceholder="Senha"
                                        value={senhaAlterar}
                                        setValue={setSenha}
                                        mensagemValidacao="Senha inválida"
                                        exibirMensagemValidacao={senhaAlterar && !validarSenha(senhaAlterar)}

                                    />
                                </div>

                                <div className='containerSenhas'>
                                    <label>Confirmar Nova Senha: </label>
                                    <Input
                                        //srcImg={cadeado}
                                        inputType="password"
                                        inputName="senha"
                                        inputPlaceholder="Confirmar senha"
                                        value={confirmaSenha}
                                        setValue={setConfirmaSenha}
                                        mensagemValidacao="As senhas precisam ser iguais "
                                        exibirMensagemValidacao={confirmaSenha && !validarConfirmacaoSenha(senhaAlterar,confirmaSenha)}
                                    />
                                </div>
                            </div>

                            <button onClick={alteraSenha} disabled={!validarSenha(senhaAlterar)}>Alterar Senha</button>
                        </div>
                    </div>
                </div>
               <div className='container-skins'>
                   <h2>Minhas Skins</h2>
                   <h2>Onças</h2>
                   <div className='bloco-skins'>
                        
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />

                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                   </div>
                   <h2>Cachorros</h2>
                   <div className='bloco-skins'>
                        
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />

                   </div>
                   
                </div>


           </div>

       </div>
    );
}