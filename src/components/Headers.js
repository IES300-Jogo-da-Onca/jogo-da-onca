import React, {useEffect} from 'react';
import logo from '../assets/icons/onca-sem-fundo.png';
import sairIcon from '../assets/icons/sairIcon.png';
import coinIcon from '../assets/icons/coinIcon.png';

import {Link, useLocation, useNavigate } from 'react-router-dom';
import { executaRequisicao } from '../services/api';

export const Headers = props => {

    let userName = 'Nome Usuário' //Provisório até que tenhamos conexão com o banco
    let minhasMoedas = 0 //Provisório até que tenhamos conexão com o banco
    const navigate = useNavigate()
    const location  = useLocation () 

    useEffect(()=>{
        const newMenu = document.querySelector(`a[href='${location.pathname}'] h2`) || document.querySelector(`a[href='${location.pathname}'] p`)
        newMenu.classList.add('selected')
    }, [location])
    const logout = async () => {
        try {
            await executaRequisicao('/logout', 'GET')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className='header'>
            <div className='navContainer'>
                <img 
                    src={logo}
                />
                <nav className='navigation'>
                    <ul>
                        <li>
                            <Link to='/home'><h2>Tabuleiro</h2></Link>
                        </li>
                        <li>
                            <Link to='/loja'><h2>Loja de Skins</h2></Link>
                        </li>
                        <li>
                            <Link to='/comprarMoedas'><img className='coin' src={coinIcon}/><h2>Comprar Moedas</h2></Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='headerRight'>
                <div className='nameMoney'>
                    <Link to='/perfil'><p id='username'>{userName}</p></Link>
                    <p id='minhasMoedas'>Moedas: ${minhasMoedas}</p>
                </div>
                <div className='sair' onClick={logout}>
                        <img src={sairIcon}/>
                        <p>Sair</p>
                </div>
            </div>
        </div>
    );
}