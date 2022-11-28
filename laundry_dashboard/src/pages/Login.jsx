import axios from "axios";
import React from "react";
// import {Link} from "react-router-dom"
import img from "../components/image/undraw_file_sync_ot38.jpg"

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      user : [],
      username : "",
      password : "",
      logged : true
    }
  }
  bind = (event) => { //event for handling
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault() 
    //event prevent default untuk mencegah terjadinya event bawaan dari sebuah DOM, misalnya tag "a href" jika kita klik, maka halaman browser akan melakukan reload, atau sebuah form jika kita klik tombol submit maka akan melakukan reload pula.
    let data = {
      username : this.state.username,
      password : this.state.password
    }
    let url = "http://localhost:3000/user/login"
    axios.post(url,data)
      .then(res => {
        // this.setState({logged : res.data.logged})
        if (res.data.logged ) {
          let user = res.data.user
          let token = res.data.token
          let nama = res.data.user.nama
          let role = res.data.user.role
          let id_user = res.data.user.id_user
          localStorage.setItem("user", JSON.stringify(user))
          // JSON.parse(localStorage.getItem("user"))
          localStorage.setItem("token", token)
          localStorage.setItem("nama", nama)
          localStorage.setItem("role", role)
          localStorage.setItem("id_user", id_user)
          window.location="/"
      } else {
        window.alert(res.data.message)
      }
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
                    { !this.state.logged ? 
            (
              <div className="alert alert-danger mt-1">
                  { this.state.message }
              </div>
          ) : null }
                    <form onSubmit={(event) => this.handleLogin(event)}>
                    <input type="hidden"/>
                      <div className="mb-4">
                        <h3>
                          Login to <strong>Fresh Laundry</strong>
                        </h3>
                        <p className="mb-4">
                           ipsum dolor sit amet elit. Sapiente sit aut eos
                          consectetur adipisicing.
                        </p>
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
                        <div className="form-group first">
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

                        {/* <div className="d-flex mb-5 align-items-center">
                          <label className="control control--checkbox mb-0">
                            <span className="caption">Remember me</span>
                            <input type="checkbox"onChange={this.bind} />
                            <div className="control__indicator"></div>
                          </label>
                          <span className="ml-auto">
                            <Link to="/" className="forgot-pass">
                              Forgot Password
                            </Link>
                          </span>
                        </div> */}

                        <button type="submit" className="btn text-white btn-block btn-success">Login</button>
                        {/* <span className="d-block text-left my-4 text-muted">
                          {" "}
                         don't have an account? <Link to="/register">Register now</Link>
                        </span> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
