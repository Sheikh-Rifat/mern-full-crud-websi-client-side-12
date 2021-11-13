import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

import initializeAuthentication from "../components/Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();

  //   sign up system
  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        setUser(newUser);

        //save user details to database
        saveUser(email, name, password);

        // sending name to update firebase profile
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        setAuthError("");
        history.replace("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        // ..
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   log in  system
  const loginUser = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   observe user state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/admins${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user?.email]);

  const saveUser = (email, displayName, password) => {
    const user = { email, displayName, password };

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    user,
    admin,
    isLoading,
    authError,
    registerUser,
    loginUser,
    logOut,
  };
};

export default useFirebase;
