import axios from 'axios';
// const URL = 'http://localhost:3001' 
const URL = 'http://138.197.15.217/api'
const instance = axios.create({
    baseURL: URL,
    Timeout: 30000,
    withCredentials: true

});

export const executaRequisicao = (endpoint, metodo, body) => {
    console.log(`executando: ${URL}${endpoint}, metodo ${metodo}`);

    return instance.request({
        url: URL + endpoint,
        method: metodo,
        data: body ? body : ''
    })
}