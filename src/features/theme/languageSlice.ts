import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type LangState = 'en' | 'ar';

const initialState: LangState =
	(localStorage.getItem('lang') as LangState) || 'en';

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setLanguage: (_, action: PayloadAction<LangState>) => {
			localStorage.setItem('lang', action.payload);
			document.documentElement.lang = action.payload;
			document.documentElement.dir =
				action.payload === 'ar' ? 'rtl' : 'ltr';
			return action.payload;
		},
		toggleLanguage: (state) => {
			const newLang = state === 'ar' ? 'en' : 'ar';
			localStorage.setItem('lang', newLang);
			document.documentElement.lang = newLang;
			document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
			return newLang;
		},
	},
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
