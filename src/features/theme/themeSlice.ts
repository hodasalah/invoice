import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ThemeState = 'light' | 'dark';
const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;


const initialState: 'light' | 'dark' = savedTheme || 'light';


const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ThemeState>) => {
			const newTheme = action.payload;
			localStorage.setItem('theme', newTheme);
			const html = document.documentElement;
			if (newTheme === 'dark') {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
			return newTheme;
		},
		toggleTheme: (state) => {
			const newTheme: ThemeState = state === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			document.documentElement.classList.toggle(
				'dark',
				newTheme === 'dark',
			);
			return newTheme;
		},
	},
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
