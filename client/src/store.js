import {configureStore} from "@reduxjs/toolkit"
import UIstateReducer from './redux/menustate'


const store = configureStore({
    reducer: { UIstate: UIstateReducer },
});

export {store}