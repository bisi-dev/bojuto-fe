import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    redirect: false,
    authError: false,
    isLoading: false,
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePwdChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleFirstNameChange = (event) => {
    this.setState({ firstname: event.target.value });
  };
  handleLastNameChange = (event) => {
    this.setState({ lastname: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "https://bojuto.lm.r.appspot.com/api/users";
    const email = this.state.email;
    const password = this.state.password;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;

    let request = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: "+2348000000000",
      password: password,
    };

    console.log(request);

    axios
      .post(url, request)
      .then((result) => {
        this.setState({ isLoading: false });
        console.log(result);
        if (result.status === 200) {
          this.setState({ redirect: true, authError: true });
          localStorage.setItem("token", result.data.token);
          this.setState({ redirect: true, isLoading: false });
        } else {
          this.setState({ redirect: false, authError: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ authError: true, isLoading: false });
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Register</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputFName"
                    className="form-control"
                    placeholder="First Name"
                    name="firstname"
                    onChange={this.handleFirstNameChange}
                    required
                  />
                  <label htmlFor="inputFName">First Name</label>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputLName"
                    className="form-control"
                    placeholder="Last name"
                    name="lastname"
                    onChange={this.handleLastNameChange}
                    required
                  />
                  <label htmlFor="inputLName">Last Name</label>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <input
                    id="inputEmail"
                    className={
                      "form-control " +
                      (this.state.authError ? "is-invalid" : "")
                    }
                    placeholder="Email address"
                    type="text"
                    name="email"
                    onChange={this.handleEmailChange}
                    autoFocus
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                  <div className="invalid-feedback">
                    Please provide a valid Email or Email Exists already
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="******"
                    name="password"
                    onChange={this.handlePwdChange}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={this.state.isLoading ? true : false}
                >
                  Register &nbsp;&nbsp;&nbsp;
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
              </div>
            </form>
            <div className="text-center">
              <Link className="d-block small mt-3" to={""}>
                Login to Your Account
              </Link>
              <br></br>
              <Link className="d-block small" to={"#"}>
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}
