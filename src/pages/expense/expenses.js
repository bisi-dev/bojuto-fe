import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default class Index extends Component {
  state = {
    total: 0,
    expenses: [],
    isLoading: false,
    error: false,
  };

  constructor(props) {
    super(props);
    this.url = "https://bojuto.lm.r.appspot.com/api/expenses";
    this.token = localStorage.getItem("token");
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    axios
      .get(this.url, config)
      .then((response) => {
        const expenses = response.data.expenses;
        const total = response.data.total;
        this.setState({ expenses });
        this.setState({ total });
      })
      .catch((error) => {
        // this.setState({ error: true });
        console.log(error);
      });
  }

  handleClickDelete = (event) => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    axios
      .delete(this.url + "/" + event.target.value, config)
      .then((response) => {
        this.componentDidMount();
        this.setState({ isLoading: true });
      })
      .catch((error) => {
        console.log(error.toString());
        this.setState({ error: true });
      });
  };

  renderError = () => {
    if (this.state.error) {
      return <Redirect to="/notfound" />;
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Expenses</li>
                <li className="ml-auto">
                  <Link to={"expenses-add"}>Add Expense</Link>
                </li>
              </ol>
              <div className="card-footer small text-muted">
                {this.state.total} expenses
              </div>
              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-table"></i>
                  &nbsp;&nbsp;Expenses List
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Description</th>
                        <th>Transaction Amount</th>
                        <th>Date</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.expenses.map((expenses, index) => (
                        <tr key={expenses.id}>
                          <td>{index + 1}</td>
                          <td>{expenses.description}</td>
                          <td>{expenses.amount}</td>
                          <td>{expenses.transaction_date}</td>
                          <td className="text-center">
                            <Link
                              className="btn btn-sm btn-info"
                              to={{
                                pathname: "expenses-edit/" + expenses.id,
                              }}
                            >
                              Edit
                            </Link>
                            &nbsp; | &nbsp;
                            <button
                              value={expenses.id}
                              className="btn btn-sm btn-danger"
                              onClick={this.handleClickDelete}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {this.renderError()}
                </div>
              </div>
            </div>
            <footer className="sticky-footer">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright © Bojuto 2022</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
