import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mode: 'light', // or "dark"
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
			if (state.mode === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		},
		setTheme: (state, action) => {
			state.mode = action.payload;
			if (action.payload === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
