// src/firebase/firestore.ts
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// إضافة مستند جديد
export const addData = async (collectionName: string, data: any) => {
	const colRef = collection(db, collectionName);
	const docRef = await addDoc(colRef, data);
	return docRef.id;
};

// قراءة كل المستندات
export const getData = async (collectionName: string) => {
	const colRef = collection(db, collectionName);
	const snapshot = await getDocs(colRef);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// قراءة مستند واحد
export const getDocById = async (collectionName: string, id: string) => {
	const docRef = doc(db, collectionName, id);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// تحديث مستند
export const updateData = async (
	collectionName: string,
	id: string,
	data: any,
) => {
	const docRef = doc(db, collectionName, id);
	await updateDoc(docRef, data);
};

// حذف مستند
export const deleteData = async (collectionName: string, id: string) => {
	const docRef = doc(db, collectionName, id);
	await deleteDoc(docRef);
};
