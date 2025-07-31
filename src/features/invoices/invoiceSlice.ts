import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
	id: string;
	customer: string;
	amount: number;
	status: 'paid' | 'unpaid';
}

interface InvoicesState {
	list: Invoice[];
}

const initialState: InvoicesState = {
	list: [],
};

const invoiceSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		addInvoice: (state, action: PayloadAction<Invoice>) => {
			state.list.push(action.payload);
		},

		removeInvoice: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter((inv) => inv.id !== action.payload);
		},
	},
});

export const { addInvoice, removeInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
