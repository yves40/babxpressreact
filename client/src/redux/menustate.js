/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import properties from "../services/properties";
import { setCookie, getCookie } from "../services/cookiesHelper";

const modulename = "menustate.js # ";
const initialState =      
    {
        menustate: getCookie('menustate'),       // Menu is visible or not
        screenstate: getCookie('screenstate')   // mobile, sm, md, lg, xl
    }

    function checkPopupMenuVisibility() {
        // bring floating menu to view when menu is toggled
        // Necessary in case screen has been scrolled down
        const floatnav = document.querySelector('.nav');   
        if(floatnav) {
            floatnav.scrollIntoView({ behavior: 'smooth', block: 'start' });            
        }
    }
    
    const menuSlice = createSlice(
    {
        name: "UIstate",
        initialState,
        reducers: 
        {
            setMenuState: (state, action) => {
                state.menustate = action.payload.menuvisible;
                setCookie("menustate", state.menustate);
                properties.setMenuState(state.menustate);
                checkPopupMenuVisibility();
            },
            toggleMenuState: (state) => {
                if(state.menustate === 'true') {
                    state.menustate = 'false';
                }
                else {
                    state.menustate = 'true';
                }
                setCookie("menustate", state.menustate);
                properties.setMenuState(state.menustate);
                checkPopupMenuVisibility();
            },
            setScreenstate: (state, action) => {
                state.screenstate = action.payload.screenstate;
                setCookie("screenstate", state.screenstate);
                if(state.screenstate === 'xl' || state.screenstate === 'lg') {
                    state.menustate = 'true'
                }
                if(state.menustate === undefined) {
                    state.menustate = true;
                }
                setCookie("menustate", state.menustate);
                checkPopupMenuVisibility();
                properties.setScreenstate(state.screenstate);
            }
        }
    }
)

export const { setMenuState, toggleMenuState, setScreenstate } = menuSlice.actions;
export default menuSlice.reducer;

