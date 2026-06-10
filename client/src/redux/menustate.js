/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import properties from "../services/properties";
import { getSessionData, getLocalData } from "../services/browserStorage";


const modulename = "menustate.js # ";
const initialState =      
    {
        menustate: true,       // Menu is visible or not
        screenstate: 'mobile'   // mobile, sm, md, lg, xl
    }
    
    const menuSlice = createSlice(
    {
        name: "UIstate",
        initialState,
        reducers: 
        {
            setMenuState: (state, action) => {
                state.menustate = action.payload.menuvisible;
                properties.setMenuState(state.menustate);
            },
            toggleMenuState: (state) => {
                state.menustate = !state.menustate;
                properties.setMenuState(state.menustate);
            },
            setScreenstate: (state, action) => {
                state.screenstate = action.payload.screenstate;
                properties.setScreenstate(state.screenstate);
            }
        }
    }
)

export const { setMenuState, toggleMenuState, setScreenstate } = menuSlice.actions;
export default menuSlice.reducer;

