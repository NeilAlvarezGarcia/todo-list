import { db } from '@/config/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

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

async function setDocument(collectionName: string, id: string, data: any) {
  await setDoc(doc(db, collectionName, id), data);
}

export { getDocument, getDocuments, setDocument };
