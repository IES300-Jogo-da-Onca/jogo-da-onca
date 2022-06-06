import React, { useEffect, useState, useContext } from 'react';
import { Headers } from '../components/Headers';
import { UserContext } from '../context/UserContext';
import { executaRequisicao } from '../services/api';

export const Loja= () => {

    const [skins, setSkins] = useState([])
    const {userInfo, setUserInfo} = useContext(UserContext)
    const getSkinsLoja = () => {
        return executaRequisicao('/loja', 'GET')
    }

    const buySkin = (idSkinToBuy) => {
        executaRequisicao('/comprarskin', 'POST', { idSkin: idSkinToBuy })
        .then( res => {
           if(res.data.comprouSkin){
               alert('Compra realizada com sucesso')
               setSkins(skins.filter(skin => skin.idSkin !== idSkinToBuy))
               setUserInfo({...userInfo, moedas: res.data.moedas})
           }
        })
        .catch( err => window.alert("Erro na requisição.\nContate Administrador."))
    }
    
    useEffect(() => {
        getSkinsLoja().then( response => {
            setSkins(response.data.data)
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
                                            buySkin(s.idSkin)
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
                                            buySkin(s.idSkin)
                                        }}>Comprar</button>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}