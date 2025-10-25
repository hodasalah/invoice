import { db } from '@/firebaseConfigs/firebase';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { ReactNode } from 'react';
export interface Invoice {
	invoiceNumber: ReactNode | Iterable<ReactNode>;
	clientId: string;
	date: ReactNode | Iterable<ReactNode>;
	total: ReactNode | Iterable<ReactNode>;
	currency: ReactNode | Iterable<ReactNode>;
	id: string;
	customer: string;
	amount: number;
	status: 'paid' | 'unpaid';
	userId: string;
}

interface InvoicesState {
	list: Invoice[];
	loading: boolean;
	error: string | null;
}

const initialState: InvoicesState = {
	list: [],
	loading: false,
	error: null,
};

export const fetchInvoicesByUser = createAsyncThunk<
	Invoice[],
	string, // userId
	{ rejectValue: string }
>('invoices/fetchInvoicesByUser', async (userId, thunkAPI) => {
	try {
		const q = query(
			collection(db, 'invoices'),
			where('userId', '==', userId),
		);
		const snapshot = await getDocs(q);

		const invoices: Invoice[] = [];
		snapshot.forEach((doc) => {
			invoices.push({
				id: doc.id,
				...(doc.data() as Omit<Invoice, 'id'>),
			});
		});
		console.log('Fetched invoices:', invoices);
		return invoices;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

const invoiceSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		setInvoices: (state, action: PayloadAction<Invoice[]>) => {
			state.list = action.payload;
		},
		addInvoice: (state, action: PayloadAction<Invoice>) => {
			state.list.push(action.payload);
		},
		removeInvoice: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter((inv) => inv.id !== action.payload);
		},
		clearInvoices: (state) => {
			state.list = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInvoicesByUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchInvoicesByUser.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(fetchInvoicesByUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch invoices';
			});
	},
});

export const { setInvoices, addInvoice, removeInvoice, clearInvoices } =
	invoiceSlice.actions;
export default invoiceSlice.reducer;
