import {useState, createContext} from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState({
        nome: 'Nome Usuário',
        moedas: 0,
        ehPremium: false,
        skinOnca: null,
        skinCachorro: null
    })
    return <UserContext.Provider value={{userInfo, setUserInfo}}>
        {children}
    </UserContext.Provider>
}

export default UserProvider