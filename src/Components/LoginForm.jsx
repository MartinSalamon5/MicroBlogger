import "./LoginForm.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function LoginForm() {
  const { signInUser, loginError, setLoginError } = useContext(AuthContext);
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const navigation = useNavigate();

  const loginUserHandler = (loginEmailRef, loginPasswordRef) => {
    signInUser(auth, loginEmailRef, loginPasswordRef);
  };

  const removeError = () => {
    setLoginError(null);
  };

  const navToSignup = () => {
    navigation("/signup");
  };

  const googleLoginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login-form">
      <h1
        style={{
          alignSelf: "center",
        }}
      >
        Login
      </h1>
      <h5 style={{ margin: "15px 0 0 0" }}>E-mail:</h5>
      <input
        style={{
          borderRadius: "5px",
          backgroundColor: "lightgrey",
          padding: "5px",
          fontSize: "20px",
          width: "100%",
        }}
        type="email"
        required
        ref={loginEmailRef}
        placeholder="example@email.com"
        onChange={removeError}
      ></input>
      <h5 style={{ margin: "15px 0 0 0" }}>Password</h5>
      <input
        style={{
          borderRadius: "5px",
          backgroundColor: "lightgrey",
          padding: "5px",
          fontSize: "20px",
        }}
        type="password"
        required
        ref={loginPasswordRef}
        onChange={removeError}
      ></input>
      <br />
      <Button
        variant="primary"
        style={{
          borderRadius: "20px",
          padding: "5px 15px 5px 15px",
          alignSelf: "center",
        }}
        onClick={() => {
          loginUserHandler(
            loginEmailRef.current.value,
            loginPasswordRef.current.value
          );
        }}
      >
        Login
      </Button>
      <label
        htmlFor="googleLogin"
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "8px",
        }}
      >
        <img src={require("../images/google_auth_pic.png")} />

        <button
          id="googleLogin"
          style={{ display: "none" }}
          onClick={googleLoginHandler}
        />
      </label>
      {loginError ? (
        <Alert
          variant="danger"
          style={{ position: "relative", margin: "10px 0 0 0" }}
        >
          {loginError}
        </Alert>
      ) : null}
      <p
        style={{
          margin: "20px 0 0 0",
          textAlign: "center",
          width: "100%",
          fontSize: "14px",
        }}
      >
        Don't have an account yet?
      </p>
      <p className="nav-paragraph" onClick={navToSignup}>
        Sign Up Here
      </p>
    </div>
  );
}

export default LoginForm;
