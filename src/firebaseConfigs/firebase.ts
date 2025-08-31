import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDsPRcLgNWwdARnAKHA5GC8_EL1buadWRg',
	authDomain: 'fatoorty-cf0b1.firebaseapp.com',
	projectId: 'fatoorty-cf0b1',
	storageBucket: 'fatoorty-cf0b1.firebasestorage.app',
	messagingSenderId: '856511024397',
	appId: '1:856511024397:web:ca0bae9818bd8474c73444',
	measurementId: 'G-J7RGRLBKLV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// exported
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
