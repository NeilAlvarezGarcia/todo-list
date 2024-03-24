import { auth } from '@/config/firebase';
import { FormData } from '@/interfaces';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

async function createUser({ email, password }: FormData) {
  await createUserWithEmailAndPassword(auth, email, password);
}

async function loginUser({ email, password }: FormData) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function logoutUser() {
  await signOut(auth);
}

export { loginUser, createUser, logoutUser };
