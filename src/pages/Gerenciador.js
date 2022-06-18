import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Headers } from '../components/Headers';
import { executaRequisicao } from '../services/api';
import { BsTrash } from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { Button, Form, Modal } from 'react-bootstrap';
import { Input } from '../components/Input';
import pagIcon from '../assets/icons/pag-sucesso.png';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const Gerenciador= () => {
    const [seasons, setSeasons] = useState([])
    const [skins, setSkins] = useState([])
    const [vendas, setVendas] = useState([])
    const [tabuleiros, setTabuleiros] = useState([])


    //-------------Controle dos Modais-----------------------------\\
    const [modalType, setModalType] = useState('') 
    const [modalHeader, setModalHeader] = useState('')
    
    const [showModal, setShowModal] = useState(false); //pop up de pagamento
    const [editingImage, setEditingImage] = useState(false);

    const [nomeTabuleiro, setNomeTabuleiro] = useState('');
    const [urlTabuleiro, setUrlTabuleiro] = useState('');
    const [idTabuleiro, setIdTabuleiro] = useState('');
    const [corTematica, setCorTematica] = useState('');

    const [inicioVigModal, setInicioVigModal] = useState('');
    const [fimVigModal, setFimVigModal] = useState('');
    const [priorModal, setPriorModal] = useState('');

    const[autoIncrSeason,setAutoIncrSeason] = useState('');

    const [nomeModal, setNomeModal]= useState('')
    const [urlModal, setUrlModal]= useState('')
    const [idModal, setIdModal] = useState('')
    const [tipoModal, setTipoModal] = useState('')

    useEffect(()=> {
        console.log("CorTemática: ", corTematica)
        console.log("Nome: ", nomeTabuleiro)
        console.log("URL Tab: ", urlTabuleiro)
        console.log("Editing Image: ", editingImage)
        console.log("tipo Modal: ", tipoModal)
    },[nomeTabuleiro, corTematica, urlTabuleiro, editingImage, tipoModal])

    const novoTabuleiro = () => {
        setModalType('novoTabuleiro')
        setModalHeader('Cadastrar Tabuleiro')
        setShowModal(true)
    }

    const cadastrarTabuleiro = () => {
        if(nomeTabuleiro==='' || corTematica==='' || !document.getElementById('fileItem').files[0]){
            window.alert("Preencha todos os campos antes de cadastrar um novo tabuleiro!")
            return
        }
        
        var formdata = new FormData();
        formdata.append("arquivo", document.getElementById('fileItem').files[0], document.getElementById('fileItem').files[0].name)

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("http://52.67.31.76:8000", requestOptions)
        .then(response => response.text())
        .then(result => {
            setUrlTabuleiro(result)
            executaRequisicao('/inserirTabuleiro','POST',{
                nome: nomeTabuleiro,
                imagem: result,
                corTematica
            }).then(res => {
                console.log("Response BD: ", res)
                setCorTematica('')
                setNomeTabuleiro('')
                setUrlTabuleiro('')
                setModalType('sucesso')
                setTimeout(() => {
                    setModalType('')
                    setModalHeader('')
                    setShowModal(false)
                    getTabuleiros().then(res => {
                        setTabuleiros(res.data)
                    })
                },2000)
            })
        })
        .catch(error => {
            console.log('error', error)
            window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
            setCorTematica('')
            setNomeTabuleiro('')
            setUrlTabuleiro('')
            setModalType('')
            setModalHeader('')
            setShowModal(false)
        });
    }

    const delTabModal = tabToDel => {
        console.log("Tab to Delete: ", tabToDel)
        setCorTematica(tabToDel.corTematica)
        setNomeTabuleiro(tabToDel.nomeTabuleiro)
        setUrlTabuleiro(tabToDel.imagemTabuleiro)
        setIdTabuleiro(tabToDel.id)
        setModalType('deleteTabuleiro')
        setModalHeader('Excluir Tabuleiro')
        setShowModal(true)
    }

    const deleteTabuleiro = () => {
        executaRequisicao('/removerTabuleiro','POST',{id: idTabuleiro}).then( res => {
            console.log("Delete Response: ", res)
            setCorTematica('')
            setNomeTabuleiro('')
            setUrlTabuleiro('')
            setIdTabuleiro('')
            setModalType('sucesso')
            setTimeout( () => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getTabuleiros().then(res => {
                    setTabuleiros(res.data)
                })
            }, 2000)
        }).catch( err => console.log("Delete Error: ", err.response))
    }

    const editTabModal = tabToEdit => {
        console.log("Tab to Edit: ", tabToEdit)
        setCorTematica(tabToEdit.corTematica)
        setNomeTabuleiro(tabToEdit.nomeTabuleiro)
        setUrlTabuleiro(tabToEdit.imagemTabuleiro)
        setIdTabuleiro(tabToEdit.id)
        setModalType('editTabuleiro')
        setModalHeader('Edição de Tabuleiro')
        setShowModal(true)
    }

    const saveTabEdit = () => {
        if(editingImage){
            var formdata = new FormData();
            formdata.append("arquivo", document.getElementById('fileItem').files[0], document.getElementById('fileItem').files[0].name)

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("http://52.67.31.76:8000", requestOptions)
            .then(response => response.text())
            .then(result => {
                setUrlTabuleiro(result)
                executaRequisicao('/alterarTabuleiro','POST',{
                    id: idTabuleiro,
                    nome: nomeTabuleiro,
                    imagem: result,
                    corTematica
                }).then(res => {
                    console.log("Response BD: ", res)
                    setCorTematica('')
                    setNomeTabuleiro('')
                    setUrlTabuleiro('')
                    setModalType('sucesso')
                    setTimeout(() => {
                        setModalType('')
                        setModalHeader('')
                        setShowModal(false)
                        getTabuleiros().then(res => {
                            setTabuleiros(res.data)
                        })
                    },2000)
                    return
                })
            })
            .catch(error => {
                console.log('error', error)
                window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
                setCorTematica('')
                setNomeTabuleiro('')
                setUrlTabuleiro('')
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                return
            });
        }
        
        executaRequisicao('/alterarTabuleiro','POST', {
            id: idTabuleiro,
            nome: nomeTabuleiro,
            imagem: urlTabuleiro,
            corTematica
        }).then(res => {
            console.log("Response BD: ", res)
            setCorTematica('')
            setNomeTabuleiro('')
            setUrlTabuleiro('')
            setModalType('sucesso')
            setTimeout(() => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                setEditingImage(false)
                getTabuleiros().then(res => {
                    setTabuleiros(res.data)
                })
            },2000)
        }).catch(error => {
            console.log('error', error)
            window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
            setCorTematica('')
            setNomeTabuleiro('')
            setUrlTabuleiro('')
            setModalType('')
            setModalHeader('')
            setShowModal(false)
            setEditingImage(false)
        });
    }

    const novaSkin = () => {
        setModalType('newSkin')
        setModalHeader('Cadastrar Skin')
        setShowModal(true)
    }

    const cadastrarSkin = () => {
        if(nomeModal==='' || corTematica==='' || tipoModal==='' || !document.getElementById('fileItem').files[0]){
            window.alert("Preencha todos os campos antes de cadastrar uma nova skin!")
            return
        }
        
        var formdata = new FormData();
        formdata.append("arquivo", document.getElementById('fileItem').files[0], document.getElementById('fileItem').files[0].name)

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("http://52.67.31.76:8000", requestOptions)
        .then(response => response.text())
        .then(result => {
            setUrlTabuleiro(result)
            executaRequisicao('/inserirSkin','POST',{
                nome: nomeModal,
                imagem: result,
                tipoPeca: tipoModal,
                corTematica
            }).then(res => {
                console.log("Response BD: ", res)
                setCorTematica('')
                setNomeModal('')
                setUrlModal('')
                setTipoModal('')
                setModalType('sucesso')
                setTimeout(() => {
                    setModalType('')
                    setModalHeader('')
                    setShowModal(false)
                    getSkins().then(res => {
                        setSkins(res.data)
                    })
                },2000)
            })
        })
        .catch(error => {
            console.log('error', error)
            window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setTipoModal('')
            setModalType('')
            setModalHeader('')
            setShowModal(false)
        });
    }

    const delSkinModal = skinToDel => {
        console.log("Skin to Delete: ", skinToDel)
        setCorTematica(skinToDel.corTematica)
        setNomeModal(skinToDel.nomeSkin)
        setUrlModal(skinToDel.imagemSkin)
        setIdModal(skinToDel.id)
        setTipoModal(skinToDel.tipoPeca?"Cachorro":"Onça")
        setModalType('deleteSkin')
        setModalHeader('Excluir Skin')
        setShowModal(true)
    }

    const deleteSkin = () => {
        executaRequisicao('/removerSkin','POST',{id: idModal}).then( res => {
            console.log("Delete Response: ", res)
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setIdModal('')
            setTipoModal('')
            setModalType('sucesso')
            setTimeout( () => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getSkins().then(res => {
                    setSkins(res.data)
                })
            }, 2000)
        }).catch( err => console.log("Delete Error: ", err.response))
    }

    const editSkinModal = skinToEdit => {
        console.log("Skin to Edit: ", skinToEdit)
        setCorTematica(skinToEdit.corTematica)
        setNomeModal(skinToEdit.nomeSkin)
        setUrlModal(skinToEdit.imagemSkin)
        setIdModal(skinToEdit.id)
        setTipoModal(skinToEdit.tipoPeca?"Cachorro":"Onça")
        setModalType('editSkin')
        setModalHeader('Edição de Skin')
        setShowModal(true)
    }

    const saveSkinEdit = () => {
        if(editingImage){
            var formdata = new FormData();
            formdata.append("arquivo", document.getElementById('fileItem').files[0], document.getElementById('fileItem').files[0].name)

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("http://52.67.31.76:8000", requestOptions)
            .then(response => response.text())
            .then(result => {
                setUrlModal(result)
                executaRequisicao('/alterarSkin','POST',{
                    id: idModal,
                    nome: nomeModal,
                    imagem: result,
                    tipoPeca: tipoModal,
                    corTematica
                }).then(res => {
                    console.log("Response BD: ", res)
                    setCorTematica('')
                    setNomeModal('')
                    setUrlModal('')
                    setIdModal('')
                    setTipoModal('')
                    setModalType('sucesso')
                    setTimeout( () => {
                        setModalType('')
                        setModalHeader('')
                        setShowModal(false)
                        setEditingImage(false)
                        getSkins().then(res => {
                            setSkins(res.data)
                        })
                    }, 2000)
                    return
                })
            })
            .catch(error => {
                console.log('error', error)
                window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
                setCorTematica('')
                setNomeModal('')
                setUrlModal('')
                setIdModal('')
                setTipoModal('')
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                setEditingImage(false)
                return
            });
        }
        
        executaRequisicao('/alterarSkin','POST', {
            id: idModal,
            nome: nomeModal,
            imagem: urlModal,
            tipoPeca: tipoModal,
            corTematica
        }).then(res => {
            console.log("Response BD: ", res)
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setIdModal('')
            setTipoModal('')
            setModalType('sucesso')
            setTimeout( () => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                setEditingImage(false)
                getSkins().then(res => {
                    setSkins(res.data)
                })
            }, 2000)
        }).catch(error => {
            console.log('error', error)
            window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setIdModal('')
            setTipoModal('')
            setModalType('')
            setModalHeader('')
            setShowModal(false)
            setEditingImage(false)
        });
    }

    const novaSeason = () => {
        setModalType('newSeason')
        setModalHeader('Cadastrar Season')
        setShowModal(true)
        executaRequisicao('/autoIncrementSeason','GET').then(res => {
            setAutoIncrSeason(res.data[0].AUTO_INCREMENT)
        })
    }

    const cadastrarSeason = () => {
        if(nomeModal==='' || inicioVigModal==='' || fimVigModal==='' || idTabuleiro==='' || priorModal==='' ){
            window.alert("Preencha todos os campos antes de cadastrar uma nova skin!")
            return
        }

        executaRequisicao('/inserirSeason','POST',{
            nome: nomeModal,
            inicioVigencia: inicioVigModal,
            fimVigencia: fimVigModal,
            idTabuleiro,
            prioridade: priorModal
        }).then(res => {
            console.log("Response BD: ", res)
            setNomeModal('')
            setInicioVigModal('')
            setFimVigModal('')
            setIdTabuleiro('')
            setPriorModal('')
            setModalType('sucesso')
            setTimeout(() => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getSeasons().then(res => {
                    setSeasons(res.data)
                })
            },2000)
        })
        .catch(error => {
            console.log('error', error)
            window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
            setNomeModal('')
            setInicioVigModal('')
            setFimVigModal('')
            setIdTabuleiro('')
            setPriorModal('')
            setModalType('')
            setModalHeader('')
            setShowModal(false)
        });
    }

    const delSeasonModal = skinToDel => {
        console.log("Skin to Delete: ", skinToDel)
        setCorTematica(skinToDel.corTematica)
        setNomeModal(skinToDel.nomeSkin)
        setUrlModal(skinToDel.imagemSkin)
        setIdModal(skinToDel.id)
        setTipoModal(skinToDel.tipoPeca?"Cachorro":"Onça")
        setModalType('deleteSkin')
        setModalHeader('Excluir Skin')
        setShowModal(true)
    }

    const deleteSeason = () => {
        executaRequisicao('/removerSkin','POST',{id: idModal}).then( res => {
            console.log("Delete Response: ", res)
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setIdModal('')
            setTipoModal('')
            setModalType('sucesso')
            setTimeout( () => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getSkins().then(res => {
                    setSkins(res.data)
                })
            }, 2000)
        }).catch( err => console.log("Delete Error: ", err.response))
    }

    const editSeasonModal = skinToEdit => {
        console.log("Skin to Edit: ", skinToEdit)
        setCorTematica(skinToEdit.corTematica)
        setNomeModal(skinToEdit.nomeSkin)
        setUrlModal(skinToEdit.imagemSkin)
        setIdModal(skinToEdit.id)
        setTipoModal(skinToEdit.tipoPeca?"Cachorro":"Onça")
        setModalType('editSkin')
        setModalHeader('Edição de Skin')
        setShowModal(true)
    }

    const saveSeasonEdit = () => {
        if(editingImage){
            var formdata = new FormData();
            formdata.append("arquivo", document.getElementById('fileItem').files[0], document.getElementById('fileItem').files[0].name)

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("http://52.67.31.76:8000", requestOptions)
            .then(response => response.text())
            .then(result => {
                setUrlModal(result)
                executaRequisicao('/alterarSkin','POST',{
                    id: idModal,
                    nome: nomeModal,
                    imagem: result,
                    tipoPeca: tipoModal,
                    corTematica
                }).then(res => {
                    console.log("Response BD: ", res)
                    setCorTematica('')
                    setNomeModal('')
                    setUrlModal('')
                    setIdModal('')
                    setTipoModal('')
                    setModalType('sucesso')
                    setTimeout( () => {
                        setModalType('')
                        setModalHeader('')
                        setShowModal(false)
                        setEditingImage(false)
                        getSkins().then(res => {
                            setSkins(res.data)
                        })
                    }, 2000)
                    return
                })
            })
            .catch(error => {
                console.log('error', error)
                window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
                setCorTematica('')
                setNomeModal('')
                setUrlModal('')
                setIdModal('')
                setTipoModal('')
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                setEditingImage(false)
                return
            });
        }
        
        executaRequisicao('/alterarSkin','POST', {
            id: idModal,
            nome: nomeModal,
            imagem: urlModal,
            tipoPeca: tipoModal,
            corTematica
        }).then(res => {
            console.log("Response BD: ", res)
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setIdModal('')
            setTipoModal('')
            setModalType('sucesso')
            setTimeout( () => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                setEditingImage(false)
                getSkins().then(res => {
                    setSkins(res.data)
                })
            }, 2000)
        }).catch(error => {
            console.log('error', error)
            window.alert("Erro ao fazer o upload da imagem. Contate administrador do sistema.")
            setCorTematica('')
            setNomeModal('')
            setUrlModal('')
            setIdModal('')
            setTipoModal('')
            setModalType('')
            setModalHeader('')
            setShowModal(false)
            setEditingImage(false)
        });
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
            //console.log("Tabuleiros: ", res.data)
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
                                            <button className='delete' onClick={() => delTabModal(tabuleiro)}>
                                                <BsTrash />
                                            </button>
                                            <button className='edit' onClick={() => editTabModal(tabuleiro)}>
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
                    <button onClick={novaSkin}>Nova Skin</button>
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
                                            <button className='delete' onClick={() => delSkinModal(skin)}>
                                                <BsTrash />
                                            </button>
                                            <button className='edit' onClick={() => editSkinModal(skin)}>
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
                    <button onClick={novaSeason}>Nova Season</button>
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
                    {modalType==='novoTabuleiro' ?
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
                                onChange={newColor => {
                                    setCorTematica(newColor.target.value)
                                }}
                            />
                        </div>
                    : modalType==='deleteTabuleiro' ?
                        <div className='modalBody'>
                            <p>Realmente deseja excluir o seguinte tabuleiro?</p>
                            <label>{nomeTabuleiro}</label>

                            <img src={urlTabuleiro} />

                            <p>Cor temática: </p>
                            <Form.Control
                                type="color"
                                id="corTematicaInput"
                                defaultValue={corTematica}
                                title="Choose your color"
                                disabled={true}
                            />
                        </div>
                    : modalType === 'editTabuleiro' ?
                        <div className='modalBody'>
                            <Input 
                                inputType="text"
                                inputName="nome-tabuleiro"
                                inputPlaceholder="Nome do Tabuleiro"
                                value={nomeTabuleiro}
                                setValue={setNomeTabuleiro}
                            />
                            {editingImage? <div></div> :<img src={urlTabuleiro} />} 
                            <input id="fileItem" type="file" onChange={e => {
                                setEditingImage(true)
                            }}/>

                            <p>Cor temática: </p>
                            <Form.Control
                                type="color"
                                id="corTematicaInput"
                                defaultValue={corTematica}
                                title="Choose your color"
                                onChange={newColor => {
                                    setCorTematica(newColor.target.value)
                                }}
                            />
                        </div>
                    : modalType === 'newSkin' ?
                        <div className='modalBody'>
                            <Input 
                                inputType="text"
                                inputName="nome-skin"
                                inputPlaceholder="Nome da Skin"
                                value={nomeModal}
                                setValue={setNomeModal}
                            />

                            <input id="fileItem" type="file"/>

                            <p>Selecione o tipo da peça:</p>
                            <div className='tipoPeçaRadio' >
                                <div><input type="radio" value={0} name="peca" id='raioOnca' onChange={e => setTipoModal(e.target.value)} /> Onça</div>
                                <div><input type="radio" value={1} name="peca" id='raioCachorro' onChange={e => setTipoModal(e.target.value)} /> Cachorro</div>
                            </div>

                            <p>Cor temática: </p>
                            <Form.Control
                                type="color"
                                id="corTematicaInput"
                                defaultValue="#c3c3c3"
                                title="Choose your color"
                                onChange={newColor => {
                                    setCorTematica(newColor.target.value)
                                }}
                            />
                        </div>
                    : modalType === 'deleteSkin' ?
                        <div className='modalBody'>
                            <p>{nomeModal}</p>

                            <img src={urlModal} />

                            <p>Tipo da peça:</p>
                            <span>{tipoModal}</span>

                            <p>Cor temática: </p>
                            <Form.Control
                                type="color"
                                id="corTematicaInput"
                                defaultValue={corTematica}
                                title="Choose your color"
                                disabled={true}
                            />
                        </div>
                    : modalType === 'editSkin' ?
                        <div className='modalBody'>
                            <Input 
                                inputType="text"
                                inputName="nome-skin"
                                inputPlaceholder="Nome da Skin"
                                value={nomeModal}
                                setValue={setNomeModal}
                            />
                            {editingImage? <div></div> :<img src={urlModal} />} 
                            <input id="fileItem" type="file" onChange={e => {
                                setEditingImage(true)
                            }}/>

                            <p>Cor temática: </p>
                            <Form.Control
                                type="color"
                                id="corTematicaInput"
                                defaultValue={corTematica}
                                title="Choose your color"
                                onChange={newColor => {
                                    setCorTematica(newColor.target.value)
                                }}
                            />
                        </div>
                    : modalType === '' ?
                        <div className='modalBody'></div>
                    : modalType === 'sucesso' ?
                        <div className='modalBody'>
                            <h1>Operação realizada com sucesso!</h1>
                            <img src={pagIcon}></img>
                        </div>
                    :   
                        <div></div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {modalType==='novoTabuleiro' ?
                        <div className='modalFooter'>
                            <button onClick={cadastrarTabuleiro}>Cadastrar</button>
                            <button className='cancelBtn' onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    : modalType==='deleteTabuleiro' ?
                        <div className='modalFooter'>
                            <button className='cancelBtn' onClick={deleteTabuleiro}>Excluir Tabuleiro</button>
                            <button onClick={() => setShowModal(false)}>Cancelar Operação</button>
                        </div>
                    : modalType === 'editTabuleiro' ?
                        <div className='modalFooter'>
                            <button onClick={saveTabEdit}>Salvar</button>
                            <button className='cancelBtn' onClick={() => {
                                setShowModal(false)
                                setEditingImage(false)
                            }}>Cancelar Operação</button>
                        </div>
                    : modalType === 'newSkin' ?
                        <div className='modalFooter'>
                            <button onClick={cadastrarSkin}>Cadastrar</button>
                            <button className='cancelBtn' onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    : modalType === 'deleteSkin' ?
                        <div className='modalFooter'>
                            <button className='cancelBtn' onClick={deleteSkin}>Excluir Skin</button>
                            <button onClick={() => setShowModal(false)}>Cancelar Operação</button>
                        </div>
                    : modalType === 'editSkin' ?
                        <div className='modalFooter'>
                            <button onClick={saveSkinEdit}>Salvar</button>
                            <button className='cancelBtn' onClick={() => {
                                setShowModal(false)
                                setEditingImage(false)
                            }}>Cancelar Operação</button>
                        </div>
                    : modalType === 'newSeason' ?
                        <div className='modalFooter'>
                            Fake
                        </div>
                    : modalType === 'deleteSeason' ?
                        <div className='modalFooter'>
                            Fake
                        </div>
                    : modalType === 'editSeason' ?
                        <div className='modalFooter'>
                            Fake
                        </div>
                    : modalType === '' ?
                        <div className='modalFooter'>
                            Fake
                        </div>
                    : modalType === 'sucesso' ?
                        <div>
                            <button onClick={() => setShowModal(false)}>Sair</button>
                        </div>
                    :   
                        <div></div>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}