import TweetCreator from "../Components/TweetCreator";
import TweetList from "../Components/TweetList";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <TweetCreator />
        <TweetList />
      </header>
    </div>
  );
}

export default Home;
