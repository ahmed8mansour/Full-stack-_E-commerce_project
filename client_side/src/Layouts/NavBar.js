import React from 'react'

import useWindowDimensions from '../hooks/WindowDimentsions'


export default function NavBar(){
    const {width , height } = useWindowDimensions()
    const [collapsed , Setcollapsed] = React.useState(
        document.getElementById('navbarTogglerDemo02')?.classList.contains('show')
    )
    function showNav(){
        Setcollapsed(e => !e)
    }
    function searchfocus() {
        const nav = document.getElementById('navbarTogglerDemo02');
        const input = document.querySelector('.search_input');
        if (nav && !nav.classList.contains('show')) {
            nav.classList.add('show');
            Setcollapsed(true);
        }
        if (input) {
            input.focus();
        }
    }

    return(
        <>
            {/* <div className='signin_up_offer_area'>
                <div className='sign_offer_container position-relative container h-100 justify-content-center d-flex align-items-center'>
                    <div className='offer_text'>

                        Sign up and get 20% off to your first order.
                        <a className='offer_link'>
                            Sign Up Now
                        </a>
                    </div>
                    {width > 576 &&
                        <button className='close_btn position-absolute pe-3 pe-sm-0' style={{right:"0"}}><i class="fa-solid fa-x"></i></button>
                    }
                </div>
            </div> */}
            <div className="nav_container container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid" style={{paddingLeft:"0" , paddingRight:"0"}}>
                        {
                            width < 992 && 
                            <>
                            <button className="navbar-toggler" onClick={showNav}  type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                { !collapsed ? 
                                    <i class="fa-solid fa-bars bars_default"></i>                                
                                    :
                                    <i className="fa-solid fa-bars-staggered bars_staggered" ></i>
                                }
                            </button>
                            <a className="navbar-brand" href="/">SHOP.CO</a>
                            </>
                        }
                        {
                            width > 992 &&
                            <>
                            <a className="navbar-brand" href="/">SHOP.CO</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                
                                <span className="navbar-toggler-icon"></span>
                                
                            </button>
                            </>
                        }

                        { width < 992  && 
                                <div className='nav_btns'>
                                    <i className="fa fa-search" onClick={searchfocus}></i>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <i className="fa-regular fa-circle-user"></i>

                                </div>
                        }
        
                            <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
                                <div className='d-flex align-items-center nav-cont2 justify-content-between' style={{ width: '100%' }}>
                                <ul className="navbar-nav  mb-2 mb-lg-0 ">
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Shop
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Gym</a></li>
                                            <li><a class="dropdown-item" href="#">Party</a></li>
                                            <li><a class="dropdown-item" href="#">Formal</a></li>
                                            <li><a class="dropdown-item" href="#">Casual</a></li>
                                        </ul>
                                        </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">On Sale</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">New Arrivals</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Brands</a>
                                    </li>

                                </ul>
                                <form className="d-flex" role="search">
                                    <div className='search_container' style={{ position: 'relative' }}>
                                        <span className="search_icon">
                                            <i className="fa fa-search"></i>
                                        </span>
                                        <input
                                            className="form-control me-2 search_input"
                                            type="search"
                                            placeholder="Search for products..."
                                            aria-label="Search"
                                            
                                        />
                                    </div>
                                    {
                                        width>992 &&
                                    <div className='nav_btns'>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <i className="fa-regular fa-circle-user"></i>
                                    </div>
                                    }
                                    
                                </form>
                                </div>
                            </div>
                    </div>
                </nav>
            </div>
        </>
    )

}

