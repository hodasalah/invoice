import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
	setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

import type { DocumentData } from 'firebase/firestore';

// ✅ إضافة مستند جديد وإرجاع البيانات مع id
export const addData = async <T extends DocumentData>(collectionName: string, data: T) => {
	const colRef = collection(db, collectionName);
	const docRef = await addDoc(colRef, data);
	return { id: docRef.id, ...data };
};

// ✅ قراءة كل المستندات مع id
export const getData = async (collectionName: string) => {
	const colRef = collection(db, collectionName);
	const snapshot = await getDocs(colRef);
	return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ✅ قراءة مستند واحد
export const getDocById = async (collectionName: string, id: string) => {
	const docRef = doc(db, collectionName, id);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// ✅ تحديث مستند
export const updateData = async <T extends DocumentData>(
	collectionName: string,
	id: string,
	data: Partial<T>,
) => {
	const docRef = doc(db, collectionName, id);
	await updateDoc(docRef, data as { [x: string]: any });
};

// ✅ حذف مستند
export const deleteData = async (collectionName: string, id: string) => {
	const docRef = doc(db, collectionName, id);
	await deleteDoc(docRef);
};

// ✅ تخزين مستخدم باستخدام uid
export const setUserData = async <T extends DocumentData>(uid: string, data: T) => {
	const docRef = doc(db, 'users', uid);
	await setDoc(docRef, data);
};
