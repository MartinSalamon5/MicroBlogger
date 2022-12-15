import { useEffect, useState, createContext } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const TweetContext = createContext();
const tweetsCollectionRef = collection(db, "tweets");

function TweetContextProvider({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [tweetArr, setTweetArr] = useState([]);

  // const [userName, setUserName] = useState("");

  const getTweetsFromStorage = async () => {
    try {
      const data = await getDocs(tweetsCollectionRef);
      const docs = data.docs;
      setTweetArr(docs.map((doc) => ({ ...doc.data() })));
    } catch (err) {
      alert("Server is offline.");
    }
  };

  useEffect(() => {
    if (isLoggedIn != null) {
      getTweetsFromStorage();
      const refreshInterval = setInterval(() => {
        getTweetsFromStorage();
      }, 5000);
      return () => clearInterval(refreshInterval);
    }
  }, [isLoggedIn]);

  return (
    <TweetContext.Provider value={{ tweetArr, setTweetArr }}>
      {children}
    </TweetContext.Provider>
  );
}

export { TweetContext, TweetContextProvider, tweetsCollectionRef };
