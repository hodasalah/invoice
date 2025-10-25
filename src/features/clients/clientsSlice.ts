// clientsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/firebaseConfigs/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

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
		}));
		return clients;
	},
);

type Client = { id: string; [key: string]: any };

const clientsSlice = createSlice({
	name: 'clients',
	initialState: { list: [] as Client[], loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchClientsByUser.fulfilled, (state, action) => {
			state.list = action.payload;
		});
	},
});

export default clientsSlice.reducer;
