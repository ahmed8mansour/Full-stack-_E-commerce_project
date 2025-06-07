import React from 'react'
export default function Counter(){
    return(
        <div className=' counter_btns d-flex align-items-center justify-content-between'>
                                                    <button className='btn counter_span minus'>-</button>
                                                    <span className='counter_span counter_indicator'>2</span>
                                                    <button className='btn counter_span plus'>+</button>
                                                </div>
    )
}