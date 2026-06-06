import {configureStore} from "@reduxjs/toolkit"
import menustateReducer from './redux/menustate'


const store = configureStore({
    reducer: { menustate: menustateReducer },
});

export {store}