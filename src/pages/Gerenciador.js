import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Headers } from '../components/Headers';
import { executaRequisicao } from '../services/api';
import { BsTrash } from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { SketchPicker } from 'react-color'


export const Gerenciador= () => {
    const [seasons, setSeasons] = useState([])
    const [skins, setSkins] = useState([])
    const [vendas, setVendas] = useState([])
    const [tabuleiros, setTabuleiros] = useState([])

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
            console.log("Tabuleiros: ", res.data)
        })
    },[])

    return(
        <div className='container-generic'>
            <Headers />
            <div className='container-gerenciador'>
                <div className='gerenciar-sub'>
                    <h1>Gerenciador de Seasons</h1>
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
                    <h1>Gerenciador de Skins</h1>
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
                    <h1>Gerenciador de Vendas</h1>
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
                <div className='gerenciar-sub'>
                    <h1>Gerenciador de Tabuleiros</h1>
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
            </div>
        </div>
    )
}