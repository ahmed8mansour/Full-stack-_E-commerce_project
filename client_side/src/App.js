import React from "react";

import Home from "./pages/Home";
import ShopCategory from "./pages/ShopCategory";
import ShopProduct from "./pages/ShopProduct";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import ProtectedRoute from "./Layouts/ProtectedRoute";
import ReversedProtectedRoute from "./Layouts/ReversedProtectedRoute";
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from "./featuers/auth/authActions";
import "./featuers/auth/RefreshToken";

const router = createBrowserRouter([    

    {
        path: "/",
        element : <Home/>,
        errorElement : "ايرور",
    }
    ,
    {
        path: "/shop/:category",
        element : <ShopCategory/>
    }
    ,
    {
        path: "/shop/:category/:id",
        element:(
            <ProtectedRoute>
                <ShopProduct/>
            </ProtectedRoute>
        )
    }
    ,
    {
        path:"/cart",
        element:(
            <ProtectedRoute>
                <Cart/>
            </ProtectedRoute>
        )
            
    }
    ,
    {
        path:"/auth/:pagetypePara",
        element:(
            <ReversedProtectedRoute>
                <Auth/>
            </ReversedProtectedRoute>
        )
    }

]);


export default function App(){
    const dispatch = useDispatch()
    
    const state_auth = useSelector((state) => state.auth)
    const token = localStorage.getItem("userToken")
    React.useEffect(() => {
        console.log("app use effect is working")
        if (token && (!state_auth.user_info || Object.keys(state_auth.user_info).length === 0)){
            dispatch(userProfile());
        }
    }, [dispatch, state_auth.user_info ,token]);

    return(
            <>
                <ToastContainer />
                <RouterProvider router={router} />
            </>
    )
}