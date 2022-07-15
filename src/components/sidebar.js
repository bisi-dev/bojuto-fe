import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="wrapper">
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <Link to={"/dashboard"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp;Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              <i className="fas fa-fw fa-person-booth"></i>
              <span>&nbsp;Customers</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              <i className="fas fa-fw fa-file-archive"></i>
              <span>&nbsp;Inventory</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>&nbsp;Transactions</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>&nbsp;Sales Report</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
