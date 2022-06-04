import React from 'react';
import { Headers } from '../components/Headers';
import oncaClassica from '../assets/icons/onçaClássicaPeça.svg'
import dogClassico from '../assets/icons/dogClassicoPeça.svg'
import { executaRequisicao } from '../services/api'

export const Loja= () => {

    //Array Provisário que representa a Array que receberemos do Banco com todas as Skins Disponíveis
    const skins = [
        {
            skinName: 'Onça Clássica',
            skinImg: oncaClassica,
            preçoSkin: 8,
            onça: true
        },
        {
            skinName: 'Onça Clássica',
            skinImg: oncaClassica,
            preçoSkin: 8,
            onça: true
        },
        {
            skinName: 'Onça Clássica',
            skinImg: dogClassico,
            preçoSkin: 8,
            onça: false
        },
        {
            skinName: 'Onça Clássica',
            skinImg: oncaClassica,
            preçoSkin: 8,
            onça: true
        },
        {
            skinName: 'Onça Clássica',
            skinImg: dogClassico,
            preçoSkin: 8,
            onça: false
        },
        {
            skinName: 'Onça Clássica',
            skinImg: dogClassico,
            preçoSkin: 8,
            onça: false
        },
        {
            skinName: 'Onça Clássica',
            skinImg: oncaClassica,
            preçoSkin: 8,
            onça: true
        },
        {
            skinName: 'Onça Clássica',
            skinImg: dogClassico,
            preçoSkin: 8,
            onça: false
        },
        {
            skinName: 'Onça Clássica',
            skinImg: oncaClassica,
            preçoSkin: 8,
            onça: true
        },
        {
            skinName: 'Onça Clássica',
            skinImg: dogClassico,
            preçoSkin: 8,
            onça: false
        },
        {
            skinName: 'Onça Clássica',
            skinImg: oncaClassica,
            preçoSkin: 8,
            onça: true
        },
    ]

    const getSkinsLoja = () => {
        return executaRequisicao('/loja', 'GET')
    }
    getSkinsLoja().then( response => {
        console.log(response.data.data)
    })

    return (
        <div className='container-generic'>
           <Headers />
           <div className='bodyLoja'>
                <h2>Onças:</h2>
                <div className='skinsContainer'>
                    {
                        skins.map( s => {
                            if(s.onça){
                                return <div className='skin' key={s.index}>
                                    <img src={s.skinImg}/>
                                    <div className='skinInfo'>
                                        <h4>{s.skinName}</h4>
                                    </div>
                                    <div className='skinPreco'>
                                        <span>${s.preçoSkin}</span>
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
                                        <span>${s.preçoSkin}</span>
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
    );
}