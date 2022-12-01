import "./TweetBox.css";

function TweetBox(props) {
  const { tweet } = props;

  const tweetDate = tweet.date;
  const text = tweet.content;
  const userName = tweet.userName;

  return (
    <div className="tweet-box">
      <div className="tweet-box-header">
        <div>{userName}</div> <div>{tweetDate}</div>
      </div>
      <div className="tweet-box-text">{text}</div>
    </div>
  );
}

export default TweetBox;
