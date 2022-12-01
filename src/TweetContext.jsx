import { useEffect, useState, createContext } from "react";
import localforage from "localforage";

const TweetContext = createContext();

function TweetContextProvider({ children }) {
  const [tweetArr, setTweetArr] = useState([]);
  const [userName, setUserName] = useState("");

  const getTweetsFromStorage = async () => {
    try {
      const response = await fetch(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
      );
      const tweetStorage = await response.json();
      const storedTweetArray = tweetStorage.tweets;
      setTweetArr(storedTweetArray);
      console.log(storedTweetArray);
    } catch (err) {
      alert("Server is offline.");
    }
  };

  const getUserNameFromForage = () => {
    localforage
      .getItem("userName")
      .then((value) => {
        if (value === null) {
          setUserName("No Username");
        } else {
          setUserName(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserNameFromForage();
    getTweetsFromStorage();
    const refreshInterval = setInterval(() => {
      getTweetsFromStorage();
    }, 5000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <TweetContext.Provider
      value={{ tweetArr, setTweetArr, userName, setUserName }}
    >
      {children}
    </TweetContext.Provider>
  );
}

export { TweetContext, TweetContextProvider };
