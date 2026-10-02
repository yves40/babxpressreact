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

    function resetInput() {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        parentHandler('');
        ref.current.value = '';
    }

    return (
        <>
            <label className='form__label' htmlFor={componentid}>{label}</label>
            <div className='flex items-center justify-center'>
                <input className='form__input' onChange={checkInput}
                    ref={ref} 
                    type="text" 
                    name={componentid} 
                    id={componentid}
                    />
                <span style={{ marginLeft: "-40px" }}>
                    <img className='svg-white32 ' src="svg/close-outline.svg" alt="" cursor="pointer"  onClick={resetInput}/>
                </span>
            </div>
        </>
    )
}