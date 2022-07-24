import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default class EditPage extends Component {
  constructor(props) {
    super(props);
    this.url = "https://bojuto.lm.r.appspot.com/api/customers";
    this.token = localStorage.getItem("token");
  }

  state = {
    id: this.props.match.params.id,
    redirect: false,
    isLoading: false,
    error: false,
  };

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    axios
      .get(this.url + "/" + this.state.id, config)
      .then((response) => {
        const customer = response.data;
        document.getElementById("inputName").value = customer.name;
        document.getElementById("inputPhone").value = customer.phoneNumber;
        document.getElementById("inputEmail").value = customer.email;
        document.getElementById("inputAddress").value = customer.address;
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url =
      "https://bojuto.lm.r.appspot.com/api/customers/" + this.state.id;
    const name = document.getElementById("inputName").value;
    const phone = document.getElementById("inputPhone").value;
    const email = document.getElementById("inputEmail").value;
    const address = document.getElementById("inputAddress").value;
    const config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    let request = {
      email: email,
      phoneNumber: phone,
      name: name,
      address: address,
    };
    axios
      .put(url, request, config)
      .then((result) => {
        if (result.status === 201) {
          this.setState({ redirect: true, isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  renderError = () => {
    if (this.state.error) {
      return <Redirect to="/notfound" />;
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/customer" />;
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
                  <Link to={"/customer"}>Customer</Link>
                </li>
                <li className="breadcrumb-item active">Edit</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Customer Edit</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputName"
                              className="form-control"
                              placeholder="Enter name"
                              required="required"
                              autoFocus="autofocus"
                            />
                            <label htmlFor="inputName">Enter name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputPhone"
                              className="form-control"
                              placeholder="Enter Phone"
                              required="required"
                            />
                            <label htmlFor="inputPhone">Enter Phone</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="email"
                              id="inputEmail"
                              className="form-control"
                              placeholder="Email address"
                              required="required"
                            />
                            <label htmlFor="inputEmail">Email address</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputAddress"
                              className="form-control"
                              placeholder="Enter Location"
                              required="required"
                            />
                            <label htmlFor="inputAddress">Enter Address</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      disabled={this.state.isLoading ? true : false}
                    >
                      Update Customer &nbsp;&nbsp;&nbsp;
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
