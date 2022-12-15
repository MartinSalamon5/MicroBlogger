import TweetBox from "../lib/TweetBox";
import "./TweetList.css";
import { useContext } from "react";
import { TweetContext } from "../TweetContext";

function TweetList() {
  const { tweetArr } = useContext(TweetContext);

  tweetArr.sort((a, b) => {
    return b.date.toDate() - a.date.toDate();
  });

  return (
    <div className="tweet-list">
      {tweetArr.map((tweet, key) => {
        return <TweetBox tweet={tweet} key={key} />;
      })}
    </div>
  );
}

export default TweetList;
