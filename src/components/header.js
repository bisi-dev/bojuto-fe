import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TitleComponent from "../pages/title";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  state = {
    toDashboard: false,
  };

  handleClickLogout() {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
    this.setState({ toDashboard: true });
  }

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />;
    }
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <TitleComponent title="Bojuto "></TitleComponent>

        <Link to={"#"} className="navbar-brand mr-1">
          Bojuto
        </Link>

        <br></br>

        <ul className="navbar-nav ml-auto ml-md-16">
          <li className="nav-item dropdown no-arrow">
            <Link
              to={"#"}
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user-circle fa-fw"></i>
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <Link
                to={"#"}
                onClick={this.handleClickLogout}
                className="dropdown-item"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
