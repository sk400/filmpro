// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const actionCodeSettings = {
  url: "http://localhost:3000",
  handleCodeInApp: true,
};

export const addUser = async (id, name, image, email) => {
  try {
    await setDoc(doc(db, "users", id), {
      name: name,
      image: image,
      email: email,
      userId: id,
    });
    console.log("Document created successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (id) => {
  let userInfo;
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // userInfo = docSnap.data();
    userInfo = docSnap.data();
  } else {
    console.log("No such document.");
  }

  return userInfo;
};

// export const getData = async () => {
//   let favoriteMovies = [];
//   const querySnapshot = await getDocs(collection(db, "movies"));
//   querySnapshot?.forEach((doc) => {
//     favoriteMovies.push(doc.data());
//   });

//   const selectedMovies = favoriteMovies.filter(
//     (movie) => movie?.userId === "10"
//   );

//   console.log(selectedMovies);
// };

// getData();

// const deleteData = async () => {
//   await deleteDoc(doc(db, "movies", "1"));
// };

// deleteData();
