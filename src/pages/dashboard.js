import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default class Dashboard extends Component {
  state = {
    totalCustomers: 0,
    totalExpenses: 0,
    totalSales: 0,
  };

  constructor(props) {
    super(props);
    this.urlCustomers = "https://bojuto.lm.r.appspot.com/api/customers";
    this.urlExpenses = "https://bojuto.lm.r.appspot.com/api/expenses";
    this.urlSales = "https://bojuto.lm.r.appspot.com/api/sales";
    this.token = localStorage.getItem("token");
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    axios.get(this.urlCustomers, config).then((response) => {
      const totalCustomers = response.data.total;
      this.setState({ totalCustomers });
    });
    axios.get(this.urlExpenses, config).then((response) => {
      const totalExpenses = response.data.total;
      this.setState({ totalExpenses });
    });
    axios.get(this.urlSales, config).then((response) => {
      const totalSales = response.data.total;
      this.setState({ totalSales });
    });
  }

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
                <li className="breadcrumb-item active">Overview</li>
              </ol>

              <div className="row">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-person-booth"></i>
                      </div>
                      <div className="mr-5">
                        {this.state.totalCustomers} Customers
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to={"customer"}
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-list"></i>
                      </div>
                      <div className="mr-5">Products</div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="#"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-shopping-cart"></i>
                      </div>
                      <div className="mr-5">
                        {this.state.totalExpenses} Expenses
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="sales"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-life-ring"></i>
                      </div>
                      <div className="mr-5">{this.state.totalSales} Sales</div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="sales"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
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
