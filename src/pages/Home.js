import {useState, useEffect} from 'react';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';
import { Headers } from '../components/Headers';
import { Tabuleiro } from './Tabuleiro';
import{io} from "socket.io-client"

export const Home= () => {
    const socket_url = process.env.REACT_APP_WS_URL
    const [socket, setSocket] = useState(io(socket_url, {withCredentials: true}))
    const [sala, setSala] = useState('')
    const [cachorrosAbatidos, setCachorrosAbatidos] = useState(0)
    const [criouSala, setCriouSala] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [dadosPartida, setDadosPartida] = useState({})
    const criarSala = () => {
        socket.emit('novaSala')
    }

    const joinSala = () => {
        socket.emit('joinSala', sala)
    }

    useEffect(() => {
        
        socket.on('serverNovaSala', data => {
            setSala(data.idSala)
            setCriouSala(true)
        })
        socket.on('serverJoinSala', data => {
            
        })
        // TODO: criar evento para sair da sala antes da partida começar
        socket.on('serverIniciarJogo', data => {
            console.log('serverIniciarJogo', data)
            let dadosIniciais = {
                vetorTabuleiro: data.vetorTabuleiro,
                ehCachorro: data.ehCachorro,
                turnoPeca: data.turnoPeca,
                socket
            }
            if(data['skinCachorro']) dadosIniciais['skinCachorro'] = data['skinCachorro']
            if(data['skinOnca']) dadosIniciais['skinOnca'] = data['skinOnca']
            if(data['skinTabuleiro']) dadosIniciais['skinTabuleiro'] = data['skinTabuleiro']
            setDadosPartida(dadosIniciais)
            setIsPlaying(true)

        })
        socket.on('error', data => console.error(data))
    }, [socket])
    return (
        <div className='container-generic'>
            <Headers />
            <div className='body'>
                <div className='optArea'>
                    { !criouSala && !isPlaying && 
                        <div className='salaOpts'>
                            <button  onClick={criarSala}>Criar sala!</button> 
                            <div className='entratSala'>
                                <h3>Entrar em sala existente:</h3>
                                <input value={sala} onChange={(e) => setSala(e.target.value)}/>
                                <button onClick={joinSala}>Entrar</button>
                            </div>
                        </div>
                    }
                    { criouSala && !isPlaying &&  
                    <div className='salaCriada'>
                        <h3>Id da Sala Criada:</h3>
                        <input disabled value={sala}></input>
                    </div>
                    }
                    { isPlaying &&
                        <div className='optPlaying'>
                            <h1>{cachorrosAbatidos}</h1>
                            <h2>Cachorros Abatidos</h2>
                        </div>
                    }
                </div>
                <div className='tabuleiroArea'>
                    {!isPlaying && <img src={tabuleiro}/>}
                    {isPlaying && <Tabuleiro {...dadosPartida} />           }
                </div>
            </div>
        </div>
    );
}