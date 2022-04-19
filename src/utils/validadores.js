//validadores dos inputs do cadastro

//validando o tamanho mínimo para o user 
const validarUsuario = (user) => {
    return user?.toString().length > 2;
}

const validarEmail = (email) => {
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha) => {
    return senha?.toString().length > 4;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return validarSenha(senha) && senha===confirmacao;
}

export {
    validarUsuario,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha
}
