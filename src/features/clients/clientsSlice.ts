// clientsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/firebaseConfigs/firebase';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	query,
	where,
} from 'firebase/firestore';
import type { Client } from '@/types/types';

// ✅ جلب العملاء حسب المستخدم
export const fetchClientsByUser = createAsyncThunk<Client[], string>(
	'clients/fetchClientsByUser',
	async (userId: string): Promise<Client[]> => {
		const q = query(
			collection(db, 'clients'),
			where('userId', '==', userId),
		);
		const snapshot = await getDocs(q);
		const clients = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as Client[];
		return clients;
	},
);

// ✅ إضافة عميل جديد
export const addClient = createAsyncThunk<
	Client,
	{ userId: string; data: Partial<Client> }
>('clients/addClient', async ({ userId, data }) => {
	const newClient = {
		...data,
		userId,
		createdAt: new Date().toISOString(),
	};

	const docRef = await addDoc(collection(db, 'clients'), newClient);
	return { id: docRef.id, ...newClient } as Client;
});

// ✅ تعديل عميل
export const updateClient = createAsyncThunk<
	Client,
	{ id: string; data: Partial<Client> }
>('clients/updateClient', async ({ id, data }) => {
	const ref = doc(db, 'clients', id);
	await updateDoc(ref, data);

	return { id, ...data } as Client;
});

// ✅ حذف عميل
export const deleteClient = createAsyncThunk<string, string>(
	'clients/deleteClient',
	async (id: string) => {
		await deleteDoc(doc(db, 'clients', id));
		return id;
	},
);

const clientsSlice = createSlice({
	name: 'clients',
	initialState: { list: [] as Client[], loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchClientsByUser.fulfilled, (state, action) => {
			state.list = action.payload;
		});

		builder.addCase(addClient.fulfilled, (state, action) => {
			state.list.push(action.payload);
		});

		builder.addCase(updateClient.fulfilled, (state, action) => {
			const index = state.list.findIndex(
				(c) => c.id === action.payload.id,
			);
			if (index !== -1) {
				state.list[index] = { ...state.list[index], ...action.payload };
			}
		});

		builder.addCase(deleteClient.fulfilled, (state, action) => {
			state.list = state.list.filter((c) => c.id !== action.payload);
		});
	},
});

export default clientsSlice.reducer;
