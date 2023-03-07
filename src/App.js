import { Box, ChakraProvider } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logIn, user } from "./features/user/userSlice";
import { auth } from "./firebase";
import { HomePage, LoginPage, SignUpPage } from "./pages";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);

        const currentUser = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          id: user?.uid,
        };

        dispatch(logIn(currentUser));

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
