import "./LoginForm.css";
import Alert from "react-bootstrap/Alert";
import { useRef, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase-config";
import Button from "react-bootstrap/Button";

function LoginForm() {
  const { signInUser, loginError, setLoginError } = useContext(AuthContext);
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  const loginUserHandler = (loginEmailRef, loginPasswordRef) => {
    signInUser(auth, loginEmailRef, loginPasswordRef);
  };

  const removeError = () => {
    setLoginError(null);
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
        placeholder="- - - - - -"
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
      {loginError ? (
        <Alert
          variant="danger"
          style={{ position: "relative", margin: "10px 0 0 0" }}
        >
          {loginError}
        </Alert>
      ) : null}
    </div>
  );
}

export default LoginForm;
