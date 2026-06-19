import { useEffect } from 'react'
import {useState, createContext} from 'react'
import { wakeUpApi } from '../services/api'

export const UserContext = createContext()

const UserProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState({ })
    const [apiReady, setApiReady] = useState(false)

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('userData'))
        if(userData === null) {
            userData = {
                nome: 'Nome Usuário',
                moedas: 0,
                ehPremium: false,
                skinOnca: null,
                skinCachorro: null
            }
        }
        setUserInfo(userData)
            
    }, [])

    const atualizaUserData = (objUser) => {
        if(objUser === null) return
        localStorage.setItem('userData', JSON.stringify(objUser))
        setUserInfo(objUser)
    }
    return <UserContext.Provider value={{userInfo, setUserInfo: atualizaUserData, apiReady, setApiReady}}>
        {children}
    </UserContext.Provider>
}

export default UserProvider