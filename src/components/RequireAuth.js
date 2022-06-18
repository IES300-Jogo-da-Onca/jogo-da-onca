import React, {useContext, useEffect, useState} from "react";
import { useLocation, Navigate} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function RequireAuth({ children }) {
    const [userInfo, setUserInfo] = useState(localStorage.getItem('userData'))
    let location = useLocation();

    useEffect(()=> {
        setUserInfo(localStorage.getItem('userData'))
        console.log("User Info: ", userInfo)
        console.log("User Location: ", location)
    },[])
    
    if (!userInfo ) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    // else if(userInfo && (location.pathname === '/' || location.pathname === '/cadastro')){
    //     return <Navigate to="/home" state={{ from: location }} replace />;
    // }

    return children;
}

export default RequireAuth