import React from 'react'
import { useParams , useLocation, Outlet , Link , NavLink, useNavigate} from "react-router-dom";

import PageLayout from '../Layouts/PageLayout'
import googleImage from '../assests/images/google.svg'

export default function Auth(){

// ====================================================
// ====================================================
// hooks calling
    const {pagetypePara} = useParams()
    const inputRef1 = React.useRef()
    const inputRef2 = React.useRef()
    const inputRef3 = React.useRef()


// ====================================================
// ====================================================
// useState and variable declartion

    const [pagetype , Setpgetype] = React.useState(
        (pagetypePara == "signin" ? 1 : 2) // signin = 1 , signup = 2
    )
    console.log(pagetype)
    console.log(pagetypePara)


// ====================================================
// ====================================================
// UseEFFects 

    React.useEffect(() => {
        Setpgetype(pagetypePara === "signin" ? 1 : 2);
    }, [pagetypePara]);

// ====================================================
// ====================================================
// conditions ( rendering )


// ====================================================
// ====================================================
// data processing function

    

    return(
                <PageLayout>
                    <div className='auth_page my_section'>
                        <div className='auth_container container h-100 w-100 d-flex align-items-center justify-content-center'>
                            <div className='auth_content'>
                                <h1 className='auth_content_title text-center'>{pagetype == 1 ? "Log in": "Sign up" }</h1>
                                <p className='auth_content_pretitle text-center'>Welcome user, please sign {pagetype == 1 ? "in": "up" } to continue</p>
                                <div className='social_auth'>
                                    <div className='social_auth_content d-flex flex-wrap align-items-center justify-content-between'>
                                        <button className='btn google_btn w-100'>
                                            <img src={googleImage} alt='googleimage' width={24} height={24}/>
                                            <span className='logo_text ms-2'>Sign {pagetype == 1 ? "in": "up" } With Google</span>
                                        </button>
                                        <button className='btn google_btn w-100 mt-2'>
                                            <i class="fa-brands fa-github" style={{fontSize:"24px"}}></i>
                                            <span className='logo_text ms-2'>Sign {pagetype == 1 ? "in": "up" } With GitHub</span>
                                        </button>
                                    </div>
                                    
                                </div>
                                <p className="separator"><span>or</span></p>

                                <form className='auth_input_layout'>
                                    {pagetype == 2 &&
                                    <div class="form-floating  mb-3">
                                        <input type="text" class="form-control" required ref={inputRef1} autocomplete="on" id="floatingInput1" placeholder="name"/>
                                        <label for="floatingInput">Full Name</label>
                                    </div>
                                    }
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" required ref={inputRef2} autocomplete="on" id="floatingInput2" placeholder="name@example.com"/>
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" required ref={inputRef3} autocomplete="on" id="floatingPassword3" placeholder="Password"/>
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    {pagetype == 1 &&
                                    <a className="forgot_password_link mt-3 text-primary" href='/'>
                                        Forgot Password?
                                    </a>
                                    }
                                    <button className='btn auth_form_btn w-100 mt-3'>{pagetype == 1 ? "Sign in" : "Sign up"}</button>
                                </form>
                                <div className='auth_switch_area mt-4'>
                                    {pagetype == 1  ?  
                                    <p>Don't have an account? <Link className='switch_link mt-3 text-primary' to="/auth/signup">Sign Up</Link></p>
                                    : 
                                    <p>Already have an account? <Link className='switch_link mt-3 text-primary' to="/auth/signin">Sign In</Link></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </PageLayout>
    )
}