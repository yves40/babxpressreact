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
            },
            toggleMenuState: (state) => {
                state.menustate = !state.menustate;
                setCookie("menustate", state.menustate);
                properties.setMenuState(state.menustate);
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
                properties.setScreenstate(state.screenstate);
            }
        }
    }
)

export const { setMenuState, toggleMenuState, setScreenstate } = menuSlice.actions;
export default menuSlice.reducer;

