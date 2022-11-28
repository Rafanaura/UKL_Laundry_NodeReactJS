import React from "react"
import axios from "axios"
import {Modal, Form, Button, Badge} from "react-bootstrap"
import {NavLink} from "react-router-dom"
class Transaksi extends React.Component {
  constructor(){
    super()
    this.state = {
      transaksi : [],
      user : [],
      member : [],
      // outlet : [],
      detail : [],
      isModalOpen : false,
      token : "",
      id_transaksi : 0,
      id_member : 0,
      id_user : 0,
      tanggal : "",
      batas_waktu : "",
      tanggal_bayar : "",
      status : "",
      dibayar : "",
      totalAkhir : 0,
      nama_member : "",
      nama: "",
      now : new Date(),
      action : ""
    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "kasir") {
          this.state.token = localStorage.getItem('token')
          this.state.role = localStorage.getItem('role')
          this.state.nama = localStorage.getItem('nama_user')
          this.state.id_transaksi = localStorage.getItem("id_transaksi")
          this.state.id_member = localStorage.getItem("id_member")
      } else {
          window.alert("You're not kasir or admin!")
          window.location = '/'
      }
  } else {
      window.location = '/login'
  }
  this.state.id_user = localStorage.getItem("id_user")
  }

  bind = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  
  Modal = () => {
    this.setState({
      isModalOpen:false
    })
  }
  getTransaksi = () => {
    let url = "http://localhost:3000/transaksi"
    axios.get(url)
    .then(res => {
      this.setState({
        transaksi : res.data.transaksi
      })
      console.log(this.state.transaksi)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  getMember = () => {
    let url = "http://localhost:3000/member"
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

  // getOutlet = () => {
  //   let url = "http://localhost:3000/outlet"
  //   axios.get(url)
  //   .then(res => {
  //     this.setState({
  //       outlet : res.data.outlet
  //     })
  //     console.log(this.state.outlet)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

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
  // handleDetail = (item) => {
  //   let trans_id = item.id_transaksi;
  //   localStorage.setItem("id_transaksi", trans_id);
  //   window.location = "/detail/" + trans_id;
  // };
  Detail = (id_transaksi, id_member) => {
    localStorage.setItem("id_transaksi", id_transaksi)
    localStorage.setItem("id_member", id_member)
    let url = "http://localhost:3000/transaksi/detail/" + id_transaksi
    axios.get(url)
      .then(res => {
        this.setState({
          detail : res.data.transaksi
        })
        window.location = "/detail/" + id_transaksi
        console.log(this.state.detail)
      })
      .catch(err => {
        console.log(err.message)
      })
}
  convertTime = (time) => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
  }
  // Add = () => {
  //   this.setState({
  //     isModalOpen:true,
  //     tanggal : "",
  //     batas_waktu : "",
  //     tanggal_bayar : "",
  //     status : "",
  //     dibayar : "",
  //     total : "",
  //     action : "insert"
  //   })
  // }

  Edit = (item) => {
    this.setState({
      isModalOpen : true,
      id_transaksi : item.id_transaksi,
      tanggal : item.tanggal,
      // batas_waktu : item.batas_waktu,
      tanggal_bayar : item.tanggal_bayar,
      status : item.status,
      dibayar : item.dibayar,
      // totalAkhir : item.totalAkhir,
     
      action : "update"
    })
  }

  Drop = (id_transaksi) => {
    let url = "http://localhost:3000/transaksi/" + id_transaksi
    if (window.confirm("are you sure to delete this?")){
    axios.delete(url)
    .then(res => {
      console.log(res.data.message)
      this.getTransaksi()
    })
    .catch(err => {
      console.log(err.message)
    })
  }
}

  saveTransaksi = (event) => {
    event.preventDefault()
    let data = []
    data = {
      status : this.state.status
    }
   
      let url = "http://localhost:3000/transaksi/" + this.state.id_transaksi
      axios.put(url,data)
      .then(res => {
        this.getTransaksi()
        this.Modal()
      })
      .catch(err => {
        console.log(err.message)
      })
      this.setState({
        isModalOpen:false
      })
    
    }
    componentDidMount(){
      this.getTransaksi()
      this.getMember()
      // this.getOutlet()
      this.getUser()
  }
      render(){
        return(
          <>
          <section id="team" className="team">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Transaksi</h2>
                 <p>
                   Nulla dolorum nulla nesciunt rerum facere sed ut inventore quam
                   porro nihil id ratione ea sunt quis dolorem dolore earum
                 </p>
                 <br></br>
                    {this.state.role === "admin" &&
                            <div className="col-3 my-5">
                                <NavLink to="/member"><button type="button" className="btn btn-outline-dark">Tambah Data</button></NavLink>
                            </div>
                        }
                        {this.state.role === "kasir" &&
                            <div className="col-3 my-5">
                                <NavLink to="/member"><button type="button" className="btn btn-outline-dark">Tambah Data</button></NavLink>
                            </div>
                        }
              </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID Transaksi</th>
                      <th scope="col">ID Member</th>
                      <th scope="col">ID User</th>
                      <th scope="col">Tanggal Transaksi</th>
                      <th scope="col">Batas Waktu</th>
                      <th scope="col">Tanggal Bayar</th>
                      <th scope="col">Status</th>
                      <th scope="col">Dibayar</th>
                      <th scope="col">Total</th>
                      <th scope="col">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                      {
                      this.state.transaksi.map((item, index) => {
                        // console.log(this.state.user.map)
                        return (
                          <tr key={index}>
                            <td>{item.id_transaksi}</td>
                            <td>{item.id_member}</td>
                            <td>{item.id_user}</td>
                            <td>{this.convertTime(item.tanggal)}</td>
                            <td>{this.convertTime(item.batas_waktu)}</td>
                            {item.tanggal_bayar !== null&&
                              <td>{this.convertTime(item.tanggal_bayar)}</td>
                            }
                            {item.tanggal_bayar === null &&
                              <td>{item.tanggal_bayar}</td>
                            }
                            <td>
                              {item.status === "baru" &&
                                <Badge bg="danger">{item.status}</Badge>
                            }
                            {item.status === "proses" &&
                                <Badge bg="warning">{item.status}</Badge>
                            }
                            {item.status === "selesai" &&
                                <Badge bg="info">{item.status}</Badge>
                            }
                            {item.status === "diambil" &&
                                <Badge bg="success">{item.status}</Badge>
                            }
                             
                            </td>
                            <td>
                            {item.dibayar === "belum_dibayar" &&
                                <Badge bg="danger">Belum Dibayar</Badge>
                            }
                            {item.dibayar === "dibayar" &&
                                <Badge bg="success">Dibayar</Badge>
                            }
                            </td>
                            <td>{item.totalAkhir}</td>
                            <td>
                            <button className="btn btn-sm btn-info m-1" onClick={() => this.Edit(item)}>Edit</button>
                            <button className="btn btn-sm btn-danger m-1" onClick={()=> this.Drop(item.id_transaksi)}>Hapus</button>
                            <button className="btn btn-sm btn-dark m-1" id="brown" onClick={() => this.Detail(item.id_transaksi)}>Detail</button>
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
                  <Form onSubmit={event => this.saveTransaksi(event)}>
                  <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Id Transaksi</Form.Label>
                                <Form.Control type="text" name="id_transaksi"
                                    value={this.state.id_transaksi} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="tgl">
                                <Form.Label>Tanggal Transaksi</Form.Label>
                                <Form.Control type="text" name="tgl"
                                    value={this.state.tanggal} readOnly />
                            </Form.Group>
                            {/* <Form.Group className="mb-2" controlId="tanggal_bayar">
                                <Form.Label>Tanggal Bayar</Form.Label>
                                <Form.Control type="text" name="tanggal_bayar"
                                    value={this.state.tanggal_bayar} onChange={this.bind}/></Form.Group> */}
                            <Form.Group className="mb-2" controlId="dibayar">
                                <Form.Label>Status Pembayaran</Form.Label>
                                <Form.Control type="text" name="dibayar" value={this.state.dibayar} readOnly>
                                    
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="order">
                                <Form.Label>Order Status</Form.Label>
                                <Form.Select type="text" name="status" value={this.state.status} onChange={this.bind} >
                                    <option value="" disabled></option>
                                    <option value="baru">Baru</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">diambil</option>
                                </Form.Select>
                            </Form.Group>
                        </Modal.Body>
                    <Modal.Footer>
                      <Button type="submit" value="Submit">Submit</Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              {/* </div> */}
          </section>
          <NavLink
            to="#"
            className="scroll-top d-flex align-items-center justify-content-center"
          >
            <i className="bi bi-arrow-up-short"></i>
          </NavLink>
        </>
        )
    }
}

export default Transaksi;