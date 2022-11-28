import React from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {Modal, Button, Form} from "react-bootstrap"
class Member extends React.Component {
  constructor(){
    super()
    this.state = {
      member : [],
      isModalOpen : false,
      token: "",
      id_member:0,
      nama_member:"",
      alamat: "",
      jenis_kelamin: "",
      telepon:"",
      action : "",
      search : ""
    }
    // console.log(this.state.member.length)
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
      isModalOpen: false,
    })
  }
  getMember = () => {
    // let member = (localStorage.getItem("nama_member"))
    let url = "http://localhost:3000/member/"
    axios.get(url)
      .then(res => {
        this.setState({
         member : res.data.member
        });
        console.log(this.state.member)
      })
      .catch(err => {
        console.log(err.message)
      })
      // console.log(member)
  }
  // cariMember = (event) => {
  //   let url = "http://localhost:3000/pilih-member"
  //   if(event.keyCode === 13){
  //     let data = {
  //       cari : this.state.search
  //     }
  //     axios.post(url,data)
  //     .then(res => {
  //       this.setState({
  //         member : res.data.member
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err.message)
  //     })
  //   }
  // }
  pilihMember = (id_member) => {
    localStorage.setItem("id_member", id_member)
    window.location = "/paket"
}
  Add = () => {
    this.setState({
      isModalOpen : true,
      // id_member:"",
      nama_member: "",
      alamat: "",
      jenis_kelamin: "",
      telepon: "",
      action: "insert"
    })
  }
  Edit = (item) => {
    this.setState({
      isModalOpen : true,
      id_member: item.id_member,
      nama_member: item.nama_member,
      alamat : item.alamat,
      jenis_kelamin : item.jenis_kelamin,
      telepon : item.telepon,
      action: "update",
    })
  }
  Drop = (id_member) => {
    let url = "http://localhost:3000/member/" + id_member;
    if (window.confirm("are you sure to delete this?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message);
          this.getMember();
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  }
  saveMember = (event) => {
    event.preventDefault();
    let data = {
      nama_member: this.state.nama_member,
      alamat : this.state.alamat,
      jenis_kelamin : this.state.jenis_kelamin,
      telepon : this.state.telepon
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:3000/member/tambah-member";  
      axios.post(url, data)
        .then(res => {
          console.log(res.data.message)
          this.getMember();
          this.Modal();
        })
        .catch(err => {
          console.log(err.message);
        })
    } else if (this.state.action === "update") {
      url = "http://localhost:3000/member/" + this.state.id_member;
      axios.put(url, data)
        .then(res => {
          console.log(res.data.message)
          this.getMember();
          this.Modal();
        })
        .catch(err => {
          console.log(err.message);
        })
        this.setState({
          isModalOpen : false
        })
    }
  }
  componentDidMount() {
    this.getMember()
  }
  render() {
    return (
      <>
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>Member</h2>
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
                  <th scope="col">ID Member</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Jenis Kelamin</th>
                  <th scope="col">Telepon</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                  this.state.member.map((item, index) => {
                    // console.log(this.state.user.map)
                    return (
                      <tr key={index}>
                        <td>{item.id_member}</td>
                        <td>{item.nama_member}</td>
                        <td>{item.alamat}</td>
                        <td>{item.jenis_kelamin}</td>
                        <td>{item.telepon}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info m-1"
                            onClick={() => this.Edit(item)}
                          >
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger m-1" onClick={()=> this.Drop(item.id_member)}>
                            Hapus
                          </button>
                          <button className="btn btn-sm btn-warning m-1" onClick={()=> this.pilihMember(item.id_member)}>
                            Pilih
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
              <Form onSubmit={event => this.saveMember(event)}>
              <Modal.Body>
                  {/* <fieldset> */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                       nama_member
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nama_member"
                        placeholder="nama_member"
                        value={this.state.nama_member}
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
                      <Form.Group>
                      <Form.Select type="text" name="jenis_kelamin" onChange={this.bind}>
                        <option value={this.state.jenis_kelamin}>Jenis Kelamin</option>
                        <option value="laki-laki">Laki-Laki</option>
                        <option value="perempuan">Perempuan</option>
                      </Form.Select>
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

export default Member;