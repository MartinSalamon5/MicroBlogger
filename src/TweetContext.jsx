import { useEffect, useState, createContext } from "react";
import { db } from "./firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const TweetContext = createContext();
const tweetsCollectionRef = collection(db, "tweets");

function TweetContextProvider({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [tweetArr, setTweetArr] = useState([]);

  const getTweetsFromStorage = async () => {
    onSnapshot(tweetsCollectionRef, (snapshot) => {
      setTweetArr(snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  useEffect(() => {
    if (isLoggedIn != null) {
      getTweetsFromStorage();
    }
  }, [isLoggedIn]);

  return (
    <TweetContext.Provider value={{ tweetArr, setTweetArr }}>
      {children}
    </TweetContext.Provider>
  );
}

export { TweetContext, TweetContextProvider, tweetsCollectionRef };
