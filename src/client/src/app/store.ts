import { configureStore } from '@reduxjs/toolkit';
import { languageSlice } from '../redux/languageSlice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { commonSlice } from '../redux/commonSlice';

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    language: languageSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
