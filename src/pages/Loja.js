import React, { useEffect, useState } from 'react';
import { Headers } from '../components/Headers';
import { executaRequisicao } from '../services/api'

export const Loja= () => {

    const [skins, setSkins] = useState([])
    //Array Provisário que representa a Array que receberemos do Banco com todas as Skins Disponíveis
    const getSkinsLoja = () => {
        return executaRequisicao('/loja', 'GET')
    }
    
    useEffect(() => {
        getSkinsLoja().then( response => {
            console.log(response.data.data)
            setSkins(response.data.data)
            console.log(skins)
        })
    },[])
    
    // let skins = [
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: oncaClassica,
    //         precoSkin: 8,
    //         onça: true
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: oncaClassica,
    //         precoSkin: 8,
    //         onça: true
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: dogClassico,
    //         precoSkin: 8,
    //         onça: false
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: oncaClassica,
    //         precoSkin: 8,
    //         onça: true
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: dogClassico,
    //         precoSkin: 8,
    //         onça: false
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: dogClassico,
    //         precoSkin: 8,
    //         onça: false
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: oncaClassica,
    //         precoSkin: 8,
    //         onça: true
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: dogClassico,
    //         precoSkin: 8,
    //         onça: false
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: oncaClassica,
    //         precoSkin: 8,
    //         onça: true
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: dogClassico,
    //         precoSkin: 8,
    //         onça: false
    //     },
    //     {
    //         skinName: 'Onça Clássica',
    //         skinImg: oncaClassica,
    //         precoSkin: 8,
    //         onça: true
    //     },
    // ]

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
                                        <button>Comprar</button>
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
                                return <div className='skin'>
                                    <img src={s.skinImg}/>
                                    <div className='skinInfo'>
                                        <h4>{s.skinName}</h4>
                                    </div>
                                    <div className='skinPreco'>
                                        <span>${s.precoSkin}</span>
                                    </div>
                                    <div>
                                        <button>Comprar</button>
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