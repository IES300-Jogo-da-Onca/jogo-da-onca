import {useState, useEffect} from 'react';
import tabuleiro from '../assets/icons/tabuleiroProvisório.png';
import { Headers } from '../components/Headers';
import{io} from "socket.io-client"
const socket = io("ws://localhost:3001", {withCredentials: true})

export const Home= () => {
    const [sala, setSala] = useState(null)
    
    const criarSala = () => {
        socket.emit('novaSala')
    }

    useEffect(() => {
        socket.on('serverNovaSala', data => setSala(data.idSala))

    }, [socket])
    return (
        <div className='container-generic'>
            <Headers />
            <div className='body'>
                <div className='optArea'>
                    { !sala && <button onClick={criarSala}>Criar sala!</button> }
                    { sala && <input disabled value={sala}></input>}
                </div>
                <div className='tabuleiroArea'>
                    <img src={tabuleiro}/>
                </div>
            </div>
        </div>
    );
}