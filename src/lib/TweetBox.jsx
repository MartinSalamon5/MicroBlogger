import "./TweetBox.css";

function TweetBox(props) {
  const { tweet } = props;

  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    weekday: "short",
    month: "short",
    year: "numeric",
  };
  const tweetDate = tweet.date.toDate().toLocaleDateString(undefined, options);
  const text = tweet.content;
  const userName = tweet.userName;

  return (
    <div className="tweet-box">
      <div className="tweet-box-header">
        <div>{userName}</div>
        <div>{tweetDate}</div>
      </div>
      <div className="tweet-box-text">{text}</div>
    </div>
  );
}

export default TweetBox;
