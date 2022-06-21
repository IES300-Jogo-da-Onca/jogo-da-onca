import { useState, useEffect, useRef, useContext } from 'react';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';
import { Headers } from '../components/Headers';
import { Tabuleiro } from './Tabuleiro';
import { io } from "socket.io-client"
import { executaRequisicao } from '../services/api';
import Table from 'react-bootstrap/Table';
import { UserContext } from '../context/UserContext';
import clockIcon from '../assets/icons/clock-icon.png';
import chewSound from '../assets/panther-chew.mp3';
import { Modal } from 'react-bootstrap';
//import useSound from 'use-sound';



export const Home = () => {
    const socket_url = process.env.REACT_APP_WS_URL
    const socket = useRef()
    const [pecaSelecionada, setPecaSelecionada] = useState('')
    const { userInfo } = useContext(UserContext)
    const [sala, setSala] = useState('')
    const [nomeVencedor, setNomeVencedor] = useState('')
    const [salasDisponiveis, setSalasDisponiveis] = useState([])
    const [criouSala, setCriouSala] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [dadosPartida, setDadosPartida] = useState({})
    const [showModalWin, setShowModalWin] = useState(false)

    const fimDeJogo = (data) => {
        setNomeVencedor(data.nomeVencedor)
        setShowModalWin(true)
    }
    const hideModalFimJogo = () =>{
        setShowModalWin(false)
        setTimeout(()=> {window.location.href = '/'}, 500)
    }
    const criarSala = (peca) => {
        // pecaSelecionada 0 para onça, 1 para cachorro
        if (peca !== 0 && peca !== 1) {
            window.alert("Selecione a peça desejada antes de criar sala!")
        } else {
            socket.current.emit('novaSala', peca)
            console.log("Peça selecionada: ", peca)
        }
    }

    const joinSala = (idSala) => {
        socket.current.emit('joinSala', idSala)
        console.log("Entrando na sala: ", idSala)
        setSala('')
    }
    const atualizaSalasDisponiveis = async () => {
        executaRequisicao('/salasDisponiveis', 'GET')
            .then(resp => setSalasDisponiveis(resp.data.filter(sala => sala.id_user !== userInfo.id)))
            .catch(console.error)
    }

    const handleRadioChange = (e) => {
        const { name, value } = e.target
        setPecaSelecionada(parseInt(value))
    }

    useEffect(() => {
        socket.current = io(socket_url, { withCredentials: true })
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
            if (data.skinCachorro) dadosIniciais['skinCachorro'] = data.skinCachorro
            if (data.corPecaCachorro) dadosIniciais['corPecaCachorro'] = data.corPecaCachorro
            if (data.skinOnca) dadosIniciais['skinOnca'] = data.skinOnca
            if (data.corPecaOnca) dadosIniciais['corPecaOnca'] = data.corPecaOnca

            if (data['skinTabuleiro']) dadosIniciais['skinTabuleiro'] = data['skinTabuleiro']
            setDadosPartida(dadosIniciais)
            setIsPlaying(true)
        })
        socket.current.on('error', data => console.error(data))

        return () => {socket.current.emit("disconnectSala")}
    }, [])
    return (
        <div className='container-generic'>
            <Headers />
            <div className='body'>
                <div className='optArea' style={{ flexDirection: 'column' }}>
                    {!criouSala && !isPlaying &&
                        <div className='salaOpts'>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th className="text-center" colSpan={2}>Salas Disponíveis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        salasDisponiveis.map(sala => {
                                            return <tr>
                                                <td className="text-center align-middle">{sala.user}</td>
                                                <td className='text-center'><button className="tbButton" onClick={() => {
                                                    setSala(sala.id_sala)
                                                    joinSala(sala.id_sala)
                                                }}>Jogar como {sala.peca_disponivel ? "Cachorro" : "Onça"}</button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                            <div className='criarSala'>
                                <div className='criarSalaRadio' >
                                    <div><input type="radio" value={0} name="peca" id='raioOnca' onChange={handleRadioChange} /> Onça</div>
                                    <div><input type="radio" value={1} name="peca" id='raioCachorro' onChange={handleRadioChange} /> Cachorro</div>
                                </div>
                                <button onClick={() => { criarSala(pecaSelecionada) }}>Criar sala!</button>
                            </div>
                        </div>
                    }
                    {criouSala && !isPlaying &&
                        <div className='salaCriada'>
                            <h3>Aguardando Oponente...</h3>
                            <button onClick={() => {
                                socket.current.emit('disconnectSala')
                                setCriouSala(false)
                                console.log("Teste")
                            }}>Sair da Sala de Espera</button>
                        </div>
                    }
                    {isPlaying &&
                        <div className='optPlaying'>
                            <div className='game-stats'>
                                <div className="timerDiv" id="timerContainer"><img id='imgTimer' src={clockIcon}/><span id="timer" style={{display: 'inline'}}></span></div>
                                <div><span className="turno" id="msgTurno"></span></div>
                                <div className='jogador-animal'><span id="span">Você: { dadosPartida.ehCachorro ? 'Cachorro' : 'Onça'}</span></div>
                            </div>
                            <div className='container-placar'>
                                <h1 id="placar">0</h1>
                                <h2>Cachorros Abatidos</h2>
                            </div>
                        </div>

                    }
                </div>
                <div className='tabuleiroArea'>
                    {!isPlaying &&<img src={tabuleiro}/>}
                    {isPlaying && <Tabuleiro {...dadosPartida} fimDeJogo={fimDeJogo} />}
                </div>
            </div>
            <Modal show={showModalWin} onHide={hideModalFimJogo}>
                <Modal.Header>
                    <h2>Fim de Jogo!</h2>
                </Modal.Header>
                <Modal.Body>
                    <h3>{nomeVencedor} venceu</h3>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-fechar" variant="secondary" onClick={hideModalFimJogo}>OK</button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}