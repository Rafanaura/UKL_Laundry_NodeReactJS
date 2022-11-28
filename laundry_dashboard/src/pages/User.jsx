import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
class User extends React.Component {
  constructor() {
    super()
    this.state = {
      user: [], //array user
      isModalOpen: false,
      token: "",
      id_user: 0,
      nama: "",
      username: "",
      password: "",
      role: "",
      action: "",
    }
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "kasir" ||
        localStorage.getItem("role") === "admin"
      ) {
        this.state.token = localStorage.getItem("token");
      } else {
        window.alert("you're not kasir or admin");
        window.location = "/";
      }
    } else {
      window.location = "/login";
    }
  }

  bind = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  Modal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  Add = () => {
    this.setState({
      isModalOpen : true,
      nama: "",
      username: "",
      password: "",
      role: "",
      action: "insert",
    })
  }
  Drop = (id_user) => {
    let url = "http://localhost:3000/user/" + id_user;
    if (window.confirm("are you sure to delete this?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message);
          this.getUser();
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  }

  Edit = (item) => {
    this.setState({
      isModalOpen : true,
      id_user: item.id_user,
      nama: item.nama,
      username: item.username,
      password: item.password,
      role: item.role,
      action: "update",
    })
  }
  getUser = () => {
    let url = "http://localhost:3000/user";
    axios.get(url)
      .then(res => {
        this.setState({
          user: res.data.user
        });
        console.log(this.state.user)
      })
      .catch(err => {
        console.log(err);
      })
  }

  saveUser = event => {
    event.preventDefault();
    let data = {
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:3000/user/tambah";  
      axios
        .post(url, data)
        .then(res => {
          this.getUser();
          this.Modal();
        })
        .catch(err => {
          console.log(err);
        })
        this.setState({
          isModalOpen : false
        })
    } else if (this.state.action === "update") {
      url = "http://localhost:3000/user/" + this.state.id_user;
      axios
        .put(url, data)
        .then(response => {
          this.getUser();
          this.Modal();
        })
        .catch(err => {
          console.log(err);
        })
        this.setState({
          isModalOpen : false
        })
    }
  }
  componentDidMount() {
    this.getUser()
  }
  render() {
    return (
      <>
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>User</h2>
              <p>
                Nulla dolorum nulla nesciunt rerum facere sed ut inventore quam
                porro nihil id ratione ea sunt quis dolorem dolore earum
              </p>
              <br></br>
              <button type="button" className="btn btn-outline-dark" onClick={() => this.Add()}>Tambah Data</button>
            </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID User</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.user.map((item, index) => {
                      // console.log(this.state.user.map)
                      return (
                        <tr key={index}>
                          <td>{item.id_user}</td>
                          <td>{item.nama}</td>
                          <td>{item.username}</td>
                          <td>{item.password}</td>
                          <td>{item.role}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-info m-1"
                              onClick={() => this.Edit(item)}
                            >
                              Edit
                            </button>
                            <button className="btn btn-sm btn-danger m-1" onClick={()=> this.Drop(item.id_user)}>
                              Hapus
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              </div>

              {/* form user */}
              {/* <Button variant="primary" onClick={Modal}>
                Launch static backdrop modal
              </Button> */}

              <Modal show={this.state.isModalOpen} onHide={this.Modal} backdrop="static">
                <Modal.Header closeButton>
                  <Modal.Title>Form</Modal.Title>
                </Modal.Header>
                <Form onSubmit={event => this.saveUser(event)}>
                <Modal.Body>
                    {/* <fieldset> */}
                      <Form.Group className="mb-3">
                        <Form.Label>
                         Nama
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nama"
                          placeholder="Nama"
                          value={this.state.nama}
                          onChange={this.bind}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={this.bind}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} placeholder="Masukkan password" onChange={this.bind} />
                        </Form.Group>
                        <Form.Group>
                        <Form.Select type="text" name="role" onChange={this.bind}>
                          <option value={this.state.role}>Role</option>
                          <option value="admin">Admin</option>
                          <option value="kasir">Kasir</option>
                          <option value="owner">Owner</option>
                        </Form.Select>
                      </Form.Group>
                      {/* </fieldset> */}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button type="submit" value="Submit">Submit</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            {/* </div> */}
        </section>
        <Link
          to="#"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </Link>
      </>
    );
  }
}
export default User;
