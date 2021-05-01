import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import HomePage from "./pages/HomePage";
import CryptoInfoPage from "./pages/CryptoInfoPage";
import "./assets/styles/App.scss";

function App() {
  return (
    <Container className="App">
      <Router>
        <Switch>
          <Route path="/crypto-info">
            <CryptoInfoPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
