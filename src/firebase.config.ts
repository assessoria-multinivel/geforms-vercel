import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

require('dotenv').config();

const firebaseConfig = {
  apiKey: `${process.env.API_KEY_FB}`,
  authDomain: `${process.env.AUTH_DOMAIN_FB}`,
  projectId: `${process.env.PROJECT_ID_FB}`,
  storageBucket: `${process.env.STORAGE_BUCKET_FB}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID_FB}`,
  appId: `${process.env.APP_ID_FB}`,
  measurementId: `${process.env.MEASUREMENT_ID_FB}`,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const firestore = getFirestore(app);
