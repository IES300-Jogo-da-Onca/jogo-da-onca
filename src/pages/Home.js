import React from 'react';
import logo from '../assets/icons/onca-sem-fundo.png';
import sairIcon from '../assets/icons/sairIcon.png';
import coinIcon from '../assets/icons/coinIcon.png';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';

export const Home= () => {

    let userName = 'Super User' //Provisório até que tenhamos conexão com o banco
    let minhasMoedas = 0 //Provisório até que tenhamos conexão com o banco

    return (
        <div className='container-home'>
            <div className='header'>
                <div className='navContainer'>
                    <img 
                        src={logo}
                    />
                    <nav className='navigation'>
                        <ul>
                            <li>
                                <a href='/home'><h2>Tabuleiro</h2></a>
                            </li>
                            <li>
                                <a href='/loja'><h2>Loja de Skins</h2></a>
                            </li>
                            <li>
                                <a href='/comprarMoedas'><img className='coin' src={coinIcon}/><h2>Comprar Moedas</h2></a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='headerRight'>
                    <div className='nameMoney'>
                        <a><p>{userName}</p></a>
                        <p>Moedas: ${minhasMoedas}</p>
                    </div>
                    <div className='sair'>
                        <a href='/'>
                            <img src={sairIcon}/>
                            <p>Sair</p>
                        </a>
                    </div>
                </div>
            </div>
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