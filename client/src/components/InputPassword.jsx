import { useRef, useEffect } from 'react'
import {checkPassword} from '../services/controls.js';

export default function InputPassword({ref, componentid, label, parentHandler, timeout=800}) {
    
    const delayedInput = useRef(null);
    const module = "InputPassword";
    const controlicon = useRef('controlicon');
    const passwordinput = useRef('passwordinput');


    useEffect( () => {
        controlicon.current.hidden = true;
    }, [] );

    
    function clearInput() {
        controlicon.current.hidden = true;
        passwordinput.current.value = '';
        parentHandler('');
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
                controlicon.current.src = "/png/check-mark-32.png";
                parentHandler(e.target.value);
            }
            catch(error){ 
                controlicon.current.src = "/png/cross-mark-32.png";
                console.log(`*** ${module} ${error.message}`);
            }
        }, timeout);
    }

    return (
        <>
            <label className='form__label' htmlFor={componentid} >{label} *</label>
            <div className='form__div'>
                <input className='form__input' onChange={checkInput}
                    type="password" 
                    ref={ref}
                    name={componentid} 
                    id={componentid} 
                    placeholder='Au moins 8 caractères, 1 chiffre, 1 majuscule'
                />
                <a href="#" tabIndex="-1">
                    <img ref={controlicon} 
                        onClick={clearInput}                    
                        src="/png/cross-mark-32.png" 
                        alt="info email status" 
                        className="inline w-6 h-6  mx-2 mb-1"/>
                </a>
            </div>
        </>
    )
}