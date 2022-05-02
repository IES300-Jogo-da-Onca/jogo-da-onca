import { useRef } from "react"
import p5 from 'p5'
import { useEffect } from "react"
import Jogo from '../utils/Jogo'
import skinTabuleiro from '../assets/fundo.png';
import skinOnca from '../assets/onca.png'
import skinCachorro from '../assets/dog.png'


const LINHAS = 5
const COLUNAS = 5
const SELECIONADO = []
let POSSIBLE_MOVES_POINTS = []
const PONTOS_DO_TABULEIRO = {}
let POS_PECA_TABULEIRO = {}



let ehCachorro = false, meu_turno = true, startGame = true, mapearPosicaoPecas, dog_img, onca_img, fundo_img
let CANVAS_WIDTH = 800, CANVAS_MIN_WIDTH = 400, CANVAS_MAX_WIDTH = 1200
let CANVAS_HEIGHT = 800, CANVAS_MIN_HEIGHT = 640, CANVAS_MAX_HEIGHT = 800
let MARGIN_TOP = 40, MARGIN_LEFT = 40
let LADO_QUADRADO = 100, MIN_LADO_QUADRADO = 40, MAX_LADO_QUADRADO = 100
let MOVE_POINT_DIAMETRO = 24
let IMG_WIDTH = 66
let IMG_HEIGHT = 66
let IMG_DIAMETRO = 30
let BOARD_STATE = Jogo.getTabuleiroInicial()


function Tabuleiro(props) {

  const sketch = (p) => {


    p.preload = () => {
      fundo_img = p.loadImage(props.skinTabuleiro)
      dog_img = p.loadImage(props.skinCachorro)
      onca_img = p.loadImage(props.skinOnca)
      ehCachorro = props.ehCachorro
      p.createDiv().id('info').position(0, 1)
    }
    p.setup = () => {
      let infoDiv = p.createDiv()
      infoDiv.id("msg")
      infoDiv.style('color', 'white')
      infoDiv.style('background-color', 'black')
      infoDiv.style('padding', '8px')
      infoDiv.style('position', 'absolute')
      infoDiv.style('top', '0')
      infoDiv.style('right', '0')
      calculaTamanhoElementos()
      calculaPosicaoPontos()
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
      p.background(fundo_img)
    }
    p.draw = () => {
      if (true) {
        p.strokeWeight(1)
        p.stroke('black')
        p.fill('rgba(0,0,0,0)')
        p.background(fundo_img)
        desenharQuadrados()
        desenharDiagonais()
        desenharPecas()
        p.stroke(`${ehCachorro ? 'yellow' : 'green'}`)
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

    p.mouseClicked = () => {
      if (!meu_turno || BOARD_STATE.length == 0) return
      if (!POSSIBLE_MOVES_POINTS.length) selecionarPeca()
      else moverPeca()
    }

    function desenharQuadrados() {
      for (let i = 0; i < COLUNAS - 1; i++) {
        for (let j = 0; j < LINHAS - 1; j++) {
          p.square(MARGIN_LEFT + i * LADO_QUADRADO, MARGIN_TOP + j * LADO_QUADRADO, LADO_QUADRADO)
        }
      }
    }

    function calculaTamanhoElementos() {
      CANVAS_HEIGHT = Math.floor([CANVAS_MAX_HEIGHT, CANVAS_MIN_HEIGHT, p.windowHeight * 0.8].sort((a, b) => a - b)[1])
      CANVAS_WIDTH = Math.floor([CANVAS_MAX_WIDTH, CANVAS_MIN_WIDTH, p.windowWidth * 0.8].sort((a, b) => a - b)[1])
      LADO_QUADRADO = Math.floor([MAX_LADO_QUADRADO, MIN_LADO_QUADRADO, p.windowWidth / 6].sort((a, b) => a - b)[1])
      MOVE_POINT_DIAMETRO = Math.floor(LADO_QUADRADO / 4)
      MARGIN_LEFT = (CANVAS_WIDTH - LADO_QUADRADO * 4) / 2
      MARGIN_TOP = (CANVAS_HEIGHT - LADO_QUADRADO * 5.5) / 2
      IMG_HEIGHT = Math.floor(LADO_QUADRADO / 1.5)
      IMG_WIDTH = IMG_HEIGHT
      IMG_DIAMETRO = IMG_HEIGHT / 2

      document.getElementById('msg').innerHTML = `
      window height: ${p.windowHeight}<br>
      window width: ${p.windowWidth}<br>
      canvas width: ${CANVAS_WIDTH}<br>
      canvas height: ${CANVAS_HEIGHT}<br>
      LADO_QUADRADO: ${LADO_QUADRADO} <br>
      MARGIN_TOP: ${MARGIN_TOP}<br>
      MARGIN_LEFT: ${MARGIN_LEFT}`
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
      let clicouNaImagem = false
      Object.entries(POS_PECA_TABULEIRO).some(item => {
        let aux = item[0].replace('{', '').replace('}', '')
        if (p.mouseX >= item[1][0] && p.mouseX <= item[1][0] + IMG_DIAMETRO * 2 &&
          p.mouseY >= item[1][1] && p.mouseY <= item[1][1] + IMG_DIAMETRO * 2) {
          clicouNaImagem = true
          aux = item[0].replace(']', '').replace('[', '').split(',')
          let x = +aux[0]
          let y = +aux[1]
          if (BOARD_STATE[y][x] != '.' && BOARD_STATE[y][x] != '|') {
            SELECIONADO.length = 0
            SELECIONADO.push([x, y])
            Jogo.getPossiveisMovimentos(x, y, ehCachorro, BOARD_STATE)?.forEach(ponto => { POSSIBLE_MOVES_POINTS.push(ponto) })
          }
          return true
        }
        return false
      })
    }

    function moverPeca() {
      document.getElementById('info').innerHTML = ''
      POSSIBLE_MOVES_POINTS.forEach(element => {
        console.log(element)
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
        document.getElementById('info').innerHTML += '' + p.dist(point_x, point_y, p.mouseX, p.mouseY) + ' ' + MOVE_POINT_DIAMETRO + '<br>'

        console.log(p.dist(point_x, point_y, p.mouseX, p.mouseY))
        if (p.dist(point_x, point_y, p.mouseX, p.mouseY) <= MOVE_POINT_DIAMETRO) {
          console.log(BOARD_STATE[y][x], BOARD_STATE[old_y][old_x], old_x, old_y)
          let aux = BOARD_STATE[y][x]
          BOARD_STATE[y][x] = BOARD_STATE[old_y][old_x]
          BOARD_STATE[old_y][old_x] = aux
          console.log(BOARD_STATE[y][x], BOARD_STATE[old_y][old_x], old_x, old_y)

        }
      })

      POSSIBLE_MOVES_POINTS.length = 0
    }



  }

  let a = 1

  const containerRef = useRef()
  useEffect(() => {
    const p5Instance = new p5(sketch, containerRef.current)

    //desenhaTabuleiro(p5Instance)
    return () => {
      p5Instance.remove()

    }
  }, [])
  return (
    <div style={{ minHeight: '600px' }} ref={containerRef}></div>
  )
}

Tabuleiro.defaultProps = { skinTabuleiro, skinOnca, skinCachorro, ehCachorro: true }
export { Tabuleiro }