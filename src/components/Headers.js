import React, { useEffect, useContext, useState } from 'react';
import logo from '../assets/icons/onca-sem-fundo.png';
import sairIcon from '../assets/icons/sairIcon.png';
import coinIcon from '../assets/icons/coinIcon.png';
import burgerMenu from '../assets/icons/menuburger.png';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { executaRequisicao } from '../services/api';
import { UserContext } from '../context/UserContext';

export const Headers = props => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [superUser, setSuperUser] = useState(true)

    useEffect(() => {
        const newMenu = document.querySelector(`a[href='${location.pathname}'] h2`) || document.querySelector(`a[href='${location.pathname}'] p`)
        newMenu.classList.add('selected')
        setUserInfo(JSON.parse(localStorage.getItem("loggedUser")))
        setSuperUser(JSON.parse(localStorage.getItem("userData")).ehSuperUser  || 0)
    }, [location])

    const logout = async () => {
        try {
            await executaRequisicao('/logout', 'GET')
            localStorage.clear()
            navigate('/')
            console.log("LocalStorage: ", localStorage)
        } catch (error) {
            console.log(error)
        }
    }

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='header'>
            <div className='navContainer'>
                <img className='header-logo'
                    src={logo}
                />
                <img className='mobile-menu'
                    src={burgerMenu}
                    alt="burger-menu" onClick={evento => setShowMenu(!showMenu)}
                />
                <nav className='navigation-default'>
                    <ul>
                        <li>
                            <Link to='/home'><h2>Tabuleiro</h2></Link>
                        </li>
                        <li>
                            <Link to='/loja'><h2>Loja de Skins</h2></Link>
                        </li>
                        <li>
                            <Link to='/comprarMoedas'><img className='coin' src={coinIcon} /><h2>Comprar Moedas</h2></Link>
                        </li>
                        { superUser? 
                            <li>
                                <Link to='/gerenciador'><h2>Gerenciar Jogo</h2></Link>
                            </li> 
                        :
                            <div></div>
                        }
                    </ul>
                </nav>

                <div className='headerRight-default'>
                    <div className='nameMoney'>
                        <Link to='/perfil'><p id='username'>{userInfo.nome}</p></Link>
                        <p id='minhasMoedas'>Moedas: ${userInfo.moedas}</p>
                    </div>
                    <div className='sair' onClick={logout}>
                        <img src={sairIcon} />
                        <p>Sair</p>
                    </div>
                </div>
            </div>
            {showMenu === true && (
                <div className='burger-wrap'>
                    <nav className='navigation-burger'>
                        <ul>
                            <li>
                                <Link to='/home'><h2>Tabuleiro</h2></Link>
                            </li>
                            <li>
                                <Link to='/loja'><h2>Loja de Skins</h2></Link>
                            </li>
                            <li>
                                <Link to='/comprarMoedas'><h2>Comprar Moedas</h2></Link>
                            </li>
                        </ul>
                    </nav>

                    <div className='headerRight-burger'>
                        <div className='nameMoney'>
                            <Link to='/perfil'><p id='username'>Perfil</p></Link>
                            <p id='minhasMoedas'>Moedas: ${userInfo.moedas}</p>
                        </div>
                        <div className='sair' onClick={logout}>
                            <img src={sairIcon} />
                            <p>Sair</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}