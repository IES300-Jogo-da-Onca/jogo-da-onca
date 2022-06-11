import axios from 'axios';
const URL = process.env.REACT_APP_API_URL
const instance = axios.create({
    baseURL: URL,
    Timeout: 30000,
    withCredentials: true

});

export const executaRequisicao = (endpoint, metodo, body) => {
    console.log(`executando: ${URL}${endpoint}, metodo ${metodo}`);
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await instance.request({
                url: URL + endpoint,
                method: metodo,
                data: body ? body : ''
            })
            resolve(resp)
        } catch (error) {
            if (error.response == undefined || error.response.status == 401){
                localStorage.clear()
                window.location = '/'
                reject(error.response)
            }else{
                reject(error)
            }
        }
    })

}