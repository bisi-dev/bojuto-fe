import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default class AddPage extends Component {
  state = {
    redirect: false,
    error: false,
    isLoading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const url = "https://bojuto.lm.r.appspot.com/api/sales";
    const description = document.getElementById("inputDescripton").value;
    const amount = document.getElementById("inputAmount").value;
    const transactionDate = document.getElementById("inputDate").value;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let request = {
      description: description,
      amount: amount,
      transactionDate: transactionDate,
      customerId: 1,
    };
    axios
      .post(url, request, config)
      .then((result) => {
        if (result.status === 200) {
          this.setState({ redirect: true, isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/sales" />;
    }
  };

  renderError = () => {
    if (this.state.error) {
      return <Redirect to="/notfound" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <Header />
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={"/sales"}>Sales</Link>
                </li>
                <li className="breadcrumb-item active">Add</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Sale Add</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputDescripton"
                              className="form-control"
                              placeholder="Enter description"
                              required="required"
                              autoFocus="autofocus"
                            />
                            <label htmlFor="inputDescripton">
                              Enter Description
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="number"
                              id="inputAmount"
                              className="form-control"
                              placeholder="Enter Amount"
                              required="required"
                            />
                            <label htmlFor="inputAmount">Enter Amount</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="date"
                              id="inputDate"
                              className="form-control"
                              placeholder="Date"
                              required="required"
                            />
                            <label htmlFor="inputDate">Enter Date</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      disabled={this.state.isLoading ? true : false}
                    >
                      Add Sale &nbsp;&nbsp;&nbsp;
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <span></span>
                      )}
                    </button>
                  </form>
                  {this.renderRedirect()}
                  {this.renderError()}
                </div>
              </div>
            </div>

            <footer className="sticky-footer">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>
                    Copyright © Bojuto <div>{new Date().getFullYear()}</div>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
