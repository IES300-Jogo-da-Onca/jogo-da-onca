import React, {useEffect} from 'react';
import logo from '../assets/icons/onca-sem-fundo.png';
import sairIcon from '../assets/icons/sairIcon.png';
import coinIcon from '../assets/icons/coinIcon.png';

import {useLocation } from 'react-router-dom';

export const Headers = props => {

    let userName = 'Super User' //Provisório até que tenhamos conexão com o banco
    let minhasMoedas = 0 //Provisório até que tenhamos conexão com o banco

    const location  = useLocation () 

    useEffect(()=>{
        const newMenu = document.querySelector(`a[href='${location.pathname}'] h2`) || document.querySelector(`a[href='${location.pathname}'] p`)
        newMenu.classList.add('selected')
    }, [location])

    return(
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
                    <a href='/perfil'><p id='username'>{userName}</p></a>
                    <p id='minhasMoedas'>Moedas: ${minhasMoedas}</p>
                </div>
                <div className='sair'>
                    <a href='/'>
                        <img src={sairIcon}/>
                        <p>Sair</p>
                    </a>
                </div>
            </div>
        </div>
    );
}