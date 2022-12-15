import { useState, useEffect, useContext } from "react";
import "./TweetCreator.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { TweetContext, tweetsCollectionRef } from "../TweetContext";
import Spinner from "react-bootstrap/Spinner";
import { addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../AuthContext";

function TweetCreator() {
  const { tweetArr, setTweetArr } = useContext(TweetContext);
  const { userDisplayName } = useContext(AuthContext);

  const [tweet, setTweet] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const tweetLimit = 140;

  const [showSpinner, setShowSpinner] = useState(false);

  const buttonContentRenderer = () => {
    if (showSpinner === true) {
      return <Spinner animation="border" size="sm" />;
    } else if (showSpinner === false) {
      return <div>Tweet</div>;
    }
  };

  useEffect(() => {
    if (tweet.trim().length == false) {
      setButtonState(true);
      setShowAlert(false);
    } else if (tweet.length == tweetLimit) {
      setButtonState(true);
      setShowAlert(true);
    } else if (tweet.length < tweetLimit) {
      setButtonState(false);
      setShowAlert(false);
    }
  }, [tweet]);

  const setTweetHandler = (e) => {
    setTweet(e.target.value);
  };

  const postTweetToServer = async (tweetObject) => {
    try {
      setShowSpinner(true);
      await addDoc(tweetsCollectionRef, {
        content: tweetObject.content,
        userName: tweetObject.userName,
        date: tweetObject.date,
      });
      setTweetArr([...tweetArr, tweetObject]);
      setShowSpinner(false);
    } catch (err) {
      alert("Post was unsuccessful.");
      setShowSpinner(false);
    }
  };

  const createTweet = (content) => {
    const dateObject = new Date();
    const date = Timestamp.fromDate(dateObject);
    const tweetObject = {
      content: content,
      userName: userDisplayName,
      date: date,
    };
    postTweetToServer(tweetObject);
  };

  return (
    <div className="tweet-input-container">
      <textarea
        maxLength={tweetLimit}
        className="tweet-input-area"
        value={tweet}
        onChange={setTweetHandler}
      ></textarea>
      <Alert show={showAlert} className="max-chars-alert" variant="danger">
        The tweet cant contain more than
        <strong>&nbsp;{tweetLimit}&nbsp;</strong>
        chars.
      </Alert>
      <Button
        onClick={() => {
          createTweet(tweet);
          setTweet("");
        }}
        variant="primary"
        className="tweet-submit-button"
        disabled={buttonState}
      >
        {buttonContentRenderer()}
      </Button>
    </div>
  );
}

export default TweetCreator;
