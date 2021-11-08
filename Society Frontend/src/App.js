import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Maintenance from "./components/Maintenance";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Transactions from "./components/Transaction";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// eslint-disable-next-line

function App() {
  return (
    <Router>
      <div className="bg-green-100 dark:bg-gray-800 min-h-screen font-sans">
        <Switch>
          <Route exact path="/inventory">
            <Navbar />
            <Inventory />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/maintenance">
            <Navbar />
            <Maintenance />
          </Route>
          <Route exact path="/transactions">
            <Navbar />
            <Transactions />
          </Route>
          <Route exact path="/">
            <Navbar />
            <Dashboard />
          </Route>
          <Route exact path="/members">
            <Navbar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
