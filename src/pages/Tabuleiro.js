import { useEffect, useRef, Fragment } from "react"
import p5 from 'p5'
import Jogo from '../utils/Jogo'
import skinTabuleiro from '../assets/fundo.png';
import skinOnca from '../assets/onca.png'
import skinCachorro from '../assets/dog.png'
import pantherChew from '../assets/panther-chew.mp3';
import timerBell from '../assets/bell.wav';
import pieceMove from '../assets/peca-efeito.mp3';
import { Modal } from "react-bootstrap";


const LINHAS = 5
const COLUNAS = 5
const SELECIONADO = []
let POSSIBLE_MOVES_POINTS = []
const PONTOS_DO_TABULEIRO = {}
let POS_PECA_TABULEIRO = {}
let ehCachorro = false, meu_turno = true, dog_img, onca_img, fundo_img
let CANVAS_WIDTH = 800, CANVAS_MIN_WIDTH = 400, CANVAS_MAX_WIDTH = 1200
let CANVAS_HEIGHT = 600, CANVAS_MIN_HEIGHT = 640, CANVAS_MAX_HEIGHT = 800
let MARGIN_TOP = 40, MARGIN_LEFT = 40
let LADO_QUADRADO = 100, MIN_LADO_QUADRADO = 40, MAX_LADO_QUADRADO = 100
let MOVE_POINT_DIAMETRO = 24
let IMG_WIDTH = 66
let IMG_HEIGHT = 66
let IMG_DIAMETRO = 30
let houveCaptura = false
let placar = 0
let timer = 20
let interval = null
let BOARD_STATE = Jogo.getTabuleiroInicial()

var oncaEating = new Audio(pantherChew) //efeito sonoro onça comendo
var timerSound = new Audio(timerBell) //efeito sonoro turno
var pecaMov = new Audio(pieceMove) //efeito sonoro peca movendo

function mudarPlacar(){
  document.getElementById('placar').innerText=placar

}
function inicializaTimer(){
  //timerSound.play()
  clearInterval(interval)
  timer = 20
  document.getElementById('timer').innerText=timer
  interval =  setInterval(() => {
    timer--
    document.getElementById('timer').innerText=timer
    if(timer == 0) clearInterval(interval); 
  },1000)
}

function zerarTimer() {
  clearInterval(interval)
  document.getElementById('timer').innerText = '0'
}

function mudarMsgTurno(mudouTurnoPeca = true){
  let msg, corFonte
  if(meu_turno){
    msg = 'Sua vez' 
    //corFonte = 'blue'
    console.log('mudouTurnoPeca ' , mudouTurnoPeca)
    if(mudouTurnoPeca){
      POSSIBLE_MOVES_POINTS = []
      inicializaTimer()
      
    } 
  } 
  else{
    msg = 'Vez do oponente'
    corFonte = 'white'
    zerarTimer()
  }
  let p = document.getElementById('msgTurno')
  p.classList.remove('alertaTrocaTurno')
  p.innerText = msg
  p.style.color = corFonte
}

