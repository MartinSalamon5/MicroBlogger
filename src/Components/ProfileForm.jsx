import Button from "react-bootstrap/Button";
import "./ProfileForm.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { auth, updateProfileCredentials } from "../firebase-config";

function ProfileForm() {
  const { userDisplayName, setUserDisplayName } = useContext(AuthContext);
  console.log(userDisplayName);
  const userNameRef = useRef();

  const saveButtonHandler = () => {
    updateProfileCredentials(auth.currentUser, {
      displayName: userNameRef.current.value,
    }).then(() => {
      setUserDisplayName(userNameRef.current.value);
      alert("Profile was successfully updated");
    });
    console.log(userNameRef.current.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: "30px 0 0 0" }}>Profile</h1>
      <div
        style={{
          border: "1.5px solid black",
          margin: "20px 0 0 0",
          borderRadius: "50%",
          height: "100px",
          width: "100px",
          backgroundColor: "lightgrey",
        }}
      >
        Image
      </div>
      <div>
        <h5
          style={{
            margin: "20px 0 5px 0",
            textAlign: "left",
            alignSelf: "left",
            width: "100%",
          }}
        >
          Username:
        </h5>
        <input
          style={{
            width: "200px",
            borderRadius: "5px",
            backgroundColor: "lightgrey",
            padding: "5px",
            fontSize: "15px",
          }}
          defaultValue={userDisplayName}
          type="text"
          placeholder="Anonymous"
          ref={userNameRef}
        ></input>
      </div>
      <Button
        onClick={saveButtonHandler}
        variant="primary"
        style={{
          margin: "20px 0 0 0",
          borderRadius: "20px",
          padding: "5px 15px 5px 15px",
          alignSelf: "center",
        }}
      >
        Save
      </Button>
    </div>
  );
}

export default ProfileForm;
