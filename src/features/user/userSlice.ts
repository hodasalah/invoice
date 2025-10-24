import { auth, db } from '@/firebaseConfigs/firebase';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
	saveUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '@/utils/persistUser';

interface UserState {
	currentUser: any | null;
	loading: boolean;
	error: string | null;
}

// ✅ استرجاع المستخدم عند بداية التطبيق
const initialState: UserState = {
	currentUser: getUserFromLocalStorage(),
	loading: false,
	error: null,
};

// تسجيل الدخول
export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (
		{ email, password }: { email: string; password: string },
		thunkAPI,
	) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;

			const userDoc = await getDoc(doc(db, 'users', user.uid));
			if (!userDoc.exists())
				throw new Error('User record not found in Firestore');

			const userData = userDoc.data();

			const safeUser = {
				uid: user.uid,
				email: user.email,
				firstName: userData.firstName,
				lastName: userData.lastName,
				role: userData.role,
				companyName: userData.companyName,
				address: userData.address,
				vatNumber: userData.vatNumber,
				crNumber: userData.crNumber,
				avatar: userData.avatar,
				phone: userData.phone,
				createdAt: userData.createdAt,
				accessToken: user.accessToken,
			};

			// ✅ حفظ المستخدم في localStorage
			saveUserToLocalStorage(safeUser);

			return safeUser;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

// تسجيل الخروج
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
	await signOut(auth);
	removeUserFromLocalStorage();
	return null;
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<any>) => {
			state.currentUser = action.payload;
			saveUserToLocalStorage(action.payload);
		},
		clearUser: (state) => {
			state.currentUser = null;
			removeUserFromLocalStorage();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.currentUser = null;
			});
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
