import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logIn } from "./features/user/userSlice";
import { addUser, auth } from "./firebase";
import { HomePage, LoginPage, SignUpPage } from "./pages";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let userEmail = window.localStorage.getItem("emailForSignIn");
      if (!userEmail) {
        userEmail = window.prompt("Please provide your email for confirmation");
      }

      signInWithEmailLink(auth, userEmail, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          console.log(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          id: user?.uid,
        };

        dispatch(logIn(currentUser));

        let { id, name, email, image } = currentUser;

        navigate("/");
      } else {
        navigate("/signup");
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
