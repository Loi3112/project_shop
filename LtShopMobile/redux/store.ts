import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from './slides/orderSlide';

// Định nghĩa RootState
const rootReducer = combineReducers({
    order: orderReducer,
});

// Xuất RootState
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store; 
