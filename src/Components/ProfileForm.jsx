import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext } from "react";
import "./ProfileForm.css";
import localforage from "localforage";
import { TweetContext } from "../TweetContext";

function ProfileForm() {
  const { userName, setUserName } = useContext(TweetContext);
  const [savedUserName, setSavedUserName] = useState("");
  const [buttonState, setButtonState] = useState();

  useEffect(() => {
    if (savedUserName == userName) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [userName]);

  console.log(savedUserName);

  const setUserNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const saveUserNameToForage = () => {
    localforage.setItem("userName", userName, () => {
      setButtonState(true);
    });
    setSavedUserName(userName);
  };

  //   useEffect(() => {
  //     setButtonState(false);
  //     setSavenUsernameHandler();
  //     // setSavedUserName(userName);
  //   }, [user]);

  return (
    <div className="profile-form-wrapper">
      <h2 className="profile-form-header">Profile</h2>
      <form className="profile-form">
        <h5 style={{ textAlign: "left", color: "lightgray" }}>User Name</h5>
        <input
          className="user-name-input"
          value={userName}
          onChange={setUserNameHandler}
        ></input>
        <Button
          className="profile-form-submit-button"
          onClick={() => {
            saveUserNameToForage();
          }}
          variant="primary"
          disabled={buttonState}
        >
          Save User
        </Button>
      </form>
    </div>
  );
}

export default ProfileForm;
