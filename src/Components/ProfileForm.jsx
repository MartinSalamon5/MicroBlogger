import Button from "react-bootstrap/Button";
import "./ProfileForm.css";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { auth, updateProfileCredentials, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ProfileForm() {
  const { userDisplayName, setUserDisplayName, userID } =
    useContext(AuthContext);
  const userNameRef = useRef();
  const [profilePic, setProfilePic] = useState();
  const [currentProfilePic, setCurrentProfilePic] = useState();

  const addProfilePicToPage = () => {
    getDownloadURL(ref(storage, `profilePics/${userID}`))
      .then((url) => {
        setCurrentProfilePic(url);
      })
      .catch((err) => {
        console.log(err);
        setCurrentProfilePic(require("../images/icons8-account-96.png"));
      });
  };

  useEffect(() => {
    addProfilePicToPage();
  }, []);

  useEffect(() => {
    if (profilePic) {
      const profilePicsStorageRef = ref(storage, `profilePics/${userID}`);
      uploadBytes(profilePicsStorageRef, profilePic)
        .then(() => {
          addProfilePicToPage();
        })
        .catch((err) => {
          alert("Failed to upload profile pic.");
        });
    }
  }, [profilePic]);

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
      <h1 style={{ margin: "30px 0 0 0", color: "#e3e5ea" }}>Profile</h1>

      <label htmlFor="fileUploader" style={{ cursor: "pointer" }}>
        <img
          alt="profile pic"
          src={
            currentProfilePic
              ? currentProfilePic
              : require("../images/icons8-account-96.png")
          }
          className="profile-pic"
        />
      </label>
      <input
        id="fileUploader"
        style={{
          display: "none",
        }}
        type="file"
        accept="image/png, image/jpg"
        onChange={(e) => {
          setProfilePic(e.target.files[0]);
        }}
      />

      <div>
        <h5
          style={{
            margin: "20px 0 5px 0",
            textAlign: "left",
            alignSelf: "left",
            width: "100%",
            color: "#e3e5ea",
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
