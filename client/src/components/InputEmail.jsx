import { useEffect, useRef } from 'react';
import { checkEmail } from '../services/controls.js';

export default function InputEmail({ref, componentid, label, parentHandler, timeout=800}) {
    
    const delayedInput = useRef(null);
    const module = "InputEmail";
    const controlicon = useRef('controlicon');


    useEffect( () => {
    }, [] );

    function resetInput() {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        parentHandler('');
        ref.current.value = '';
    }

    function checkInput(e) {
        if(e.target.value === '') {
            return;
        }
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                checkEmail(e.target.value);
                controlicon.current.src = "/svg/thumbs-up-solid.svg";
                controlicon.current.className = 'svg-green24';
                parentHandler(e.target.value);
            }
            catch(error){ 
                controlicon.current.src = "/svg/thumbs-down-solid.svg";
                controlicon.current.className = 'svg-red24';
                console.log(`*** ${module} ${error.message}`);
            }
        }, timeout);
    }

    return (
        <>
            <label className='form__label mt-2' htmlFor={componentid}>{label} *</label>
            <div className='flex items-center justify-center'>
                <input className='form__input' onChange={checkInput}
                    ref={ref}
                    type="text" 
                    name={componentid} 
                    id={componentid} 
                />
                <span style={{ marginLeft: "-40px" }}>
                    <img ref={controlicon} className='svg-red24' src="svg/thumbs-down-solid.svg" alt="" cursor="pointer" onClick={resetInput}/>
                </span>
            </div>
        </>
    )
}