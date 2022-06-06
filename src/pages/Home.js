import {useState, useEffect, useRef, useContext} from 'react';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';
import { Headers } from '../components/Headers';
import { Tabuleiro } from './Tabuleiro';
import{io} from "socket.io-client"
import { executaRequisicao } from '../services/api';
import Table from 'react-bootstrap/Table';
import { UserContext } from '../context/UserContext';


export const Home= () => {
    const socket_url = process.env.REACT_APP_WS_URL
    const socket = useRef()
    const {userInfo} = useContext(UserContext)
    const [sala, setSala] = useState('')
    const [salasDisponiveis, setSalasDisponiveis] = useState([])
    const [criouSala, setCriouSala] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [dadosPartida, setDadosPartida] = useState({})
    const criarSala = () => {
        socket.current.emit('novaSala')
    }

    const joinSala = (idSala) => {
        socket.current.emit('joinSala', idSala)
        console.log("Entrando na sala: ", idSala)
        setSala('')
    }
    const atualizaSalasDisponiveis = async () => {
        executaRequisicao('/salasDisponiveis', 'GET')
        .then( resp => setSalasDisponiveis(resp.data.filter(sala => sala.id_user !== userInfo.id)))
        .catch(console.error)
    }

    useEffect(() => {
        socket.current = io(socket_url, {withCredentials: true})
        atualizaSalasDisponiveis()
        socket.current.on('serverNovaSala', data => {
            setSala(data.idSala)
            setCriouSala(true)
        })
        socket.current.on('serverSalasDisponiveis', salas => {
            console.log('salas disponiveis', salas)
            setSalasDisponiveis(salas.filter(sala => sala.id_user !== userInfo.id))
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
            if(data.skinCachorro) dadosIniciais['skinCachorro'] = data.skinCachorro
            if(data.corPecaCachorro) dadosIniciais['corPecaCachorro'] = data.corPecaCachorro
            if(data.skinOnca) dadosIniciais['skinOnca'] = data.skinOnca
            if(data.corPecaOnca) dadosIniciais['corPecaOnca'] = data.corPecaOnca

            // if(data['skinTabuleiro']) dadosIniciais['skinTabuleiro'] = data['skinTabuleiro']
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
                    { !criouSala && !isPlaying && 
                        <div className='salaOpts'>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th className="text-center" colSpan={2}>Salas Disponíveis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        salasDisponiveis.map( sala => {
                                            return <tr>
                                                <td className="text-center align-middle">{sala.user}</td>
                                                <td className="text-center"><button onClick={() => {
                                                    setSala(sala.id_sala)
                                                    joinSala(sala.id_sala)
                                                }}>Jogar como {sala.peca_disponivel ? "Cachorro": "Onça"}</button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                            <button  onClick={criarSala}>Criar sala!</button>
                        </div>
                    }
                    { criouSala && !isPlaying &&  
                    <div className='salaCriada'>
                        <h3>Aguardando Oponente...</h3>
                        <button>Sair da Sala de Espera</button>
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