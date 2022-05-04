import axios from 'axios';
const URL = process.env.REACT_APP_API_URL
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