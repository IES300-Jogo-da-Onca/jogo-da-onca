import React, { useEffect, useState, useContext } from 'react';
import { Headers } from '../components/Headers';
import { UserContext } from '../context/UserContext';
import { executaRequisicao } from '../services/api';
import {Modal} from 'react-bootstrap';
import pagIcon from '../assets/icons/pag-sucesso.png';
import Spinner from 'react-bootstrap/Spinner';

export const Loja= () => {

    //Skin a ser comprada
    const [skinToBuy, setSkinToBuy] = useState({})
    const [skins, setSkins] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [confirmedBuy, setConfirmedBuy] = useState(false);
    const [onLoading, setOnLoading] = useState(false)
    const {userInfo, setUserInfo} = useContext(UserContext)

    const getSkinsUsuario = () => {
        return executaRequisicao('/skins', 'GET')
            .catch(console.error)
    }

    const getSkinsLoja = () => {
        return executaRequisicao('/loja', 'GET')
    }

    const handleBuySkin = buy => {
        if(buy) {
            setOnLoading(true)
            buySkin(skinToBuy.idSkin)
            return
        }
        setSkinToBuy({})
        setShowModal(false)
    }

    const buySkin = (idSkinToBuy) => {
        executaRequisicao('/comprarskin', 'POST', { idSkin: idSkinToBuy })
        .then( res => {
            console.log("Response: ", res)
            if(res.data.comprouSkin){
               console.log("Response: ", res, '\nData: ', res.data)
               setOnLoading(false)
               setConfirmedBuy(true)
               setTimeout(() => {
                   setConfirmedBuy(false)
                   setSkinToBuy({})
                   setShowModal(false)
               }, 2000)
               setSkins(skins.filter(skin => skin.idSkin !== idSkinToBuy))
               setUserInfo({...userInfo, moedas: res.data.moedas})
            }
        })
        .catch( err => {
            window.alert(err.response.data.mensagem)
            setShowModal(false)
            setOnLoading(false)
            setSkinToBuy({})
        })
    }
    
    useEffect(() => {
        getSkinsUsuario().then( skinsUser => {
            getSkinsLoja().then( response => {
                const allSkinsLoja = response.data.data
                setSkins(allSkinsLoja.filter( skin => skinsUser.data.every(uSkin => uSkin.id !== skin.idSkin)))
            })
        })
    },[])

    return (
        <div className='container-generic'>
            <Headers />
            <div className='bodyLoja'>
                <h2>Onças:</h2>
                <div className='skinsContainer'>
                    {
                        skins.map( s => {
                            if(s.onça){
                                return <div className='skin' key={s.idSkin}>
                                    <img src={s.skinImg}/>
                                    <div className='skinInfo'>
                                        <h4>{s.skinName}</h4>
                                    </div>
                                    <div className='skinPreco'>
                                        <span>${s.precoSkin}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            setSkinToBuy({
                                                'idSkin': s.idSkin,
                                                'skinImg': s.skinImg,
                                                'skinName': s.skinName,
                                                'precoSkin': s.precoSkin
                                            })
                                            setShowModal(true)
                                        }}>Comprar</button>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
                <h2>Cachorros:</h2>
                <div className='skinsContainer'>
                    {
                        skins.map( s => {
                            if(!s.onça){
                                return <div className='skin' key={s.idSkin}>
                                    <img src={s.skinImg}/>
                                    <div className='skinInfo'>
                                        <h4>{s.skinName}</h4>
                                    </div>
                                    <div className='skinPreco'>
                                        <span>${s.precoSkin}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            //buySkin(s.idSkin)
                                            setSkinToBuy({
                                                'idSkin': s.idSkin,
                                                'skinImg': s.skinImg,
                                                'skinName': s.skinName,
                                                'precoSkin': s.precoSkin
                                            })
                                            setShowModal(true)
                                        }}>Comprar</button>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
            <Modal className="confirm-buy" show={showModal} onHide={() => setShowModal(false)}
                backdrop="static" keyboard={false}>
                <Modal.Header>
                    <h3>Confirmar Aquisição</h3>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    {onLoading ?
                        <Spinner animation="border" variant="success" />
                        : confirmedBuy ?
                            <div>
                                <h1>Compra realizada com sucesso!</h1>
                                <img src={pagIcon}></img> 
                            </div> 
                            :
                            <div>
                                <p>Deseja realmente comprar a seguinte skin?</p>
                                <div className='skin' key={skinToBuy.idSkin}>
                                    <img src={skinToBuy.skinImg}/>
                                    <div className='skinInfo'>
                                        <h4>{skinToBuy.skinName}</h4>
                                    </div>
                                    <div className='skinPreco'>
                                        <span>${skinToBuy.precoSkin}</span>
                                    </div>
                                </div>
                                <button className="btn-confirma" variant="secondary" onClick={() => handleBuySkin(true)}>
                                    Confirmar
                                </button>
                                <button className="btn-cancela" variant="secondary" onClick={() => handleBuySkin(false)}>
                                    Cancelar
                                </button>
                            </div>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}