//validadores dos inputs do cadastro

//validando o tamanho mínimo para o nome
const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

//validando o tamanho mínimo para o user 
const validarlogin = (login) => {
    return login?.toString().length > 2;
}

/* const validarEmail = (email) => {
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
} */

const validarSenha = (senha) => {
    return senha?.toString().length > 4;
}

const validarConfirmacaoSenha = (senha, confirmaSenha) => {
    return validarSenha(senha) && senha===confirmaSenha;
}

export {
    validarlogin,
    validarNome,
    validarSenha,
    validarConfirmacaoSenha
}
