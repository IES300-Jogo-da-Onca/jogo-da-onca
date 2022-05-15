import React from 'react';
import { Headers } from '../components/Headers';
import coinIcon1 from '../assets/icons/coin1.png';
import coinIcon2 from '../assets/icons/coin2.png';
import coinIcon3 from '../assets/icons/coin3.png';
import coinIcon4 from '../assets/icons/coin4.png';
import coinIcon5 from '../assets/icons/coin5.png';
import coinIcon6 from '../assets/icons/coin6.png';
import coinIcon7 from '../assets/icons/coin7.png';

export const ComprarMoedas = () => {

    const moedas = [
        {
            moedaValor: '$10',
            moedaImg: coinIcon1,
            preçoMoeda: 10,
            moeda: true
        },
        {
            moedaValor: '$20',
            moedaImg: coinIcon2,
            preçoMoeda: 20,
            moeda: true
        },
        {
            moedaValor: '$50',
            moedaImg: coinIcon3,
            preçoMoeda: 50,
            moeda: true
        },
        {
            moedaValor: '$100',
            moedaImg: coinIcon4,
            preçoMoeda: 100,
            moeda: true
        },
        {
            moedaValor: '$200',
            moedaImg: coinIcon5,
            preçoMoeda: 200,
            moeda: true
        },
        {
            moedaValor: '$500',
            moedaImg: coinIcon6,
            preçoMoeda: 500,
            moeda: true
        },
        {
            moedaValor: '$1000',
            moedaImg: coinIcon7,
            preçoMoeda: 1000,
            moeda: true
        },
    ]
    return(
        <div className='container-generic'>
            <Headers />
            <div className='bodyMoedas'>
                <br></br>
                <div className='moedasContainer'>
                    {
                        moedas.map( m => {
                            if(m.moeda){
                                return <div className='moeda'>
                                            <img src={m.moedaImg}/>
                                            <div className='moedaInfo'>
                                                <h4>{m.moedaValor}</h4>
                                             </div>
                                            <div className='moedaPreco'>
                                            <span>R${m.preçoMoeda}</span>
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