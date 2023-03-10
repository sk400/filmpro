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
    console.log("User info added successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (id) => {
  let userInfo;
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    userInfo = docSnap.data();
  } else {
    console.log("No such document.");
  }

  return userInfo;
};

export const addMovieToFavorites = async (
  movieId,
  movieImage,
  ratings,
  userId,
  movieName
) => {
  try {
    await setDoc(doc(db, "favoriteMovies", movieId), {
      id: movieId,
      name: movieName,
      image: ` https://image.tmdb.org/t/p/original/${movieImage}`,
      ratings: ratings,
      userId: userId,
    });
    console.log("Successfully added to favorites.");
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteMovies = async (userId) => {
  let favoriteMovies = [];
  const querySnapshot = await getDocs(collection(db, "favoriteMovies"));
  querySnapshot?.forEach((doc) => {
    favoriteMovies.push(doc.data());
  });

  const selectedMovies = favoriteMovies.filter(
    (movie) => movie?.userId === userId
  );

  return selectedMovies;
};

export const removeFromFavorites = async (movieId) => {
  try {
    await deleteDoc(doc(db, "favoriteMovies", movieId));
    console.log("Successfully removed from favorites.");
  } catch (error) {
    console.log(error);
  }
};
