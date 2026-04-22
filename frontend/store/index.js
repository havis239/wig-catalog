import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import articleReducer from './slices/articleSlice';
import authReducer from './slices/authSlice';
import inquiryReducer from './slices/inquirySlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    article: articleReducer,
    auth: authReducer,
    inquiry: inquiryReducer,
  },
});
