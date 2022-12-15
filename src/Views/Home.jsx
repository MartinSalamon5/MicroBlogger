import TweetCreator from "../Components/TweetCreator";
import TweetList from "../Components/TweetList";

function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TweetCreator />
      <TweetList />
    </div>
  );
}

export default Home;
