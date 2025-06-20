import React from 'react'
import { Navigate , useLocation} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'

export default function ReversedProtectedRoute({children}){
        const { pathname } = useLocation();
        const { user_info, profile_user_loading } = useSelector((state) => state.auth)
        const dispatch = useDispatch()

        if(profile_user_loading == true){
            return "loading..."
        }else{
            return(
                <>
                    {Object.keys(user_info).length > 0 ? 
                        "انت مسجل دخول يا محترم بزبطش تدخل هان " : children
                    }
                </>
            )
        }



}