import React, { useState, useContext } from 'react';
import { Headers } from '../components/Headers';
import { Modal } from 'react-bootstrap';
import { Input } from '../components/Input';
import { executaRequisicao } from '../services/api';
import coinIcon1 from '../assets/icons/coin1.png';
import coinIcon2 from '../assets/icons/coin2.png';
import coinIcon3 from '../assets/icons/coin3.png';
import coinIcon4 from '../assets/icons/coin4.png';
import coinIcon5 from '../assets/icons/coin5.png';
import coinIcon6 from '../assets/icons/coin6.png';
import coinIcon7 from '../assets/icons/coin7.png';
import pagIcon from '../assets/icons/pag-sucesso.png';
import coin from '../assets/coin.mp3';
import { validarCvv, validarnomeCartao, validarNumCartao, validarParc } from '../utils/validarCompraMoedas';
import { UserContext } from '../context/UserContext';

export const ComprarMoedas = () => {


    //states do modal de pagamento
    const [showModal, setShowModal] = useState(false); //pop up de pagamento
    const [showModalSucesso, setShowModalSucesso] = useState(false);
    const [numCartao, setNumCartao] = useState('');
    const [nomeCartao, setNomeCartao] = useState('');
    const [cvv, setCVV] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [total, setTotal] = useState(''); //total da compra
    const [quantidade, setQuantidade] = useState(0); //quantidade comprada
    const [processando, setProcessandoPag] = useState(false); //processando pagamento
    const { userInfo, setUserInfo } = useContext(UserContext)

    var coinSound = new Audio(coin) //efeito sonoro moedas

    //valida informações do cartão
    const validarFormulario = () => {
        return (
            validarNumCartao(numCartao)
            && validarnomeCartao(nomeCartao)
            && validarCvv(cvv)
            && validarParc(parcelas)
        )
    }

    const executaPagamento = evento => {
        evento.preventDefault();
        setProcessandoPag(true);
        executaRequisicao('/comprarmoeda', 'POST', { quantidade })
            .then(response => {
                setTimeout(() => {
                    setShowModal(false); //fecha popup de pagamento
                    setProcessandoPag(false); //tira o estado "processando"
                    setShowModalSucesso(true); //mostra popup de confirmação da compra
                    coinSound.play()
                    setUserInfo({ ...userInfo, ...response.data.data })
                }, 3000)

            })
            .catch(console.error)
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
            preçoMoeda: 90,
            moeda: true
        },
        {
            moedaValor: '$200',
            qtdMoedas: 200,
            moedaImg: coinIcon5,
            preçoMoeda: 180,
            moeda: true
        },
        {
            moedaValor: '$500',
            qtdMoedas: 500,
            moedaImg: coinIcon6,
            preçoMoeda: 450,
            moeda: true
        },
        {
            moedaValor: '$1000',
            qtdMoedas: 1000,
            moedaImg: coinIcon7,
            preçoMoeda: 800,
            moeda: true
        },
    ]
    return (
        <div className='container-generic'>
            <Headers />
            <div className='bodyMoedas'>
                <br></br>
                <div className='moedasContainer'>
                    {
                        moedas.map(m => {
                            if (m.moeda) {
                                return <div className='moeda'>
                                    <img src={m.moedaImg} />
                                    <div className='moedaInfo'>
                                        <h4>{m.moedaValor}</h4>
                                    </div>
                                    <div className='moedaPreco'>
                                        <span>R${m.preçoMoeda}</span>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setShowModal(true);
                                                setTotal(m.preçoMoeda);
                                                setQuantidade(m.qtdMoedas)
                                            }}>Comprar</button>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
            </div>

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
                            inputPlaceholder="Número do Cartão"
                            value={numCartao}
                            setValue={setNumCartao}

                        />

                        <Input
                            inputType="text"
                            inputName="cod-cartao"
                            inputPlaceholder="Código de Segurança"
                            value={cvv}
                            setValue={setCVV}

                        />
                        <Input
                            inputType="text"
                            inputName="nome-cartao"
                            inputPlaceholder="Nome"
                            value={nomeCartao}
                            setValue={setNomeCartao}

                        />
                        <div className='parcela'>
                            <label>Parcelas: </label>
                            <Input
                                inputType="number"
                                min="1"
                                max="12"
                                inputName="parc-cartao"
                                inputPlaceholder=""
                                value={parcelas}
                                setValue={setParcelas}

                            />
                        </div>

                    </div>
                    <h5>Moedas: {total}</h5>
                    <h4>Total: R${quantidade}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-cancelar" variant="secondary" onClick={() => setShowModal(false)}
                        disabled={processando === true}>Cancelar</button>
                    <button className="btn-comprar"
                        variant="primary" disabled={!validarFormulario() || processando === true}
                        onClick={executaPagamento} > {processando === true ? 'Processando' : 'Comprar'}</button>
                </Modal.Footer>
            </Modal>

            <Modal className="pagamento-sucesso" show={showModalSucesso} onHide={() => setShowModalSucesso(false)}
                backdrop="static" keyboard={false}>
                <Modal.Header>
                    <h3>Pagamento</h3>
                </Modal.Header>
                <Modal.Body>
                    <h1>Compra realizada com sucesso!</h1>
                    <img src={pagIcon}></img>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-fechar" variant="secondary" onClick={() =>
                        setShowModalSucesso(false)}>Fechar</button>
                </Modal.Footer>

            </Modal>

        </div >

    )
}