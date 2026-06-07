import type { User } from 'firebase/auth';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// تسجيل مستخدم جديد
export const signup = async (
	email: string,
	password: string,
): Promise<User> => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password,
	);
	return userCredential.user;
}

export const login = async (email: string, password: string) => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password,
	);
	const user = userCredential.user;

	const userDoc = await getDoc(doc(db, 'users', user.uid));

	if (!userDoc.exists()) {
		throw new Error('User record not found in Firestore');
	}

	const userData = userDoc.data();
	console.log('📌 Logged in user data:');
	console.table(userData);
	return { ...user, ...userData };
};

// تسجيل خروج
export const logout = async () => {
	await signOut(auth);
};
