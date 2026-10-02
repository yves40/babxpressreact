import { useRef, useEffect } from 'react'
import {checkPassword} from '../services/controls.js';

export default function InputPassword({ref, componentid, label, parentHandler, timeout=800}) {
    
    const delayedInput = useRef(null);
    const module = "InputPassword";
    const controlicon = useRef('controlicon');

    useEffect( () => {
    }, [] );

    
    function resetInput() {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        parentHandler('');
        ref.current.value = '';
        controlicon.current.src = "/svg/thumbs-down-solid.svg";
        controlicon.current.className = 'svg-red24';
    }

    function checkInput(e) {
        if(e.target.value === '') {
            controlicon.current.hidden = true;
            return;
        }
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            controlicon.current.hidden = false;
            try {
                checkPassword(e.target.value);
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
            <label className='form__label' htmlFor={componentid} >{label} *</label>
            <div className='flex items-center justify-center'>
                <input className='form__input' onChange={checkInput}
                    type="password" 
                    ref={ref}
                    name={componentid} 
                    id={componentid} 
                    placeholder='Au moins 8 caractères, 1 chiffre, 1 majuscule'
                />
                <span style={{ marginLeft: "-40px" }}>
                    <img ref={controlicon} className='svg-red24' src="svg/thumbs-down-solid.svg" alt="" cursor="pointer" onClick={resetInput}/>
                </span>
            </div>
        </>
    )
}