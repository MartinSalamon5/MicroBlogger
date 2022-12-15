import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        {isLoggedIn ? <PrivateRoute /> : <PublicRoute />}
      </header>
    </div>
  );
}

export default App;
