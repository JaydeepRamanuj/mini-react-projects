import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCvf0dC3i4DAFrC3lRvwIkJ3FVCu8eWgJo',
  authDomain: 'user-profiles-react.firebaseapp.com',
  projectId: 'user-profiles-react',
  storageBucket: 'user-profiles-react.firebasestorage.app',
  messagingSenderId: '60411568997',
  appId: '1:60411568997:web:7dcb4827e51fa86125b78c',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

async function storeUserData(
  id,
  username,
  email,
  password,
  color,
  city,
  range,
  dob,
  desc,
  imgURL
) {
  const imageRef = storageRef(storage, 'images/name');
  await uploadBytes(imageRef, imgURL);
  const imageDownloadURL = getDownloadURL(imageRef);

  const userRef = ref(db, 'users');
  const newUserRef = push(userRef);
  await set(newUserRef, {
    id,
    username,
    email,
    password,
    color,
    city,
    range,
    dob,
    desc,
    imageDownloadURL,
  });
}

function getUserData() {}

export { app, db, storage, storeUserData, getUserData };
