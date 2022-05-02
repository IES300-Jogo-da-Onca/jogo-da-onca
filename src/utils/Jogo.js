/*
* Classe com a lógica do jogo
*/
class Jogo {

    static LINHAS = 5
    static COLUNAS = 5
    static DIRECOES = [
        //(x,y)
        [0, -1], //CIMA
        [1, 0], //DIREITA
        [0, 1], //BAIXO
        [-1, 0] //ESQUERDA
    ]
    static DIAGONAIS = [
        //(x,y)
        [1, -1], //NORDESTE
        [1, 1], //SUDESTE
        [-1, 1], //SUDOESTE
        [-1, -1] //NOROESTE
    ]

    static MOVIMENTOS_VALIDOS_TRIANGULO = {
        '[1,5]': ['[1,6]', ['2,5'], '[2,4]'],
        '[1,6]': ['[1,5]', '[2,6]'],
        '[2,5]': ['[2,4]', '[2,6]', '[1,5]', '[3,5]'],
        '[2,6]': ['[2,5]', '[1,6]', '[3,6]'],
        '[3,5]': ['[2,4]', '[2,5]', '[3,6]'],
        '[3,6]': ['[3,5]', '[2,6]'],
    }

    static getTabuleiroInicial() {
        return [
            ['C', 'C', 'C', 'C', 'C'],
            ['C', 'C', 'C', 'C', 'C'],
            ['C', 'C', 'O', 'C', 'C'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['|', '.', '.', '.', '|'],
            ['|', '.', '.', '.', '|'],
        ]

    }
    /**
     *  verifica se a posição está dentro do vetor
     * @Return {boolean}
     */
    static posDentroDoTabuleiro(x, y) {
        return x >= 0 && x < this.COLUNAS && y >= 0 && y < this.LINHAS + 2
    }
    static movimentoInvalidoNoTriangulo(x, y, novoX, novoY) {
        if (!this.posDentroDoTabuleiro(novoX, novoY)) return true
        // filtrar movimentos invalidos a partir das posicoes (x,y) [1,5] e [3,5]
        if (x == 1 && y == 5) {
            if (!['[1,6]', '[2,4]', '[2,5]'].includes(JSON.stringify([novoX, novoY]))) return true
        }
        if (x == 3 && y == 5) {
            if (!['[3,6]', '[2,4]', '[2,5]'].includes(JSON.stringify([novoX, novoY]))) return true
        }
        if (x == 1 && y == 6 && novoX == 2 && novoY == 5) return true
        if (x == 3 && y == 6 && novoX == 2 && novoY == 5) return true

        if (y == 4 && x != 2) return novoY > 4
        return false
    }
    static verificaCaptura(x, y, direcao, vetorTabuleiro) {
        // verifica se na nova posição a onça captura o cachorro
        let novoX = x + direcao[0] * 2
        let novoY = y + direcao[1] * 2
        return (vetorTabuleiro[y + direcao[1]][x + direcao[0]] == 'C' && this.posDentroDoTabuleiro(novoX, novoY) && vetorTabuleiro[novoY][novoX] == '.')
    }

    static getPossiveisMovimentos(x, y, ehCachorro, vetorTabuleiro) {
        let movimentos = []
        let posicao = vetorTabuleiro[y][x]
        if (posicao == '.' || (!ehCachorro && posicao == 'C') || (ehCachorro && posicao == 'O')) return []
        this.DIRECOES.forEach(el => {
            let novoX = x + el[0]
            let novoY = y + el[1]
            if (!this.posDentroDoTabuleiro(novoX, novoY)) return []
            if (this.movimentoInvalidoNoTriangulo(x, y, novoX, novoY)) return []
            try {
                if (vetorTabuleiro[novoY][novoX] == '.') movimentos.push([novoX, novoY])
                if (!ehCachorro && this.verificaCaptura(x, y, el, vetorTabuleiro)) movimentos.push([novoX + el[0], novoY + el[1]])
            }
            catch (e) {
                console.error(novoY, novoX)
                throw e
            }
        })
        // diagonais 
        let posicaoString = JSON.stringify([x, y])
        let pecaPodeMoverDiagonal = ((5 * y + x) % 2 == 0 && y < 5) || ((y >= 5) && posicaoString != '[2,5]' && posicaoString != '[2,6]')
        if (pecaPodeMoverDiagonal) {
            this.DIAGONAIS.forEach(el => {
                let novoX = x + el[0]
                let novoY = y + el[1]
                if (!this.posDentroDoTabuleiro(novoX, novoY) || vetorTabuleiro[novoY][novoX] == '|') return []
                if (this.movimentoInvalidoNoTriangulo(x, y, novoX, novoY)) return []
                if (vetorTabuleiro[novoY][novoX] == '.') movimentos.push([novoX, novoY])
                if (!ehCachorro && this.verificaCaptura(x, y, el, vetorTabuleiro)) movimentos.push([novoX + el[0], novoY + el[1]])
            })
        }
        return movimentos
    }
}

export default Jogo 