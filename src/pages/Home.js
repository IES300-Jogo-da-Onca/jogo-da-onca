import React from 'react';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';
import { Headers } from '../components/Headers';

export const Home= () => {

    return (
        <div className='container-generic'>
            <Headers />
            <div className='body'>
                <div className='optArea'>
                    <button>Iniciar Jogo!</button>
                </div>
                <div className='tabuleiroArea'>
                    <img src={tabuleiro}/>
                </div>
            </div>
        </div>
    );
}