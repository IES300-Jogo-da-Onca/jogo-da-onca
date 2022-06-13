import React, { useEffect, useState, useContext } from 'react';
import { Bloco } from '../components/BlocoSkin';
import { Headers } from '../components/Headers';
import { executaRequisicao } from '../services/api';
import { Input } from '../components/Input';
import { validarSenha, validarNome, validarConfirmacaoSenha } from '../utils/validadores';
import { UserContext } from '../context/UserContext';



export const Perfil = () => {

    const {userInfo, setUserInfo} = useContext(UserContext)
    const [nomeAlterar, setNome] = useState(userInfo.nome);
    const [senha, setSenha] = useState('');
    const [senhaAlterar, setSenhaAlterar] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [skinsUser, setSkinsUser] = useState([])
    const getSkinsUsuario = () => {
        executaRequisicao('/skins', 'GET').then(resp => setSkinsUser(resp.data))
        .catch(console.error)
    }

    const equiparSkin = (idSkin, ehCachorro, skinEquipada) => {
        if(skinEquipada) return
        executaRequisicao('/equiparSkin', "POST", {idSkin, ehCachorro})
        .then(resp =>{
            setUserInfo(resp.data)
            getSkinsUsuario()
        })
        .catch(console.error)
    }

    useEffect(() => {
        getSkinsUsuario()
    }, [])



    const alteraNome = evento => {
        evento.preventDefault();
        executaRequisicao('/alterarDados', 'POST', {nome: nomeAlterar})
        .then(resp => { 
            alert(resp.data.mensagem)
            setUserInfo({...userInfo, ...resp.data.data})
        })
        .catch(console.error)

    }

    const alteraSenha = evento => {
        evento.preventDefault();
        executaRequisicao('/alterarDados', 'POST', { senha, novaSenha:senhaAlterar})
        .then(resp => {
            alert(resp.data.mensagem)
            setSenha('')
            setSenhaAlterar('')
            setConfirmaSenha('')
        })
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
                                <Input className='input-perfil'
                                    //srcImg={user}
                                    //altImg={'icone usuário'}
                                    inputType="text"
                                    inputName="nome"
                                    //inputPlaceholder="Nome"
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
                                        className='input-perfil'
                                        inputType="password"
                                        inputName="senhaAtual"
                                        //inputPlaceholder="Senha Atual"
                                        setValue={setSenha}
                                        value={senha}
                                        mensagemValidacao="Senha inválida"
                                        exibirMensagemValidacao={senha && !validarSenha(senha)}

                                    />
                                </div>

                                <div className='containerSenhas'>
                                    <label>Nova Senha: </label>
                                    <Input
                                        className='input-perfil'
                                        //srcImg={cadeado}
                                        inputType="password"
                                        inputName="senha"
                                        // inputPlaceholder="Senha"
                                        value={senhaAlterar}
                                        setValue={setSenhaAlterar}
                                        mensagemValidacao="Senha inválida"
                                        exibirMensagemValidacao={senhaAlterar && !validarSenha(senhaAlterar)}

                                    />
                                </div>

                                <div className='containerSenhas'>
                                    <label>Confirmar Nova Senha: </label>
                                    <Input
                                        className='input-perfil'
                                        //srcImg={cadeado}
                                        inputType="password"
                                        inputName="senha"
                                        //inputPlaceholder="Confirmar senha"
                                        value={confirmaSenha}
                                        setValue={setConfirmaSenha}
                                        mensagemValidacao="As senhas precisam ser iguais "
                                        exibirMensagemValidacao={confirmaSenha && !validarConfirmacaoSenha(senhaAlterar, confirmaSenha)}
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
                        {
                            skinsUser.map(s => {
                                if (!s.ehCachorro) {
                                    return <Bloco
                                        textoBtn= {s.equipada ? 'Skin Equipada' : 'Equipar'}
                                        srcImg={s.imagemSkin}
                                        altImg={'imagem da skin'}
                                        nomeSkin={s.nomeSkin}
                                        acaoEquipar={() => equiparSkin(s.id, s.ehCachorro, s.equipada)}
                                    />
                                }
                            })
                        }
                   </div>
                    <h2>Cachorros</h2>
                    <div className='bloco-skins'>
                    {
                            skinsUser.map(s => {
                                if (s.ehCachorro) {
                                    return <Bloco
                                        textoBtn= {s.equipada ? 'Skin Equipada' : 'Equipar'}
                                        srcImg={s.imagemSkin}
                                        altImg={'imagem da skin'}
                                        nomeSkin={s.nomeSkin}
                                        acaoEquipar={() => equiparSkin(s.id, s.ehCachorro, s.equipada)}
                                    />
                                }
                            })
                        }
                    </div>

                </div>


            </div>

        </div>
    );
}