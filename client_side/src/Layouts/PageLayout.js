import React from 'react'

import NavBar from '../Layouts/NavBar'
import Footer from '../Layouts/Footer'
import useWindowDimensions from '../hooks/WindowDimentsions'
export default function PageLayout({ children }){
    return(
        <div>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}
