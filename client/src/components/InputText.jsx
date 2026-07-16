/* eslint-disable no-unused-vars */
import { forwardRef } from 'react';
import { useRef, useState } from 'react'

export default function InputText({ref,componentid, label, parentHandler, timeout=800})
{
    const delayedInput = useRef(null);
    
    function checkInput(e) {
        e.preventDefault();
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                parentHandler(e.target.value);
            }
            catch(error){ 
                console.error(`checkInput() error: ${error.message}`);
            }
        }, timeout);
    }

    return (
        <>
            <label className='form__label' htmlFor={componentid}>{label}</label>
            <div className='form__div'>
                <input className='form__input' onChange={checkInput}
                    ref={ref} 
                    type="text" 
                    name={componentid} 
                    id={componentid}
                />
            </div>
        </>
    )
}