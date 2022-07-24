import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCustomer from "./pages/customer/customer-add";
import EditCustomer from "./pages/customer/customer-edit";
import Customer from "./pages/customer/customers";
import Dashboard from "./pages/dashboard";
import AddExpenses from "./pages/expense/expense-add";
import EditExpenses from "./pages/expense/expense-edit";
import Expenses from "./pages/expense/expenses";
import Login from "./pages/login";
import NotFound from "./pages/notfound";
import Register from "./pages/register";
import AddSales from "./pages/sale/sale-add";
import EditSales from "./pages/sale/sale-edit";
import Sales from "./pages/sale/sales";

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
            <Route path="/expenses" component={Expenses} />
            <Route path="/expenses-add" component={AddExpenses} />
            <Route path="/expenses-edit/:id" component={EditExpenses} />
            <Route path="/sales" component={Sales} />
            <Route path="/sales-add" component={AddSales} />
            <Route path="/sales-edit/:id" component={EditSales} />
            <Route path="/notfound" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
