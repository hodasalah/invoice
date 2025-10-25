import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoices/invoiceSlice';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/theme/languageSlice';
import userReducer from '../features/user/userSlice';
import clientsReducer from '../features/clients/clientsSlice';

export const store = configureStore({
	reducer: {
		invoices: invoiceReducer,
		theme: themeReducer,
		language: languageReducer,
		user: userReducer,
		clients: clientsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
