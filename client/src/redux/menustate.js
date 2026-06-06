/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import properties from "../services/properties";

const modulename = "menustate.js # ";
const initialState =      
    {
        menustate: properties.getMenuStatus(),       // Menu is visible or not
        screenstate: properties.getActiveBreakpoint() 
    }
    
    const menuSlice = createSlice(
    {
        name: "UIstate",
        initialState,
        reducers: 
        {
            setMenuState: (state, action) => {
                state.menustate = action.payload.menuvisible;
            },
            setScreenstate: (state, action) => {
                state.screenstate = action.payload.screenstate;
            }
        }
    }
)
export const { setMenuState, setScreenstate } = menuSlice.actions;
export default menuSlice.reducer;

