import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Headers } from '../components/Headers';
import { executaRequisicao } from '../services/api';
import { BsTrash } from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { Button, Form, Modal } from 'react-bootstrap';
import { Input } from '../components/Input';
import { SketchPicker } from 'react-color'
import axios from 'axios';


export const Gerenciador= () => {
    const [seasons, setSeasons] = useState([])
    const [skins, setSkins] = useState([])
    const [vendas, setVendas] = useState([])
    const [tabuleiros, setTabuleiros] = useState([])


    //-------------Controle dos Modais-----------------------------\\
    const [modalType, setModalType] = useState('') 
    const [modalHeader, setModalHeader] = useState('')
    const [modalBody, setModalBody] = useState(<div>Teste Body</div>)
    const [modalFooter, setModalFooter] = useState(<div>Teste Footer</div>)
    
    const [showModal, setShowModal] = useState(false); //pop up de pagamento
    const [showModalSucesso, setShowModalSucesso] = useState(false);

    const [nomeTabuleiro, setNomeTabuleiro] = useState('')
    const [corTematica, setCorTematica] = useState('')

    useEffect(()=> {
        console.log("CorTemática: ", corTematica)
    },[])

    const novoTabuleiro = () => {
        setModalType('novoTabuleiro')
        setModalHeader("Cadastrar Tabuleiro")

        setModalBody(
            <div className='modalBody'>
                <Input 
                    inputType="text"
                    inputName="nome-tabuleiro"
                    inputPlaceholder="Nome do Tabuleiro"
                    value={nomeTabuleiro}
                    setValue={setNomeTabuleiro}
                />
                <input id="fileItem" type="file"/>

                <p>Cor temática: </p>
                <Form.Control
                    type="color"
                    id="corTematicaInput"
                    defaultValue="#563d7c"
                    title="Choose your color"
                    onChange={newColor => console.log("NovaCor: ", setCorTematica(newColor.target.value))}
                />
            </div>
        )

        setModalFooter(
            <div className='modalFooter'>
                <button onClick={cadastrarTabuleiro}>Cadastrar</button>
                <button className='cancelBtn' onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
        )

        setShowModal(true)
    }

    const cadastrarTabuleiro = () => {
        var formdata = new FormData();
        formdata.append("file", document.getElementById('fileItem').files[0], "/C:/Users/fernandoguerriero/Downloads/Jungle.png");

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("http://52.67.31.76:8000", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    //--------------------------------------------------------------\\


    const getSeasons = () => {
        return executaRequisicao('/consultarSeasons','GET')
    }
    const getSkins = () => {
        return executaRequisicao('/consultarSkins','GET')
    }
    const getVendas = () => {
        return executaRequisicao('/consultarVendas','GET')
    }
    const getTabuleiros = () => {
        return executaRequisicao('/consultarTabuleiros','GET')
    }
    
    useEffect(() => {
        getSeasons().then(res => {
            setSeasons(res.data)
        })
        getSkins().then(res => {
            setSkins(res.data)
        })
        getVendas().then(res => {
            setVendas(res.data)
        })
        getTabuleiros().then(res => {
            setTabuleiros(res.data)
        })
    },[])

    return(
        <div className='container-generic'>
            <Headers />
            <div className='container-gerenciador'>
                <div className='gerenciar-sub'>
                    <h1>Gerenciador de Tabuleiros</h1>
                    <button onClick={novoTabuleiro}>Novo Tabuleiro</button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Imágem</th>
                                <th>Cor Temática</th>
                                <th>Data deCriação</th>
                                <th className='actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tabuleiros.map(tabuleiro => {
                                    return <tr>
                                        <td className="align-middle">{tabuleiro.id}</td>
                                        <td className="align-middle">{tabuleiro.nomeTabuleiro}</td>
                                        <td className="align-middle"><img src={tabuleiro.imagemTabuleiro}/></td>
                                        <td className="align-middle">
                                            <div style={{
                                                background: `${tabuleiro.corTematica}`,
                                                height: '3em',
                                            }}/>
                                        </td>
                                        <td className="align-middle">{tabuleiro.dtCriacao}</td>
                                        <td className="align-middle actions">
                                            <button className='delete'>
                                                <BsTrash />
                                            </button>
                                            <button>
                                                <FiEdit />
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className='gerenciar-sub'>
                    <h1>Gerenciador de Skins</h1>
                    <button>Nova Skin</button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Imagem</th>
                                <th>Cor Temática</th>
                                <th>Tipo</th>
                                <th className='actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                skins.map(skin => {
                                    return <tr>
                                        <td className="align-middle">{skin.id}</td>
                                        <td className="align-middle">{skin.nomeSkin}</td>
                                        <td className="align-middle"><img src={skin.imagemSkin}></img></td>
                                        <td className="align-middle">
                                            {/* <SketchPicker 
                                                color={skin.corTematica}
                                            /> */}
                                            <div style={{
                                                background: `${skin.corTematica}`,
                                                height: '3em',
                                            }}/>
                                        </td>
                                        <td className="align-middle">{skin.tipoPeca?"Cachorro":"Onça"}</td>
                                        <td className="align-middle actions">
                                            <button className='delete'>
                                                <BsTrash />
                                            </button>
                                            <button>
                                                <FiEdit />
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className='gerenciar-sub'>
                    <h1>Gerenciador de Seasons</h1>
                    <button>Nova Season</button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Inicio</th>
                                <th>Fim</th>
                                <th>ID Tabuleiro</th>
                                <th>Prioridade</th>
                                <th className='actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                seasons.map( season => {
                                    return <tr>
                                        <td>{season.id}</td>
                                        <td>{season.nomeSeason}</td>
                                        <td>{season.inicioVigencia}</td>
                                        <td>{season.fimVigencia}</td>
                                        <td>{season.idTabuleiro}</td>
                                        <td>{season.prioridade}</td>
                                        <td className='actions'>
                                            <button className='delete'>
                                                <BsTrash />
                                            </button>
                                            <button>
                                                <FiEdit />
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className='gerenciar-sub'>
                    <h1>Gerenciador de Vendas</h1>
                    <button>Nova Venda</button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Valor</th>
                                <th>ID Season</th>
                                <th>ID Skin</th>
                                <th className='actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendas.map(venda => {
                                    return <tr>
                                        <td>{venda.id}</td>
                                        <td>{venda.valor}</td>
                                        <td>{venda.idSeason}</td>
                                        <td>{venda.idSkin}</td><td className="align-middle actions">
                                            <button className='delete'>
                                                <BsTrash />
                                            </button>
                                            <button>
                                                <FiEdit />
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal className='container-modal' show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <h3>{modalHeader}</h3>
                </Modal.Header>
                <Modal.Body>
                    {modalBody}
                </Modal.Body>
                <Modal.Footer>
                    {modalFooter}
                </Modal.Footer>
            </Modal>
        </div>
    )
}