function Tabuleiro(props) {
  function ehMeuTurno(turnoPeca){
    return (ehCachorro && turnoPeca == 1) || (!ehCachorro && turnoPeca == 0)
  }
  const sketch = (p) => {


    p.preload = () => {
      fundo_img = p.loadImage(props.skinTabuleiro ? props.skinTabuleiro : skinTabuleiro )
      dog_img = p.loadImage(props.skinCachorro ? props.skinCachorro : skinCachorro)
      onca_img = p.loadImage(props.skinOnca ? props.skinOnca: skinOnca)
      ehCachorro = props.ehCachorro
      meu_turno = ehMeuTurno(props.turnoPeca)
    }

    p.setup = () => {
      if (props.socket){
        configurarPartidaOnline()
      }
      calculaTamanhoElementos()
      calculaPosicaoPontos()
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
      p.background(fundo_img)
      if(props.preview){
        //document.getElementById("timerContainer").style.display = "none"
        //document.getElementById("span").style.display = "none"
        //document.getElementById("msgTurno").style.display = "none"       
      }
    }

    p.draw = () => {
      if (BOARD_STATE.length !== 0) {
        p.strokeWeight(3)
        p.stroke(props.corTematica)
        p.fill('rgba(0,0,0,0)')
        p.background(fundo_img)
        desenharQuadrados()
        desenharDiagonais()
        desenharPecas()
        if(props.preview){
          p.strokeWeight(0)
          p.fill(props.corPreview)
          p.rect(0,0,CANVAS_MAX_WIDTH,CANVAS_HEIGHT)
          p.noLoop()
        } 
        p.stroke(`${ehCachorro ? props.corPecaCachorro : props.corPecaOnca}`)
        p.strokeWeight(MOVE_POINT_DIAMETRO)
        POSSIBLE_MOVES_POINTS.forEach(element => {
          if (element[1] > 4) {
            let posicaoNoMapa = PONTOS_DO_TABULEIRO[JSON.stringify(element)]
            try {
              p.point(posicaoNoMapa[1], posicaoNoMapa[0])

            } catch (error) {
              console.warn(posicaoNoMapa, element, JSON.stringify(element), PONTOS_DO_TABULEIRO)
            }
          }
          else {
            p.point(element[0] * LADO_QUADRADO + MARGIN_LEFT, element[1] * LADO_QUADRADO + MARGIN_TOP)
          }
        })
      }
    }

    p.windowResized = () => {
      calculaTamanhoElementos()
      calculaPosicaoPontos()
      p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    p.mouseClicked = (e) => {
      if (props.preview || !meu_turno || BOARD_STATE.length === 0) return
      if (POSSIBLE_MOVES_POINTS.length === 0){ selecionarPeca()}
      else {moverPeca(e);}
    }

    function configurarPartidaOnline(){
      BOARD_STATE = props.vetorTabuleiro
    }

    function desenharQuadrados() {
      for (let i = 0; i < COLUNAS - 1; i++) {
        for (let j = 0; j < LINHAS - 1; j++) {
          p.square(MARGIN_LEFT + i * LADO_QUADRADO, MARGIN_TOP + j * LADO_QUADRADO, LADO_QUADRADO)
        }
      }
    }

    function calculaTamanhoElementos() {
      let fatorLarguraTabuleiro = 0.59
      if(p.windowWidth <= 800) fatorLarguraTabuleiro = 1
      CANVAS_HEIGHT = Math.floor([CANVAS_MAX_HEIGHT, CANVAS_MIN_HEIGHT, p.windowHeight * 0.8].sort((a, b) => a - b)[1])
      CANVAS_WIDTH = Math.floor([CANVAS_MAX_WIDTH, CANVAS_MIN_WIDTH, p.windowWidth *fatorLarguraTabuleiro].sort((a, b) => a - b)[1])
      LADO_QUADRADO = Math.floor([MAX_LADO_QUADRADO, MIN_LADO_QUADRADO, CANVAS_WIDTH / 5].sort((a, b) => a - b)[1])
      MOVE_POINT_DIAMETRO = Math.floor(LADO_QUADRADO / 4)
      MARGIN_LEFT = (CANVAS_WIDTH - LADO_QUADRADO * 4) / 2
      MARGIN_TOP = (CANVAS_HEIGHT - LADO_QUADRADO * 5.5) / 2
      IMG_HEIGHT = Math.floor(LADO_QUADRADO / 1.4)
      IMG_WIDTH = IMG_HEIGHT
      IMG_DIAMETRO = IMG_HEIGHT / 2
    }

    function calculaPosicaoPontos() {
      for (let i = 0; i < LINHAS; i++) {
        for (let j = 0; j < COLUNAS; j++) {
          let chave = JSON.stringify([i, j])
          let x = LADO_QUADRADO * j + MARGIN_LEFT
          let y = LADO_QUADRADO * i + MARGIN_TOP
          PONTOS_DO_TABULEIRO[chave] = [Math.floor(y), Math.floor(x)]
        }
      }
      PONTOS_DO_TABULEIRO['[1,5]'] = [4.8 * LADO_QUADRADO + MARGIN_TOP, 1.2 * LADO_QUADRADO + MARGIN_LEFT]
      PONTOS_DO_TABULEIRO['[2,5]'] = [4.8 * LADO_QUADRADO + MARGIN_TOP, 2 * LADO_QUADRADO + MARGIN_LEFT]
      PONTOS_DO_TABULEIRO['[3,5]'] = [4.8 * LADO_QUADRADO + MARGIN_TOP, 2.8 * LADO_QUADRADO + MARGIN_LEFT]
      PONTOS_DO_TABULEIRO['[1,6]'] = [5.5 * LADO_QUADRADO + MARGIN_TOP, 0.5 * LADO_QUADRADO + MARGIN_LEFT]
      PONTOS_DO_TABULEIRO['[2,6]'] = [5.5 * LADO_QUADRADO + MARGIN_TOP, 2 * LADO_QUADRADO + MARGIN_LEFT]
      PONTOS_DO_TABULEIRO['[3,6]'] = [5.5 * LADO_QUADRADO + MARGIN_TOP, 3.5 * LADO_QUADRADO + MARGIN_LEFT]
    }

    function desenharDiagonais() {
      p.line(MARGIN_LEFT, MARGIN_TOP, 4 * LADO_QUADRADO + MARGIN_LEFT, 4 * LADO_QUADRADO + MARGIN_TOP)
      p.line(4 * LADO_QUADRADO + MARGIN_LEFT, MARGIN_TOP, MARGIN_LEFT, 4 * LADO_QUADRADO + MARGIN_TOP)
      p.line(MARGIN_LEFT + 2 * LADO_QUADRADO, MARGIN_TOP, MARGIN_LEFT, 2 * LADO_QUADRADO + MARGIN_TOP)
      p.line(MARGIN_LEFT + 2 * LADO_QUADRADO, MARGIN_TOP, 4 * LADO_QUADRADO + MARGIN_LEFT, 2 * LADO_QUADRADO + MARGIN_TOP)
      p.line(MARGIN_LEFT, 2 * LADO_QUADRADO + MARGIN_TOP, 3.5 * LADO_QUADRADO + MARGIN_LEFT, 5.5 * LADO_QUADRADO + MARGIN_TOP)
      p.line(4 * LADO_QUADRADO + MARGIN_LEFT, 2 * LADO_QUADRADO + MARGIN_TOP, 0.5 * LADO_QUADRADO + MARGIN_LEFT, 5.5 * LADO_QUADRADO + MARGIN_TOP)
      p.line(1.2 * LADO_QUADRADO + MARGIN_LEFT, 4.8 * LADO_QUADRADO + MARGIN_TOP, 2.8 * LADO_QUADRADO + MARGIN_LEFT, 4.8 * LADO_QUADRADO + MARGIN_TOP)
      p.line(0.5 * LADO_QUADRADO + MARGIN_LEFT, 5.5 * LADO_QUADRADO + MARGIN_TOP, 3.5 * LADO_QUADRADO + MARGIN_LEFT, 5.5 * LADO_QUADRADO + MARGIN_TOP)
      p.line(2 * LADO_QUADRADO + MARGIN_LEFT, 4 * LADO_QUADRADO + MARGIN_TOP, 2 * LADO_QUADRADO + MARGIN_LEFT, 5.5 * LADO_QUADRADO + MARGIN_TOP)
    }

    function desenharPecas() {
      let img_x, img_y
      for (let i = 0; i < LINHAS; i++) {
        for (let j = 0; j < COLUNAS + 2; j++) {
          let chave = JSON.stringify([i, j])
          if (j > 4 && PONTOS_DO_TABULEIRO[chave]) {
            let aux = PONTOS_DO_TABULEIRO[chave]
            img_x = aux[1] - IMG_DIAMETRO
            img_y = aux[0] - IMG_DIAMETRO
          }
          else {
            img_x = i * LADO_QUADRADO + MARGIN_LEFT - IMG_DIAMETRO
            img_y = j * LADO_QUADRADO + MARGIN_TOP - IMG_DIAMETRO
          }
          switch (BOARD_STATE[j][i]) {
            case 'O':
              p.image(onca_img, img_x, img_y, IMG_WIDTH, IMG_HEIGHT)
              POS_PECA_TABULEIRO[chave] = [img_x, img_y]
              break
            case 'C':
              p.image(dog_img, img_x, img_y, IMG_WIDTH, IMG_HEIGHT)
              POS_PECA_TABULEIRO[chave] = [img_x, img_y]
              break
          }
        }
      }
    }

    function selecionarPeca() {
      Object.entries(POS_PECA_TABULEIRO).some(item => {
        if (p.mouseX >= item[1][0] && p.mouseX <= item[1][0] + IMG_DIAMETRO * 2 &&
          p.mouseY >= item[1][1] && p.mouseY <= item[1][1] + IMG_DIAMETRO * 2) {
          let aux = item[0].replace(']', '').replace('[', '').split(',')
          let x = +aux[0]
          let y = +aux[1]
          if (BOARD_STATE[y][x] != '.' && BOARD_STATE[y][x] != '|') {
            SELECIONADO.length = 0
            SELECIONADO.push([x, y])
            Jogo.getPossiveisMovimentos(x, y, ehCachorro, BOARD_STATE, houveCaptura).forEach(ponto => { POSSIBLE_MOVES_POINTS.push(ponto) })
          }
          return true
        }
        return false
      })
    }

    function moverPeca(e) {
      POSSIBLE_MOVES_POINTS.some(element => {
        let x = element[0]
        let y = element[1]
        let point_x, point_y
        let old_x = SELECIONADO[0][0]
        let old_y = SELECIONADO[0][1]
        let keyPontosTriangulo = JSON.stringify(element)
        if (y > 4) {
          point_x = PONTOS_DO_TABULEIRO[keyPontosTriangulo][1]
          point_y = PONTOS_DO_TABULEIRO[keyPontosTriangulo][0]
        }
        else {
          point_y = LADO_QUADRADO * y + MARGIN_TOP
          point_x = LADO_QUADRADO * x + MARGIN_LEFT
        }
        let mouseX = p.mouseX, mouseY = p.mouseY
        if (p.dist(point_x, point_y, mouseX, mouseY) <= MOVE_POINT_DIAMETRO) {
          if(!props.socket){
            let aux = BOARD_STATE[y][x]
            BOARD_STATE[y][x] = BOARD_STATE[old_y][old_x]
            BOARD_STATE[old_y][old_x] = aux
          }
          else{
            props.socket.emit('moverPeca', { x,y,old_x,old_y  })

          }
          return true
       
        }
       
      })

      POSSIBLE_MOVES_POINTS.length = 0
    }



  }

   const containerRef = useRef()
  useEffect(() => {
    const p5Instance = new p5(sketch, containerRef.current)
    if (props.socket == null) return
    mudarMsgTurno()
    props.socket.on('serverMoverPeca', data => {
      const meuTurnoAnterior = meu_turno
      BOARD_STATE = data.novoTabuleiro
      houveCaptura = data.houveCaptura
      if(!data.timer && !data.emitirSomOnca) pecaMov.play()
      if(data.emitirSomOnca)  oncaEating.play()
      meu_turno = ehMeuTurno(data.turnoPeca)
      placar = data.placar
      mudarPlacar()
      mudarMsgTurno(meu_turno !== meuTurnoAnterior)
      if(!meu_turno) POSSIBLE_MOVES_POINTS.length = []
    } )

    props.socket.on('serverFimDeJogo', data => {
      props.fimDeJogo(data)
      });
    return () => {
      document.getElementsByTagName('canvas').forEach(item => item.remove())
    }
  }, [])


  return (
    <Fragment>
     {/*  <div className="game-stats">
      <span id="span">Jogando com {props.ehCachorro ? 'cachorro': 'onça'}</span>
      <br></br>
      <p><span id="msgTurno"></span> 
        <div id="timerContainer">Tempo restante: <span id="timer"></span> </div>
      </p> */}
    <div style={{ minHeight: '600px' }} ref={containerRef}></div>
    {/* </div> */}
    </Fragment>
  )
}

Tabuleiro.defaultProps = { skinTabuleiro, skinOnca, skinCachorro, ehCachorro: true, socket: null,
vetorTabuleiro : null, turnoPeca: 1, corPecaCachorro: 'yellow', corPecaOnca:'green', preview: false,
corTematica: 'black' }
export { Tabuleiro }