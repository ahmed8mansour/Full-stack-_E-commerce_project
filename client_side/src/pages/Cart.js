import React from 'react'


import PageLayout from '../Layouts/PageLayout'
import cartImage from "../assests/images/Cart/image 8.svg"
import trashIcon from "../assests/images/Cart/Frame (1).svg"
import useWindowDimensions from '../hooks/WindowDimentsions';

import image3 from "../assests/images/landing_page/57234b01d5fcac5632cf6823570ca2d1d53d7d73 (1).png"
import image4 from "../assests/images/landing_page/6115920b12942762aefb7c7ac954e78b76284504 (1).png"
import image5 from "../assests/images//landing_page/769b9d60ff941dde9bc0e54431b8d8fe3182f5e9 (1).png"


export default function Cart(){
    const [ProductCounter, setProductCounter] = React.useState(1);
    const {width , height} = useWindowDimensions()
    const [quantities, setQuantities] = React.useState({});
    

    // حاليا هنحط الاندكس لكن هو غلط انت بتحط الايدي تبع الداتا بيز لما تعمل استدعاء للعنصر من تحت

    const handleIncrease = (id) => {
      setQuantities((prev) => ({
        ...prev,
        [id]: (prev[id] || 1) + 1,
      }));
    };

    const handleDecrease = (id) => {
      setQuantities((prev) => ({
        ...prev,
        [id]: Math.max((prev[id] || 1) - 1, 1),
      }));
    };

    

    return(
        <PageLayout>
            <div className='cart_section my_section'>
                <div className='cart_container container'>
                    <nav aria-label="breadcrumb"  className='nav_crumb'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page" >Cart</li>
                            </ol>
                    </nav>
                    <div className='cart_content'>
                        <h1 className="cart_title">Your cart</h1>
                        <div className='cart_content_bottom'>

                            <div className='row gx-3'>

                                <div className=' col-lg-7'>
                                    <div className='cart_content_left'>
                                        {
                                            [cartImage,image3,image4].map((elment , index ,arr) => (
                                                <div className="card mb-3" key={elment.id}>
                                                    <div className="row g-0"  style={{
                                                        paddingBottom: index !== arr.length-1  ? "30px" : undefined ,
                                                        borderBottom: index !== arr.length-1  ? "1px solid rgba(0, 0, 0, 0.1)" : undefined
                                                        
                                                        }}>
                                                        <div className="col-sm-3 col-4 ">
                                                            <div className='w-100 h-100 cart_image'
                                                                style={{
                                                                backgroundImage:`url("${elment}")`,
                                                                objectFit:"cover",
                                                                backgroundSize:"contain",
                                                                backgroundPosition:"center",
                                                                backgroundRepeat:"no-repeat",
                                                                backgroundColor:"rgba(240, 238, 237, 1)",
                                                                borderRadius:"8px"
                                                            }}
                                                            ></div>
                                                            {/* <img src={cartImage} className=" w-100 h-100 object-fit-cover rounded-start" alt="..."/> */}
                                                        </div>
                                                        <div className="col-sm-9 col-8 d-flex flex-column">
                                                            <div className="card-body">
                                                                <h5 className="card-title d-flex align-items-center justify-content-between" style={{gap: width < 400 ? "10px" : "unset"}}>
                                                                    <span className='text-truncate'>Gradient Graphic T-shirt</span>
                                                                    <img src={trashIcon} style={{cursor:"pointer"}} alt='trash_icon' width={"24px"} height={"24px"} />
                                                                </h5>
                                                                <p className="card-text" style={{marginBottom:"0"}}><span>Size:</span> <span style={{color:"var(--textGray)"}}>Large</span> </p>
                                                                <p className="card-text" style={{marginBottom:"0"}}><span>Size:</span> <span style={{color:"var(--textGray)"}}>Large</span> </p>
                                                                
                                                            </div>
                                                            <div className='card_bottom d-flex align-items-center justify-content-between'>
                                                                <h2 className='card_botttom_price'> $180</h2>
                                                                <div className='counter_btns d-flex align-items-center justify-content-between'>
                                                                    {/* index ===>  elment.id */}
                                                                    <button className='btn counter_span minus' onClick={() => handleDecrease(index)}>-</button>
                                                                    <span className='counter_span counter_indicator'>{quantities[index] || 1 }</span>
                                                                    <button className='btn counter_span plus'  onClick={() => handleIncrease(index)}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='col-lg-5'>
                                    <div className='cart_content_right'>
                                        <h1 className='cart_right_title'>Order Summary</h1>
                                        <div className='order_summary'>
                                            <div className='order_subtotal order_summary_element d-flex align-items-center justify-content-between'>
                                                <span className='order_summary_left'>Subtotal</span>
                                                <span className='order_summary_right'>$565</span>
                                            </div>
                                            <div className='order_discount order_summary_element d-flex align-items-center justify-content-between'>
                                                <span className='order_summary_left'>Discount (-20%)</span>
                                                <span className='order_summary_right'>-$113</span>
                                            </div>
                                            <div className='order_delivery order_summary_element d-flex align-items-center justify-content-between'>
                                                <span className='order_summary_left'>Delivery Fee</span>
                                                <span className='order_summary_right'>$$15</span>
                                            </div>
                                            <hr/>
                                            <div className='order_total order_summary_element d-flex align-items-center justify-content-between'>
                                                <span className='order_summary_left'>Total</span>
                                                <span className='order_summary_right'>$467</span>
                                            </div>
                                        </div>
                                        <div className='promo_code_area row gx-3' style={{marginTop:"10px"}}>
                                                <div className='col-9'>
                                                    <div className='promo_input_container position-relative' >
                                                        <span style={{
                                                            position: 'absolute',
                                                            left: '14px',
                                                            top: '55%',
                                                            transform: 'translateY(-50%)',
                                                            color: '#aaa',
                                                            pointerEvents: 'none'
                                                        }}>
                                                            <i className="fas fa-tag" style={{fontSize:"20px"}}></i>
                                                        </span>
                                                        <input
                                                            placeholder='Add promo code'
                                                            className='subs_input form-control mb-3'
                                                            style={{paddingLeft: '43px'}}
                                                            type='text'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <button className='promo_apply_btn btn  w-100'> 
                                                        Apply
                                                    </button>
                                                </div>
                                                <button className='order_check_btn btn'>Go to Checkout <i class="fa-solid fa-arrow-right"></i> </button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}