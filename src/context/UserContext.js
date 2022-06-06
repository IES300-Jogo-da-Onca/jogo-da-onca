import { useEffect } from 'react'
import {useState, createContext} from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState({ })

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
    return <UserContext.Provider value={{userInfo, setUserInfo: atualizaUserData}}>
        {children}
    </UserContext.Provider>
}

export default UserProvider