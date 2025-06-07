import React from 'react'

import visa from "../assests/images/footer/Badge.png"
import mastercard from "../assests/images/footer/Badge (1).png"
import paypal from "../assests/images/footer/Badge (2).png"
import iphonepay from "../assests/images/footer/Badge (3).png"
import googlepay from "../assests/images/footer/Badge (4).png"
export default function Footer(){
    return(
        <>
        <div className='footer_section'>
            <div className='container footer_top_container'>
                <div className='footer_top row justify-content-between'>
                    <div className='footer_top_left col-lg-6'>
                        <h1 className='footer_top_title'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                    </div>
                    <div className='footer_top_right col-lg-6' >
                        <form  className='email_subs f-flex align-items-end'>
                            <div className='footer_input_container'>
                                <span style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '55%',
                                    transform: 'translateY(-50%)',
                                    color: '#aaa',
                                    pointerEvents: 'none'
                                }}>
                                    <i className="fa-regular fa-envelope" style={{fontSize:"20px"}}></i>
                                </span>
                                <input
                                    placeholder='Enter your email address'
                                    className='subs_input form-control mb-3'
                                    style={{paddingLeft: '43px'}}
                                />
                            </div>
                            <div className='footer_button_container'>
                                <button type='submit' className='btn subs_btn'>Subscribe to Newsletter</button>
                            </div>
                        </form>
                    </div>
                    
                </div>      
            </div>
            <div className='footer_container container'>
                <div className='footer_content row row-cols-2 row-cols-sm-2 row-cols-xl-5'>
                    <div className='col-12 footer_left_content mb-3'>
                        <h1 className='footer_left_title'>SHOP.CO</h1>
                        <p className='footer_left_text'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                        <div className='footer_left_icons'>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer_icon_link" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer_icon_link" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer_icon_link" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer_icon_link" aria-label="GitHub">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                    <div className='col footer_lists  mb-3'>
                        <h5>Company</h5>
                        <ul className='nav flex-column'>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Works</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Career</a></li>
                        </ul>
                    </div>
                    <div className='col footer_lists mb-3'>
                        <h5>Help</h5>
                        <ul className='nav flex-column'>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Customer Support</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Delivery Details</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Terms & Conditions</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className='col footer_lists mb-3'>
                        <h5>FAQ</h5>
                        <ul className='nav flex-column'>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Account</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Manage Deliveries</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Orders</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Payments</a></li>
                        </ul>
                    </div>
                    <div className='col footer_lists  mb-3'>
                        <h5>Resources</h5>
                        <ul className='nav flex-column'>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Free eBooks</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Development Tutorial</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">How to - Blog</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Youtube Playlist</a></li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className='footer_bottom d-flex align-items-center justify-content-between flex-wrap'>
                    <p className='footer_bottom_left'>
                        Shop.co © 2000-2023, All Rights Reserved
                    </p>
                    <div className='footer_bottom_right'>
                        <img src ={visa} alt="footer_img"/>
                        <img src ={mastercard} alt="footer_img"/>
                        <img src ={paypal} alt="footer_img"/>
                        <img src ={iphonepay} alt="footer_img"/>
                        <img src ={googlepay} alt="footer_img"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}