import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { Headers } from '../components/Headers';
import { executaRequisicao } from '../services/api';
import { BsTrash } from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { Button, Form, Modal } from 'react-bootstrap';
import { Input } from '../components/Input';
import pagIcon from '../assets/icons/pag-sucesso.png';


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
    const [idSeason,setIdSeason] = useState('');
    const [idSkin,setIdSkin] = useState('');

    const [inicioVigModal, setInicioVigModal] = useState('');
    const [fimVigModal, setFimVigModal] = useState('');
    const [priorModal, setPriorModal] = useState('');

    const[autoIncrSeason,setAutoIncrSeason] = useState('');
    const[autoIncrVenda,setAutoIncrVenda] = useState('');

    const [nomeModal, setNomeModal]= useState('')
    const [urlModal, setUrlModal]= useState('')
    const [idModal, setIdModal] = useState('')
    const [tipoModal, setTipoModal] = useState('')
    const [valorModal,setValorModal] = useState('')

    const cancelModal = () => {
        setTipoModal('')
        setIdSkin('')
        setIdModal('')
        setAutoIncrVenda('')
        setUrlModal('')
        setNomeModal('')
        setAutoIncrSeason('')
        setPriorModal('')
        setFimVigModal('')
        setInicioVigModal('')
        setCorTematica('')
        setIdTabuleiro('')
        setIdSeason('')
        setValorModal('')
        setUrlTabuleiro('')
        setNomeTabuleiro('')
        setEditingImage(false)
        setShowModal(false)
    }

    useEffect(()=> {
        console.log("CorTemática: ", corTematica)
        console.log("Nome: ", nomeTabuleiro)
        console.log("URL Tab: ", urlTabuleiro)
        console.log("Editing Image: ", editingImage)
        console.log("tipo Modal: ", tipoModal)
        console.log("InicVigencia Modal: ", inicioVigModal)
        console.log("FimVigModal Modal: ", fimVigModal)
        console.log("prioridade Modal: ", priorModal)
        console.log("IdTabuleiro Modal: ", idTabuleiro)
        console.log("Id Modal: ", idModal)
        console.log("idSeason Modal: ", idSeason)
        console.log("idSkin Modal: ", idSkin)
        console.log("valorModal Modal: ", valorModal)
    },[nomeTabuleiro, corTematica, idSkin, idSeason, valorModal, urlTabuleiro, editingImage, tipoModal, inicioVigModal, fimVigModal, priorModal, idTabuleiro, idModal])

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
        executaRequisicao('/isRemovivelTabuleiro','POST', {id: idTabuleiro}).then( res => {
            if(!res.data){
                console.log("Removivel Season?: ", res.data)
                window.alert("Não é possivel remover este Tabuleiro pois existem seasons vinculadas a ele!")
            }else{
                executaRequisicao('/removerTabuleiro','POST',{id: idTabuleiro}).then( res => {
                    console.log("Delete Response: ", res)
        
                    setIdTabuleiro('')
                    setCorTematica('')
                    setNomeTabuleiro('')
                    setUrlTabuleiro('')
        
                    setModalType('sucesso')
                    setTimeout( () => {
                        setModalType('')
                        setModalHeader('')
                        setShowModal(false)
                        getTabuleiros().then(res => {
                            setTabuleiros(res.data)
                        })
                    }, 2000)
                }).catch( err => {
                    console.log("Delete Error: ", err.response)
                    window.alert("Erro ao tentar deletar Tabuleiro: \n" + err.response.statusText)
                })
            }
        }).catch(err => {
            console.log("DB error: ", err)
            window.alert("Erro ao fazer validações!\nContate o Administrador do Banco de dados.")
        })
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
        executaRequisicao('/isRemovivelSkin','POST', {id: idModal}).then( res => {
            if(!res.data){
                console.log("Removivel Season?: ", res.data)
                window.alert("Não é possivel remover esta Skin pois existem vendas vinculadas a ela!")
            }else{
                executaRequisicao('/removerSkin','POST',{id: idModal}).then( res => {
                    console.log("Delete Response: ", res)
        
                    setIdModal('')
                    setUrlModal('')
                    setCorTematica('')
                    setNomeModal('')
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
                }).catch( err => {
                    console.log("Delete Error: ", err.response)
                    window.alert("Erro ao tentar deletar skin: \n" + err.response.statusText)
                })
            }
        }).catch(err => {
            console.log("DB error: ", err)
            window.alert("Erro ao fazer validações!\nContate o Administrador do Banco de dados.")
        })
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
        console.log("Tipo Skin: ", tipoModal)
        if(tipoModal===0){
            document.getElementById('radioOnca').setAttribute("checked", "checked")
        }else if(tipoModal===1){
            document.getElementById('radioCachorro').setAttribute("checked", "checked")
        }
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
            window.alert("Preencha todos os campos antes de cadastrar uma nova Season!")
            return
        }

        executaRequisicao('/isPeriodoDisponivelSeason','POST', {
            id: autoIncrSeason,
            inicio: inicioVigModal,
            fim: fimVigModal,
            prioridade: priorModal
        }).then( res => {
            if(!res.data){
                console.log("Check Season: ", res.data)
                window.alert("Existe outra Season no mesmo periodo/priodidade selecionados.\nPor favor, altere periodo/priridade e tente novamente!")
            }else{
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
                    window.alert("Erro durante cadastro no banco.\n Contate administrador do sistema.")
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
        })

    }

    const delSeasonModal = seasonToDel => {
        console.log("Skin to Delete: ", seasonToDel)

        setIdModal(seasonToDel.id)
        setNomeModal(seasonToDel.nomeSeason)
        setInicioVigModal(seasonToDel.inicioVigencia)
        setFimVigModal(seasonToDel.fimVigencia)
        setIdTabuleiro(seasonToDel.idTabuleiro)
        setPriorModal(seasonToDel.prioridade)

        setModalType('deleteSeason')
        setModalHeader('Excluir Season')
        setShowModal(true)
    }

    const deleteSeason = () => {
        executaRequisicao('/isRemovivelSeason','POST', { id: idModal }).then( res => {
            if(!res.data){
                console.log("Removivel Season?: ", res.data)
                window.alert("Não é possivel remover esta season pois existem vendas vinculadas a ela!")
            }else{
                executaRequisicao('/removerSeason','POST',{id: idModal}).then( res => {
                    console.log("Delete Response: ", res)
                    
                    setIdModal('')
                    setNomeModal('')
                    setInicioVigModal('')
                    setFimVigModal('')
                    setIdTabuleiro('')
                    setPriorModal('')
                    
                    setModalType('sucesso')
                    setTimeout( () => {
                        setModalType('')
                        setModalHeader('')
                        setShowModal(false)
                        getSeasons().then(res => {
                            setSeasons(res.data)
                        })
                    }, 2000)
                }).catch( err => {
                    console.log("Delete Error: ", err.response)
                    window.alert("Erro ao tentar deletar Season: \n" + err.response.statusText)
                })
            }
        }).catch(err => {
            console.log("DB error: ", err)
            window.alert("Erro ao fazer validações!\nContate o Administrador do Banco de dados.")
        })
    }

    const editSeasonModal = seasonToDel => {
        console.log("Skin to Edit: ", seasonToDel)

        setIdModal(seasonToDel.id)
        setNomeModal(seasonToDel.nomeSeason)
        setInicioVigModal(seasonToDel.inicioVigencia)
        setFimVigModal(seasonToDel.fimVigencia)
        setIdTabuleiro(seasonToDel.idTabuleiro)
        setPriorModal(seasonToDel.prioridade)

        setModalType('editSeason')
        setModalHeader('Edição de Season')
        setShowModal(true)
    }

    const saveSeasonEdit = () => {
        executaRequisicao('/isPeriodoDisponivelSeason','POST', {
            id: idModal,
            inicio: inicioVigModal,
            fim: fimVigModal,
            prioridade: priorModal
        }).then( res => {
            if(!res.data){
                console.log("Check Season: ", res.data)
                window.alert("Existe outra Season no mesmo periodo/priodidade selecionados.\nPor favor, altere periodo/priridade e tente novamente!")
            }else{
                executaRequisicao('/alterarSeason','POST',{
                    id: idModal,
                    nome: nomeModal,
                    inicioVigencia: inicioVigModal,
                    fimVigencia: fimVigModal,
                    idTabuleiro,
                    prioridade: priorModal
                }).then(res => {
                    console.log("Response BD: ", res)
                    
                    setIdModal('')
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
                    window.alert("Erro ao alterar Season.\n Contate administrador do sistema.")
                    
                    setIdModal('')
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
        }).catch(err => {
            console.log("DB error: ", err)
            window.alert("Erro ao fazer validações!\nContate o Administrador do Banco de dados.")
        })
    }

    const novaVenda = () => {
        setModalType('newVenda')
        setModalHeader('Cadastrar Venda')
        setShowModal(true)
        executaRequisicao('/autoIncrementVenda','GET').then(res => {
            setAutoIncrVenda(res.data[0].AUTO_INCREMENT)
        })
    }

    const cadastrarVenda = () => {
        if(valorModal==='' || idSeason==='' || idSkin==='' ){
            window.alert("Preencha todos os campos antes de cadastrar uma nova Venda!")
            return
        }

        executaRequisicao('/inserirVenda','POST',{
            valor: valorModal,
            idSeason,
            idSkin
        }).then(res => {
            console.log("Response BD: ", res)

            setValorModal('')
            setIdSeason('')
            setIdSkin('')

            setModalType('sucesso')
            setTimeout(() => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getVendas().then(res => {
                    setVendas(res.data)
                })
            },2000)
        })
        .catch(error => {
            console.log('error', error)
            window.alert("Erro ao cadastrar Venda.\n Contate administrador do sistema.")
            
            setValorModal('')
            setIdSeason('')
            setIdSkin('')

            setModalType('')
            setModalHeader('')
            setShowModal(false)
        });
    }

    const delVendaModal = vendaToDel => {
        console.log("Skin to Delete: ", vendaToDel)

        setIdModal(vendaToDel.id)
        setValorModal(vendaToDel.valor)
        setIdSeason(vendaToDel.idSeason)
        setIdSkin(vendaToDel.idSkin)

        setModalType('deleteVenda')
        setModalHeader('Excluir Venda')
        setShowModal(true)
    }

    const deleteVenda = () => {
        executaRequisicao('/removerVenda','POST',{id: idModal}).then( res => {
            console.log("Delete Response: ", res)

            setIdModal('')
            setValorModal('')
            setIdSeason('')
            setIdSkin('')

            setModalType('sucesso')
            setTimeout( () => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getVendas().then(res => {
                    setVendas(res.data)
                })
            }, 2000)
        }).catch( err => {
            console.log("Delete Error: ", err.response)
            window.alert("Erro ao tentar deletar Venda: \n" + err.response.statusText)
        })
    }

    const editVendaModal = vendaToEdit => {
        console.log("Skin to Edit: ", vendaToEdit)

        setIdModal(vendaToEdit.id)
        setValorModal(vendaToEdit.valor)
        setIdSeason(vendaToEdit.idSeason)
        setIdSkin(vendaToEdit.idSkin)

        setModalType('editVenda')
        setModalHeader('Edição de Venda')
        setShowModal(true)
    }

    const saveVendaEdit = () => {
        executaRequisicao('/alterarVenda','POST',{
            id: idModal,
            valor: valorModal,
            idSeason,
            idSkin
        }).then(res => {
            console.log("Response BD: ", res)
            
            setIdModal('')
            setValorModal('')
            setIdSeason('')
            setIdSkin('')

            setModalType('sucesso')
            setTimeout(() => {
                setModalType('')
                setModalHeader('')
                setShowModal(false)
                getVendas().then(res => {
                    setVendas(res.data)
                })
            },2000)
        })
        .catch(error => {
            console.log('error', error)
            window.alert("Erro ao alterar Season.\n Contate administrador do sistema.")
            
            setIdModal('')
            setValorModal('')
            setIdSeason('')
            setIdSkin('')
            
            setModalType('')
            setModalHeader('')
            setShowModal(false)
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
                                <th>Imagem</th>
                                <th>Cor Temática</th>
                                <th>Data de Criação</th>
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
                                            <button className='delete' onClick={() => delSeasonModal(season)}>
                                                <BsTrash />
                                            </button>
                                            <button className='edit' onClick={() => editSeasonModal(season)}>
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
                    <button onClick={novaVenda}>Nova Venda</button>
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
                                            <button className='delete' onClick={() => delVendaModal(venda)}>
                                                <BsTrash />
                                            </button>
                                            <button className='edit' onClick={() => editVendaModal(venda)}>
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

                            <p>Tipo da peça:</p>
                            <div className='tipoPeçaRadio' >
                                <div><input type="radio" value={0} name="peca" id='radioOnca' onChange={e => setTipoModal(e.target.value)} /> Onça</div>
                                <div><input type="radio" value={1} name="peca" id='radioCachorro' onChange={e => setTipoModal(e.target.value)} /> Cachorro</div>
                            </div>

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
                    : modalType === 'newSeason' ?
                        <div className='modalBody'>
                            <Input 
                                inputType="text"
                                inputName="nome-season"
                                inputPlaceholder="Nome da Season"
                                value={nomeModal}
                                setValue={setNomeModal}
                            />

                            <div className='vigSeason'>
                                <div className='seasonDate'>
                                    <p>Inicio da Season: </p>
                                    <Form.Control
                                        type="date"
                                        id="corTematicaInput"
                                        defaultValue="2021-12-31"
                                        title="Choose your color"
                                        onChange={newColor => {
                                            setInicioVigModal(newColor.target.value)
                                        }}
                                    />
                                </div>

                                <div className='seasonDate'>
                                    <p>Fim da Season: </p>
                                    <Form.Control
                                        type="date"
                                        id="corTematicaInput"
                                        defaultValue="2021-12-31"
                                        title="Choose your color"
                                        onChange={newColor => {
                                            setFimVigModal(newColor.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <Dropdown onSelect={e => setIdTabuleiro(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selecione o Tabuleiro
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {tabuleiros.map(tab => {
                                        return <Dropdown.Item eventKey={tab.id}>{tab.nomeTabuleiro}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                            <input type='number' id='selectPrior' placeholder='Selecione Prioridade' onChange={e => setPriorModal(e.target.value)}/>
                        </div>
                    : modalType === 'deleteSeason' ?
                        <div className='modalBody'>
                            <p>{nomeModal}</p>

                            <div className='vigSeason'>
                                <div className='seasonDate'>
                                    <p>Inicio da Season: </p>
                                    <Form.Control
                                        type="date"
                                        id="corTematicaInput"
                                        defaultValue={inicioVigModal}
                                        title="Choose your color"
                                        disabled={true}
                                    />
                                </div>

                                <div className='seasonDate'>
                                    <p>Fim da Season: </p>
                                    <Form.Control
                                        type="date"
                                        id="corTematicaInput"
                                        defaultValue={fimVigModal}
                                        title="Choose your color"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            
                            <p>Id Tabuleiro: {idTabuleiro}</p>

                            <p>Prioridade: {priorModal}</p>
                        </div>
                    : modalType === 'editSeason' ?
                        <div className='modalBody'>
                            <Input 
                                inputType="text"
                                inputName="nome-season"
                                inputPlaceholder="Nome da Season"
                                value={nomeModal}
                                setValue={setNomeModal}
                            />

                            <div className='vigSeason'>
                                <div className='seasonDate'>
                                    <p>Inicio da Season: </p>
                                    <Form.Control
                                        type="date"
                                        id="corTematicaInput"
                                        defaultValue={inicioVigModal}
                                        title="Choose your color"
                                        onChange={newColor => {
                                            setInicioVigModal(newColor.target.value)
                                        }}
                                    />
                                </div>

                                <div className='seasonDate'>
                                    <p>Fim da Season: </p>
                                    <Form.Control
                                        type="date"
                                        id="corTematicaInput"
                                        defaultValue={fimVigModal}
                                        title="Choose your color"
                                        onChange={newColor => {
                                            setFimVigModal(newColor.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <Dropdown onSelect={e => setIdTabuleiro(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selecione o Tabuleiro
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {tabuleiros.map(tab => {
                                        return <Dropdown.Item eventKey={tab.id}>{tab.nomeTabuleiro}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                            <input type='number' id='selectPrior' placeholder='Selecione Prioridade' value={priorModal} onChange={e => setPriorModal(e.target.value)}/>
                        </div>
                    : modalType === 'newVenda' ?
                        <div className='modalBody'>
                            <input type='number' id='selectValor' placeholder='Selecione Valor' onChange={e => setValorModal(e.target.value)}/>
                            
                            <Dropdown className='dropDown' onSelect={e => setIdSeason(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selecione a Season
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {seasons.map(season => {
                                        return <Dropdown.Item eventKey={season.id}>{season.nomeSeason}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className='dropDown' onSelect={e => setIdSkin(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selecione a Skin
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {skins.map(skin => {
                                        return <Dropdown.Item eventKey={skin.id}>{skin.nomeSkin}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    : modalType === 'deleteVenda' ?
                        <div className='modalBody'>
                            <h3>Valor: <p>{valorModal}</p></h3>
                            <h3>ID Season: <p>{idSeason}</p></h3>
                            <h3>ID Skin: <p>{idSkin}</p></h3>
                        </div>
                    : modalType === 'editVenda' ?
                        <div className='modalBody'>
                            <input type='number' id='selectValor' placeholder='Selecione Valor' value={valorModal} onChange={e => setValorModal(e.target.value)}/>
                            
                            <Dropdown className='dropDown' onSelect={e => setIdSeason(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selecione a Season
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {seasons.map(season => {
                                        return <Dropdown.Item eventKey={season.id}>{season.nomeSeason}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className='dropDown' onSelect={e => setIdSkin(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selecione a Skin
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {skins.map(skin => {
                                        return <Dropdown.Item eventKey={skin.id}>{skin.nomeSkin}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
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
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar</button>
                        </div>
                    : modalType==='deleteTabuleiro' ?
                        <div className='modalFooter'>
                            <button className='cancelBtn' onClick={deleteTabuleiro}>Excluir Tabuleiro</button>
                            <button onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'editTabuleiro' ?
                        <div className='modalFooter'>
                            <button onClick={saveTabEdit}>Salvar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'newSkin' ?
                        <div className='modalFooter'>
                            <button onClick={cadastrarSkin}>Cadastrar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar</button>
                        </div>
                    : modalType === 'deleteSkin' ?
                        <div className='modalFooter'>
                            <button className='cancelBtn' onClick={deleteSkin}>Excluir Skin</button>
                            <button onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'editSkin' ?
                        <div className='modalFooter'>
                            <button onClick={saveSkinEdit}>Salvar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'newSeason' ?
                        <div className='modalFooter'>
                            <button onClick={cadastrarSeason}>Cadastrar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'deleteSeason' ?
                        <div className='modalFooter'>
                            <button className='cancelBtn' onClick={deleteSeason}>Excluir Season</button>
                            <button onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'editSeason' ?
                        <div className='modalFooter'>
                            <button onClick={saveSeasonEdit}>Salvar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'newVenda' ?
                        <div className='modalFooter'>
                            <button onClick={cadastrarVenda}>Cadastrar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'deleteVenda' ?
                        <div className='modalFooter'>
                            <button className='cancelBtn' onClick={deleteVenda}>Excluir Venda</button>
                            <button onClick={cancelModal}>Cancelar Operação</button>
                        </div>
                    : modalType === 'editVenda' ?
                        <div className='modalFooter'>
                            <button onClick={saveVendaEdit}>Salvar</button>
                            <button className='cancelBtn' onClick={cancelModal}>Cancelar Operação</button>
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