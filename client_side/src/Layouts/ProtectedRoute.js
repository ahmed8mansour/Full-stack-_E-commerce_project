// ProtectedRoute.js
import React from 'react'
import { Navigate , useLocation } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'


const ProtectedRoute = ({ children }) => {
    const { pathname } = useLocation();
    const { user_info , profile_user_loading} = useSelector((state) => state.auth)
    const token = localStorage.getItem("userToken")

    if (profile_user_loading == true){
        return "loading...."
    }else{
        return(
            <>
    
                { !user_info || Object.keys(user_info).length === 0 ? 
                    "لازم تسجل دخول يا وحشش " : children
                }
            </>
    
        )
    }


}

export default ProtectedRoute;
