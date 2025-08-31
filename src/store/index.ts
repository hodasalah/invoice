import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoices/invoiceSlice';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/theme/languageSlice';

export const store = configureStore({
	reducer: {
		invoices: invoiceReducer,
		theme: themeReducer,
		language: languageReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
