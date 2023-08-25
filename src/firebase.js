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
  setDoc,
  doc,
  getDoc,
  query,
  onSnapshot,
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

// Add to favorite movies

export const addMovieToFavorites = async (
  movieId,
  movieImage,
  ratings,
  userId,
  movieName
) => {
  try {
    await addDoc(collection(db, "users", userId, "favoriteMovies"), {
      id: movieId,
      name: movieName,
      image: ` https://image.tmdb.org/t/p/original/${movieImage}`,
      ratings: ratings,
    });

    console.log("Successfully added to favorites.");
  } catch (error) {
    console.log(error);
  }
};

// Fetch favorite movies

export const getFavoriteMovies = async (userId) => {
  let favoriteMovies = [];
  let ids = [];
  const querySnapshot = await getDocs(
    collection(db, "users", userId, "favoriteMovies")
  );
  querySnapshot?.forEach((doc) => {
    favoriteMovies.push(doc.data());
  });

  querySnapshot?.forEach((doc) => {
    ids.push(doc);
  });

  console.log(ids);

  return favoriteMovies;
};

// Remove from favorites

export const removeFromFavorites = async (userId, movieId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "favoriteMovies", movieId));
    console.log("Successfully removed from favorites.");
  } catch (error) {
    console.log(error);
  }
};

// Add to watchlist

export const addMovieToWatchlist = async (
  movieId,
  movieImage,
  ratings,
  userId,
  movieName
) => {
  try {
    await addDoc(collection(db, "users", userId, "watchlist"), {
      id: movieId,
      name: movieName,
      image: ` https://image.tmdb.org/t/p/original/${movieImage}`,
      ratings: ratings,
    });

    console.log("Successfully added to wtchlist.");
  } catch (error) {
    console.log(error);
  }
};

// Fetch watchlist

export const getWatchlist = async (userId) => {
  let watchlist = [];
  const querySnapshot = await getDocs(
    collection(db, "users", userId, "watchlist")
  );
  querySnapshot?.forEach((doc) => {
    watchlist.push(doc.data());
  });

  return watchlist;
};

// Remove from watchlist

export const removeFromWatchlist = async (userId, movieId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "watchlist", movieId));
    console.log("Successfully removed from watchlist.");
  } catch (error) {
    console.log(error);
  }
};
