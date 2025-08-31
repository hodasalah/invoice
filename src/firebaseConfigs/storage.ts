// src/firebase/storage.ts
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

// رفع ملف
export const uploadFile = async (path: string, file: File) => {
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, file);
	const url = await getDownloadURL(storageRef);
	return url;
};
