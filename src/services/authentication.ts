import { auth } from '@/config/firebase';
import { FormData } from '@/interfaces';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

async function createUser({ email, password }: FormData) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

async function loginUser({ email, password }: FormData) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function logoutUser() {
  return await signOut(auth);
}

export { loginUser, createUser, logoutUser };
