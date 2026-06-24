/* eslint-disable no-unused-vars */
import { useRef } from 'react'

export default function InputText({componentid, label, parentHandler,
    timeout=800, key=new Date().getTime(), placeholder=""}) 
{
    const delayedInput = useRef(null);
    const feedback = useRef('feedback');
    
    function checkInput(e) {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                feedback.current.textContent = '';
                feedback.current.hidden = true;
                parentHandler(e.target.value);
            }
            catch(error){ 
                feedback.current.textContent = error.message;
                feedback.current.hidden = false;
            }
        }, timeout);
    }

    return (
        <>
            <label className='form__label' htmlFor={componentid}>{label}</label>
            <div className='form__div'>
                <input className='form__input' onChange={checkInput}
                    type="text" 
                    name={componentid} 
                    id={componentid}
                    key={key}
                    placeholder={placeholder}
                />
            </div>
            <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
        </>
    )
}