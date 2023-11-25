import { db } from '@/config/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

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

export { getDocument, getDocuments };
