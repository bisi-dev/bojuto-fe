import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customer from "./pages/customer";
import AddCustomer from "./pages/customer-add";
import EditCustomer from "./pages/customer-edit";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import NotFound from "./pages/notfound";
import Register from "./pages/register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/customer" component={Customer} />
            <Route path="/customer-add" component={AddCustomer} />
            <Route path="/customer-edit/:id" component={EditCustomer} />
            <Route path="/notfound" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
