import { getDocument } from '@/helpers';
import { USERS } from '@/helpers/const';

async function getUser(uid?: string) {
  if (!uid) return;

  return await getDocument(USERS, uid);
}

export { getUser };
