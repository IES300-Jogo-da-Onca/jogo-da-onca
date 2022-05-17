import React, {useState} from 'react';
import { Headers } from '../components/Headers';
import {Modal, ModalBody} from 'react-bootstrap';
import { Input } from '../components/Input';
import coinIcon1 from '../assets/icons/coin1.png';
import coinIcon2 from '../assets/icons/coin2.png';
import coinIcon3 from '../assets/icons/coin3.png';
import coinIcon4 from '../assets/icons/coin4.png';
import coinIcon5 from '../assets/icons/coin5.png';
import coinIcon6 from '../assets/icons/coin6.png';
import coinIcon7 from '../assets/icons/coin7.png';

export const ComprarMoedas = () => {

    var total = 0;
    var quantidadeMoedas=0;
    let moedasUsuario = 5; //apenas para ilustrar as moedas que já foram compradas pelo usuário
    const [showModal, setShowModal] = useState(false); //pop up de pagamento

    //states do modal de pagamento
    const [numCartao, setNumCartao] = useState('');
    const [nomeCartao, setNomeCartao] = useState('');
    const [cvv, setCVV] = useState('');
    const [parcelas, setParcelas] = useState('');
 
    const setQtdMoedas = (quantidadeMoedas) => {
        moedasUsuario += quantidadeMoedas;
        return (moedasUsuario);
    }

    const compraPagamento = (preco) => {
    return(preco);
    }

    const compraQuant = (qtd) => {
    return(qtd);
    }

    const moedas = [
        {
            moedaValor: '$10',
            qtdMoedas: 10,
            moedaImg: coinIcon1,
            preçoMoeda: 10,
            moeda: true
        },
        {
            moedaValor: '$20',
            qtdMoedas: 20,
            moedaImg: coinIcon2,
            preçoMoeda: 20,
            moeda: true
        },
        {
            moedaValor: '$50',
            qtdMoedas: 50,
            moedaImg: coinIcon3,
            preçoMoeda: 50,
            moeda: true
        },
        {
            moedaValor: '$100',
            qtdMoedas: 100,
            moedaImg: coinIcon4,
            preçoMoeda: 100,
            moeda: true
        },
        {
            moedaValor: '$200',
            qtdMoedas: 200,
            moedaImg: coinIcon5,
            preçoMoeda: 200,
            moeda: true
        },
        {
            moedaValor: '$500',
            qtdMoedas: 500,
            moedaImg: coinIcon6,
            preçoMoeda: 500,
            moeda: true
        },
        {
            moedaValor: '$1000',
            qtdMoedas: 1000,
            moedaImg: coinIcon7,
            preçoMoeda: 1000,
            moeda: true
        },
    ]
    return(
        <div className='container-generic'>
            <Headers />
            <div className='bodyMoedas'>
                <br></br>
                <div className='moedasContainer'>
                    {
                        moedas.map( m => {
                            if(m.moeda){
                                return <div className='moeda'>
                                            <img src={m.moedaImg}/>
                                            <div className='moedaInfo'>
                                                <h4>{m.moedaValor}</h4>
                                             </div>
                                            <div className='moedaPreco'>
                                            <span>R${m.preçoMoeda}</span>
                                             </div>
                                    <div>
                                        <button 
                                        onClick={() => {setShowModal(true); 
                                        compraPagamento(m.preçoMoeda); 
                                        compraQuant(m.qtdMoedas)}} >Comprar</button>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
        </div>
        <h1>{moedasUsuario}</h1>
        <Modal className="container-pagamento" show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header>
            <h3>Pagamento</h3>
            </Modal.Header>
            <Modal.Body>
                <p>Cartão de Crédito</p>
                <div className='container-form'>
                    <Input  
                            inputType="text"
                            inputName="numero-cartao"
                            inputPlaceholder="Número do cartão"
                            value={numCartao}
                            setValue={setNumCartao}

                    />
                    <Input  
                            inputType="text"
                            inputName="nome-cartao"
                            inputPlaceholder="Nome impresso no cartão"
                            value={nomeCartao}
                            setValue={setNomeCartao}

                    />
                    <Input  
                            inputType="text"
                            inputName="cod-cartao"
                            inputPlaceholder="Código de Segurança"
                            value={cvv}
                            setValue={setCVV}

                    />
                    <Input  
                            inputType="number"
                            inputName="parc-cartao"
                            inputPlaceholder="Parcelas"
                            value={parcelas}
                            setValue={setParcelas}

                    />

                </div>
                <h5>Moedas:{total}</h5>
                <h4>Total: R${quantidadeMoedas}</h4>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn-cancelar" variant="secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn-comprar" variant="primary" onClick={() => compraPagamento()}>Comprar</button>
            </Modal.Footer>
        </Modal>

    </div>

    )
}