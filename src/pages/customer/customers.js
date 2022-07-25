import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default class Index extends Component {
  state = {
    total: 0,
    customers: [],
    isLoading: false,
    error: false,
  };

  constructor(props) {
    super(props);
    this.url = "https://bojuto.lm.r.appspot.com/api/customers";
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
        const customers = response.data.customers;
        const total = response.data.total;
        this.setState({ customers });
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
                <li className="breadcrumb-item active">Customers</li>
                <li className="ml-auto">
                  <Link to={"customer-add"}>Add Customer</Link>
                </li>
              </ol>
              <div className="card-footer small text-muted">
                {this.state.total} customers
              </div>
              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-table"></i>
                  &nbsp;&nbsp;Customers List
                </div>
                <div className="card-body">
                  <div class="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>Name</th>
                          <th>Phone No</th>
                          <th>Email</th>
                          <th>Location</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.customers.map((customers, index) => (
                          <tr key={customers.id}>
                            <td>{index + 1}</td>
                            <td>{customers.name}</td>
                            <td>{customers.phone_number}</td>
                            <td>{customers.email}</td>
                            <td>{customers.address}</td>
                            <td className="text-center">
                              <Link
                                className="btn btn-sm btn-info"
                                to={{
                                  pathname: "customer-edit/" + customers.id,
                                  // search: "/" + customers.id,
                                }}
                              >
                                Edit
                              </Link>
                              &nbsp; | &nbsp;
                              <button
                                value={customers.id}
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
                  </div>
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
