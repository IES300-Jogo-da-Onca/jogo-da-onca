import {useState, useEffect, useRef} from 'react';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';
import { Headers } from '../components/Headers';
import { Tabuleiro } from './Tabuleiro';
import{io} from "socket.io-client"
import { executaRequisicao } from '../services/api';

export const Home= () => {
    const socket_url = process.env.REACT_APP_WS_URL
    const socket = useRef()

    const [sala, setSala] = useState('')
    const [salasDisponiveis, setSalasDisponiveis] = useState([])
    const [criouSala, setCriouSala] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [dadosPartida, setDadosPartida] = useState({})
    const criarSala = () => {
        socket.current.emit('novaSala')
    }

    const joinSala = () => {
        socket.current.emit('joinSala', sala)
    }
    const atualizaSalasDisponiveis = async () => {
        executaRequisicao('/salasDisponiveis', 'GET')
        .then( resp => setSalasDisponiveis(resp.data))
        .catch(console.error)
    }

    useEffect(() => {
        socket.current = io(socket_url, {withCredentials: true})
        atualizaSalasDisponiveis()
        socket.current.on('serverNovaSala', data => {
            setSala(data.idSala)
            setCriouSala(true)
        })
        socket.current.on('serverNovaSala', data => {
            setSala(data.idSala)
            setCriouSala(true)
        })
        socket.current.on('serverSalasDisponiveis', salas => {
            console.log('salas disponiveis', salas)
            setSalasDisponiveis(salas)
        })
        // TODO: criar evento para sair da sala antes da partida começar
        socket.current.on('serverIniciarJogo', data => {
            console.log('serverIniciarJogo', data)
            let dadosIniciais = {
                vetorTabuleiro: data.vetorTabuleiro,
                ehCachorro: data.ehCachorro,
                turnoPeca: data.turnoPeca,
                socket: socket.current
            }
            if(data['skinCachorro']) dadosIniciais['skinCachorro'] = data['skinCachorro']
            if(data['skinOnca']) dadosIniciais['skinOnca'] = data['skinOnca']
            if(data['skinTabuleiro']) dadosIniciais['skinTabuleiro'] = data['skinTabuleiro']
            setDadosPartida(dadosIniciais)
            setIsPlaying(true)
        })
        socket.current.on('error', data => console.error(data))
    }, [])
    return (
        <div className='container-generic'>
            <Headers />
            <div className='body'>
                <div className='optArea' style={{flexDirection: 'column'}}>
                    <textarea  cols="30" rows="10" value={JSON.stringify(salasDisponiveis)}></textarea>
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
                            <h1 id="placar">0</h1>
                            <h2>Cachorros Abatidos</h2>
                        </div>
                    }
                </div>
                <div className='tabuleiroArea'>
                    {!isPlaying && <img src={tabuleiro}/>}
                    {isPlaying && <Tabuleiro {...dadosPartida}  />           }
                </div>
            </div>
        </div>
    );
}