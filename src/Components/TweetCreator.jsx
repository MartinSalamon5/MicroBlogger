import { useState, useEffect, useContext } from "react";
import "./TweetCreator.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { TweetContext } from "../TweetContext";
import Spinner from "react-bootstrap/Spinner";

function TweetCreator() {
  const { tweetArr, setTweetArr, userName } = useContext(TweetContext);
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
      const response = await fetch(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tweetObject),
        }
      );
      const json = await response.json();
      setTweetArr([...tweetArr, json]);
      setShowSpinner(false);
      console.log(json);
    } catch (err) {
      alert("Post was unsuccessful.");
    }
  };

  const createTweet = (content) => {
    const dateObject = new Date();
    const date = dateObject.toISOString();
    const tweetObject = {
      content: content,
      userName: userName,
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
