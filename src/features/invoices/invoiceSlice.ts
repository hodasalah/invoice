import { db } from '@/firebaseConfigs/firebase';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
export interface Invoice {
	id: string;
	userId: string;
	invoiceNumber: string;
	clientId: string;
	date: string;
	total: number;
	currency: string;
	customer: string;
	amount: number;
	status: 'paid' | 'unpaid';
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
		editInvoice: (state, action: PayloadAction<Invoice>) => {
			const index = state.list.findIndex(
				(inv) => inv.id === action.payload.id,
			);
			if (index !== -1) {
				state.list[index] = action.payload;
			}
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

export const {
	setInvoices,
	addInvoice,
	removeInvoice,
	clearInvoices,
	editInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
