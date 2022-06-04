import React, { useState } from 'react';
import { Bloco } from '../components/BlocoSkin';
import { Headers } from '../components/Headers';
import skinOnca from '../assets/icons/onçaClássicaPeça.svg'
import skinCachorro from '../assets/icons/dogClassicoPeça.svg'
import { executaRequisicao } from '../services/api';
import { Input } from '../components/Input';
import user from '../assets/icons/user.svg';
import cadeado from '../assets/icons/cadeado.svg';
import { validarSenha, validarlogin, validarNome, validarConfirmacaoSenha } from '../utils/validadores';


export const Perfil= () => {

    const moedas = '200'
    //const moedas = executaRequisicao('/comprarmoeda', 'GET', { moedas }) //trazendo qtd de moedas que o user tem
    //const skinUser = executaRequisicao('/', 'GET', { skins }) //pegar skins do usuário no banco
    
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');


    const alteraNome = evento => {
        evento.preventDefault(); 
        executaRequisicao('/register', 'POST', {
            nome
        }).then(console.log)
           .then(setTimeout(() => {
        }, 4000))
            .catch(console.error)
    } 

    const alteraSenha = evento => {
        evento.preventDefault(); 
        executaRequisicao('/register', 'POST', {
            senha
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
                        <h4>Editar Perfil</h4>
                        <Input
                            srcImg={user}
                            altImg={'icone usuário'}
                            inputType="text"
                            inputName="nome"
                            inputPlaceholder="Nome"
                            value={nome}
                            setValue={setNome}
                            mensagemValidacao="Nome inválido"
                            exibirMensagemValidacao={nome && !validarNome(nome)}
                        />

                        <button onClick={alteraNome} disabled={!validarNome(nome)}>Alterar Nome</button>

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

                        <button onClick={alteraSenha} disabled={!validarSenha(senha)}>Alterar Senha</button>
                        
                    </div>
                </div>
               <div className='container-skins'>
                   <h3>Minhas Skins</h3>
                   <h4>Onça</h4>
                   <div className='bloco-onca'>
                        
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
                   <h4>Cachorro</h4>
                   <div className='bloco-cachorro'>
                        
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