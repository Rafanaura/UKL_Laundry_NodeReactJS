import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import {Modal, Button, Form} from "react-bootstrap"
class Outlet extends React.Component {
  constructor(){
    super()
    this.state = {
      outlet : [],
      isModalOpen : false,
      token: "",
      id_outlet:0,
      nama: "",
      alamat: "",
      telepon: "",
      action: ""
    }
    if(localStorage.getItem("token")) {
      if(
        localStorage.getItem("role") === "kasir" || localStorage.getItem("role") === "admin"
      ) {
        this.state.token = localStorage.getItem("token")
      } else {
        window.alert("You're not kasir or admin!")
        window.location="/"
      }
    } else {
      window.location = "/login"
    }
  }

  bind = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  Modal = () => {
    this.setState({
      isModalOpen : false
    })
  }

  getOutlet = () => {
    let url = "http://localhost:3000/outlet"
    axios.get(url)
    .then(res => {
      this.setState({
        outlet : res.data.outlet
      })
      console.log(this.state.outlet)
    })
    .catch(err => {
      console.log(err)
    })
  }

  Add = () => {
    this.setState({
      isModalOpen : true,
      nama : "",
      alamat : "",
      telepon: "",
      action : "insert"
    })
  }

  Edit = (item) => {
    this.setState({
      isModalOpen: true,
      id_outlet: item.id_outlet,
      nama: item.nama,
      alamat: item.alamat,
      telepon: item.telepon,
      action: "update"
    })
  }

  Drop = (id_outlet) => {
    let url = "http://localhost:3000/outlet/" + id_outlet
    if(window.confirm("Are you sure to delete this outlet?"))
    axios.delete(url)
      .then(res => {
        console.log(res.data.message)
        this.getOutlet()
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  saveOutlet = (event) => {
    event.preventDefault()
    let data = {
      nama : this.state.nama,
      alamat : this.state.alamat,
      telepon : this.state.telepon
    }
    let url = ""
    if(this.state.action === "insert") {
      url = "http://localhost:3000/outlet/tambah-outlet"
      axios.post(url,data)
      .then(res => {
        this.getOutlet()
        this.Modal()
      })
      .catch(err => {
        console.log(err.message)
      })
      this.setState({
        isModalOpen : false
      })
    } else if (this.state.action === "update"){
      url = "http://localhost:3000/outlet/" + this.state.id_outlet
      axios.put(url,data)
      .then(res => {
        this.getOutlet()
        this.Modal()
      })
      .catch(err => {
        console.log(err.message)
      })
      this.setState({
        isModalOpen : false
      })
    }
  }
  componentDidMount(){
    this.getOutlet()
  }
    render(){
        return(
          <>
          <section id="team" className="team">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Outlet</h2>
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
                      <th scope="col">ID Outlet</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Alamat</th>
                      <th scope="col">Telepon</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                      this.state.outlet.map((item, index) => {
                        // console.log(this.state.user.map)
                        return (
                          <tr key={index}>
                            <td>{item.id_outlet}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.telepon}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-info m-1"
                                onClick={() => this.Edit(item)}
                              >
                                Edit
                              </button>
                              <button className="btn btn-sm btn-danger m-1" onClick={()=> this.Drop(item.id_outlet)}>
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
                  <Form onSubmit={event => this.saveOutlet(event)}>
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
                            Alamat
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="alamat"
                            placeholder="alamat"
                            value={this.state.alamat}
                            onChange={this.bind}
                          />
                          </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Telepon
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="telepon"
                            placeholder="telepon"
                            value={this.state.telepon}
                            onChange={this.bind}
                          />
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
        )
    }
}

export default Outlet;