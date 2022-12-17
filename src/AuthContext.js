import { createContext, useState, useEffect } from "react";
import {
  createUser,
  logInUser,
  authStateChange,
  auth,
  signMeOut,
  userPersistence,
  fullPersistence,
} from "./firebase-config";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userID, setUserID] = useState(null);

  const signUserOut = () => {
    signMeOut(auth).then(() => {
      setIsLoggedIn(false);
    });
  };

  useEffect(() => {
    authStateChange(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    authStateChange(auth, (currentUser) => {
      if (currentUser) {
        setUserID(currentUser.uid);
        if (currentUser.displayName) {
          setUserDisplayName(currentUser.displayName);
        } else {
          setUserDisplayName("Anonymous");
        }
      } else {
        setUserDisplayName("");
      }
    });
  }, [isLoggedIn]);

  const signInUser = (auth, email, password) => {
    userPersistence(auth, fullPersistence)
      .then(() => {
        logInUser(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user);
            setIsLoggedIn(true);
          })
          .catch((err) => {
            const responseError = err.message;
            console.log(responseError);
            switch (responseError) {
              case "Firebase: Error (auth/invalid-email).":
                setLoginError("Please enter a valid email address.");
                break;
              case "Firebase: Error (auth/wrong-password).":
                setLoginError(
                  "You entered the wrong password. Please try again."
                );
                break;
              case "Firebase: Error (auth/user-not-found).":
                setLoginError(
                  "The user credentials you entered are invalid. Please try again."
                );
                break;
              default:
                setLoginError(null);
            }
          });
      })
      .catch((err) => console.log(err));
  };

  const addNewUser = (auth, email, password) => {
    createUser(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("add new user", user);
        signInUser(auth, email, password);
      })
      .catch((err) => {
        const responseError = err.message;
        console.log(responseError);
        switch (responseError) {
          case "Firebase: Error (auth/invalid-email).":
            setSignUpError("Please enter a valid email address.");
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            setSignUpError("Password should be at least 6 characters long.");
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            setSignUpError(
              "This email is already associated with an account. Try using another email address."
            );
            break;
          default:
            setSignUpError(null);
        }
      });
  };

  return (
    <AuthContext.Provider
      value={{
        addNewUser,
        signInUser,
        loginError,
        setLoginError,
        signUpError,
        setSignUpError,
        userDisplayName,
        setUserDisplayName,
        isLoggedIn,
        signUserOut,
        userID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
