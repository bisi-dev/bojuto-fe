import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

class NotFound extends Component {
  render() {
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
                <li className="breadcrumb-item active">404 Error</li>
              </ol>

              <h1 className="display-1">404 - Endpoint Error</h1>
              <p className="lead">
                Page not found. You can{" "}
                <a
                  href={this.props.history.goBack}
                  onClick={this.props.history.goBack}
                >
                  go back{" "}
                </a>
                to the previous page, or
                <Link to={"/dashboard"}> return home</Link>.
              </p>
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

const { string, object } = PropTypes;
NotFound.propTypes = {
  title: string.isRequired,
  history: object,
};

export default withRouter(NotFound);
