//validadores dos inputs da compra de moedas

//validando o tamanho mínimo para o numero do cartao
const validarNumCartao = (numCartao) => {
    return numCartao?.toString().length >= 16;
}

//validando o tamanho mínimo para o nome impresso no cartao 
const validarnomeCartao = (nomeCartao) => {
    return nomeCartao?.toString().length >= 5;
}

//validando tamanho minimo do cvv
const validarCvv = (cvv) => {
    return cvv?.toString().length >= 3;
}

//validando parcela
const validarParc = (parcelas) => {
    return parcelas?.toString().length >= 1;
}


export {
    validarNumCartao,
    validarnomeCartao,
    validarCvv,
    validarParc
}
