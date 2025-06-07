import React from "react";

import Home from "./pages/Home";
import ShopCategory from "./pages/ShopCategory";
import ShopProduct from "./pages/ShopProduct";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import {createBrowserRouter , RouterProvider} from "react-router-dom"

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
        element : <ShopProduct/>
    }
    ,
    {
        path:"/cart",
        element:<Cart/>
    }
    ,
    {
        path:"/auth/:pagetypePara",
        element:<Auth/>
    }

]);


export default function App(){
    return(
        <RouterProvider router={router} />
    )
}