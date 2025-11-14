// src/features/clients/clientsSlice.ts

import {
	addData,
	deleteData,
	getData,
	updateData,
} from '@/firebaseConfigs/firestore';
import type { Client } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ClientsState {
	clients: Client[];
	loading: boolean;
	error: string | null;
}

const initialState: ClientsState = {
	clients: [],
	loading: false,
	error: null,
};

// ✅ 1) جلب العملاء حسب userId
export const fetchClientsByUser = createAsyncThunk(
	'clients/fetchClientsByUser',
	async (userId: string, { rejectWithValue }) => {
		try {
			const data = (await getData('clients')) as Client[];
			return data.filter((c) => c.userId === userId);
		} catch (err) {
			return rejectWithValue('Error fetching clients');
		}
	},
);

// ✅ 2) إضافة عميل جديد
export const addClient = createAsyncThunk(
	'clients/addClient',
	async (client: Client, { rejectWithValue }) => {
		try {
			const newClient = await addData<Client>('clients', client);
			return newClient; // يرجع id تلقائيًا
		} catch (err) {
			return rejectWithValue('Error adding client');
		}
	},
);

// ✅ 3) تحديث بيانات عميل
export const updateClient = createAsyncThunk(
	'clients/updateClient',
	async (
		{ id, data }: { id: string; data: Partial<Client> },
		{ rejectWithValue },
	) => {
		try {
			await updateData<Client>('clients', id, data);
			return { id, data };
		} catch (err) {
			return rejectWithValue('Error updating client');
		}
	},
);

// ✅ 4) حذف عميل
export const deleteClientById = createAsyncThunk(
	'clients/deleteClientById',
	async (id: string, { rejectWithValue }) => {
		try {
			await deleteData('clients', id);
			return id;
		} catch (err) {
			return rejectWithValue('Error deleting client');
		}
	},
);

const clientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		// Fetch
		builder.addCase(fetchClientsByUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchClientsByUser.fulfilled, (state, action) => {
			state.loading = false;
			state.clients = action.payload;
		});
		builder.addCase(fetchClientsByUser.rejected, (state) => {
			state.loading = false;
			state.error = 'Failed to load clients';
		});

		// Add
		builder.addCase(addClient.fulfilled, (state, action) => {
			state.clients.push(action.payload);
		});

		// Update
		builder.addCase(updateClient.fulfilled, (state, action) => {
			const { id, data } = action.payload;
			state.clients = state.clients.map((c) =>
				c.id === id ? { ...c, ...data } : c,
			);
		});

		// Delete
		builder.addCase(deleteClientById.fulfilled, (state, action) => {
			state.clients = state.clients.filter(
				(c) => c.id !== action.payload,
			);
		});
	},
});

export default clientsSlice.reducer;
