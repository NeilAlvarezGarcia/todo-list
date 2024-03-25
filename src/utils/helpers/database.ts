import { db } from '@/config/firebase';
import {
  OrderByDirection,
  WhereFilterOp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

async function getDocument(collection: string, documentId: string) {
  const docRef = doc(db, collection, documentId);
  const docSnap = await getDoc(docRef);

  return docSnap?.data();
}

async function getDocuments(collectionName: string) {
  let data: any[] = [];

  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}
async function getDocumentsWhere(
  collectionName: string,
  fieldWhere: string,
  condition: WhereFilterOp,
  value: string | number,
  fieldOrderBy?: string,
  order?: OrderByDirection
) {
  let data: any[] = [];

  const q = query(
    collection(db, collectionName),
    where(fieldWhere, condition, value),
    orderBy(fieldOrderBy as string, order)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}

async function setDocument(collectionName: string, id: string, data: any) {
  await setDoc(doc(db, collectionName, id), data);
}

async function deleteDocument(collection: string, documentId: string) {
  await deleteDoc(doc(db, collection, documentId));
}

async function updateDocument(collection: string, documentId: string, data: any) {
  await updateDoc(doc(db, collection, documentId), data);
}

export {
  getDocument,
  getDocuments,
  setDocument,
  deleteDocument,
  updateDocument,
  getDocumentsWhere,
};
