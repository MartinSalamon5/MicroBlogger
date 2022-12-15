import { useRef, useContext } from "react";
import "./SignupForm.css";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase-config";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function SignUpForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { addNewUser, signUpError, setSignUpError } = useContext(AuthContext);

  const addUserHandler = (emailRef, passwordRef) => {
    addNewUser(auth, emailRef, passwordRef);
  };

  const removeError = () => {
    setSignUpError(null);
  };

  return (
    <div className="signup-form">
      <h1
        style={{
          alignSelf: "center",
        }}
      >
        Sign up!
      </h1>
      <h5 style={{ margin: "10px 0 0 0" }}>E-mail</h5>
      <input
        style={{
          borderRadius: "5px",
          backgroundColor: "lightgrey",
          padding: "5px",
          fontSize: "20px",
          width: "100%",
        }}
        type="email"
        placeholder="example@email.com"
        required
        ref={emailRef}
        onChange={() => {
          removeError();
        }}
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
        ref={passwordRef}
        onChange={() => {
          removeError();
        }}
      ></input>
      <h5 style={{ margin: "15px 0 0 0" }}>Confirm Password</h5>
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
        ref={passwordConfirmRef}
        onChange={() => {
          removeError();
        }}
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
          if (passwordRef.current.value === passwordConfirmRef.current.value) {
            addUserHandler(emailRef.current.value, passwordRef.current.value);
          } else {
            setSignUpError("Please make sure the passwords you entered match.");
          }
        }}
      >
        Sign me up!
      </Button>
      {signUpError ? (
        <Alert
          variant="danger"
          style={{
            position: "relative",
            margin: "20px 0 0 0",
            fontSize: "14px",
          }}
        >
          {signUpError}
        </Alert>
      ) : null}{" "}
    </div>
  );
}

export default SignUpForm;
