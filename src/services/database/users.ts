import { db } from '@/config/firebase';
import { USERS } from '@/helpers/const';
import { User } from '@/interfaces';
import { doc, getDoc } from 'firebase/firestore';

async function getUser(uid?: string) {
  if (!uid) return;

  const docRef = doc(db, USERS, uid);
  const docSnap = await getDoc(docRef);

  return docSnap?.data();
}

export { getUser };
