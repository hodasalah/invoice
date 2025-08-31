import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';

const initialState = {
	lang: 'ar',
};

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		toggleLanguage: (state) => {
			const newLang = state.lang === 'ar' ? 'en' : 'ar';
			state.lang = newLang;
			i18n.changeLanguage(newLang);
			document.documentElement.lang = newLang;
			document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
		},
		setLanguage: (state, action) => {
			state.lang = action.payload;
			i18n.changeLanguage(action.payload);
			document.documentElement.lang = action.payload;
			document.documentElement.dir =
				action.payload === 'ar' ? 'rtl' : 'ltr';
		},
	},
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
