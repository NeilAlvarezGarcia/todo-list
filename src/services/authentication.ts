import { auth } from '@/config/firebase';
import { FormData, User } from '@/interfaces';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addUser } from '.';

async function createUser({ email, password, ...rest }: FormData) {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await addUser({ email, uid: res.user.uid, ...rest } as User);
}

async function loginUser({ email, password }: FormData) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function logoutUser() {
  return await signOut(auth);
}

export { loginUser, createUser, logoutUser };
