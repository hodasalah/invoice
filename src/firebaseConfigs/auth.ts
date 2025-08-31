import type { User } from 'firebase/auth';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth } from './firebase';

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
};

// تسجيل دخول
export const login = async (email: string, password: string): Promise<User> => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password,
	);
	return userCredential.user;
};

// تسجيل خروج
export const logout = async () => {
	await signOut(auth);
};
