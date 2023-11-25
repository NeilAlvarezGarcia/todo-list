import { initializeApp } from 'firebase/app';
import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
} from '@/util/const';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
