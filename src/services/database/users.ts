import { getDocument, getDocuments } from '@/util/helpers';
import { USERS } from '@/util/const';

async function getUser(uid?: string) {
  if (!uid) return;

  return await getDocument(USERS, uid);
}

async function getUsers() {
  return await getDocuments(USERS);
}

export { getUser, getUsers };
