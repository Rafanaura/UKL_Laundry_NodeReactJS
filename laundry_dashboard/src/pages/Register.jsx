import React from "react";
import axios from "axios";
// import { NavLink } from "react-router-dom";
import img from "../components/image/undraw_file_sync_ot38.jpg"

export default class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            nama: "",
            username: "",
            password: "",
            role: "",
        }
    }

    bind= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // headerConfig = () => {
    //     let header = {
    //       headers: { Authorization: `Bearer ${this.state.token}` }
    //     }
    //     return header
    //   }
    handleRegister= (e) => {
        e.preventDefault();
        let user = {
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        
        }
        let url = "http://localhost:3000/user/tambah"
        axios.post(url, user)
            .then(res => {
                window.alert("Success to Register")
                window.location = "/login"
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <>
            <section id="contact" className="contact">
              <div className="content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 order-md-2">
                      <img
                        className="img-fluid" alt="img"
                        src={img}
                      />
                    </div>
                    <div className="col-md-6 contents">
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <div className="mb-4">
                            <h3>
                             Register to <strong>Fresh Laundry</strong>
                            </h3>
                            <p className="mb-4">
                              Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                              consectetur adipisicing.
                            </p>
                          </div>
                          <form onSubmit={(e) => this.handleRegister(e)}                    >
                            <div className="form-group first">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="nama"
                                  name="nama"
                                  id="nama"
                                  value={this.state.nama}
                                  onChange={this.bind}
                                />
                              </div>
                            <div className="form-group first">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="username"
                                name="username"
                                id="username"
                                value={this.state.username}
                                onChange={this.bind}
                              />
                            </div>
                            <div className="form-group last mb-4">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="password"
                                id="password"
                                value= {this.state.password}
                                onChange={this.bind}
                              />
                            </div>
                            <div className="col-auto my-1">
                              <select  className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="role" value={this.state.role} onChange={this.bind}>
                                <option value="DEFAULT" disabled>Role</option>
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                                <option value="owner">Owner</option>
                              </select>
                            </div>
      
                            <button type="submit" className="btn text-white btn-block btn-success">Register</button>
                            </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
    }
}