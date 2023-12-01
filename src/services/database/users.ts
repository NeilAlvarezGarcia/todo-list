import { getDocument, getDocuments, setDocument } from '@/utils/helpers';
import { USERS } from '@/utils/const';
import { User, Users } from '@/interfaces';

async function addUser(data: User) {
  await setDocument(USERS, data.uid, data);
}

async function getUser(uid: string): Promise<User> {
  return (await getDocument(USERS, uid)) as User;
}

async function getUsers(): Promise<Users> {
  return await getDocuments(USERS);
}

export { getUser, getUsers, addUser };
