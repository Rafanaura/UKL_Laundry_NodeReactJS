import React from "react";
import axios from "axios"
import {Modal, Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"
class Paket extends React.Component {
  constructor(){
    super()
      this.state = {
        paket : [],
        isModalOpen : false,
        token: "",
        id_paket:0,
        jenis : "",
        harga : "",
        id_member : 0,
        action: ""
      }
      if(localStorage.getItem("token")) {
        if(
          localStorage.getItem("role") === "kasir" || localStorage.getItem("role") === "admin"
        ) {
          this.state.token = localStorage.getItem("token")
          this.state.nama = localStorage.getItem("nama")
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
  
    getPaket = () => {
      let url = "http://localhost:3000/paket"
      axios.get(url)
      .then(res => {
        this.setState({
          paket : res.data.paket
        })
        console.log(this.state.paket)
      })
      .catch(err => {
        console.log(err)
      })
    }
    
    Add = () => {
      this.setState({
        isModalOpen : true,
        jenis: "",
        harga : "",
        action : "insert"
      })
    }
    
    AddToCart = (selectedItem) => {
      if (localStorage.getItem("id_member") !== null) {
        let tempCart = []
  
        if (localStorage.getItem("cart") !== null) {
          tempCart = JSON.parse(localStorage.getItem("cart"))
          // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
  
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
        if (existItem) {
          // jika item yang dipilih ada pada keranjang belanja
          window.alert(`You have choose ${selectedItem.jenis} package`)
        }
        else {
          // user diminta memasukkan jumlah item yang dibeli
          let promptJumlah = window.prompt(`Input qty ${selectedItem.jenis} `, "")
          if (promptJumlah === null || promptJumlah === "" || promptJumlah === "0") { 
            window.alert("Qty cannot be null")
        } else {
            // jika user memasukkan jumlah item yang dibeli
            // menambahkan properti "jumlahBeli" pada item yang dipilih
            selectedItem.qty = promptJumlah
            selectedItem.totalAwal = promptJumlah * selectedItem.harga
            // masukkan item yang dipilih ke dalam cart
            tempCart.push(selectedItem)
            // simpan array tempCart ke localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
          
        }
      }
    }
    Edit = (item) => {
      this.setState({
        isModalOpen: true,
        id_paket: item.id_paket,
        jenis : item.jenis,
        harga : item.harga,
        action: "update"
      })
    }
  
    Drop = (id_paket) => {
      let url = "http://localhost:3000/paket/" + id_paket
      if(window.confirm("Are you sure to delete this paket?"))
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getPaket()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
    
    savePaket = (event) => {
      event.preventDefault()
      let data = {
        jenis :this.state.jenis,
        harga : this.state.harga
      }
      let url = ""
      if(this.state.action === "insert") {
        url = "http://localhost:3000/paket/tambah-paket"
        axios.post(url,data)
        .then(res => {
          this.getPaket()
          this.Modal()
        })
        .catch(err => {
          console.log(err.message)
        })
        this.setState({
          isModalOpen : false
        })
      } else if (this.state.action === "update"){
        url = "http://localhost:3000/paket/" + this.state.id_paket
        axios.put(url,data)
        .then(res => {
          this.getPaket()
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
      this.getPaket()
    }
  

  render() {
    return (
      <>
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>Paket</h2>
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
                  <th scope="col">ID Paket</th>
                  <th scope="col">Jenis</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                  this.state.paket.map((item, index) => {
                    // console.log(this.state.user.map)
                    return (
                      <tr key={index}>
                        <td>{item.id_paket}</td>
                        <td>{item.jenis}</td>
                        <td>{item.harga}</td>
                        <td>
                          <button className="btn btn-sm btn-info m-1" onClick={() => this.Edit(item)}>Edit</button>
                          <button className="btn btn-sm btn-danger m-1" onClick={()=> this.Drop(item.id_paket)}>Hapus</button>
                          <button className="btn btn-sm btn-warning m-1" onClick={() => this.AddToCart(item)}>Pilih</button>
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
              <Form onSubmit={event => this.savePaket(event)}>
              <Modal.Body>
                  {/* <fieldset> */}
                    <Form.Group className="mb-3">
                      <Form.Select type="text" name="jenis" onChange={this.bind}>
                        <option value={this.state.jenis}>Jenis Paket</option>
                        <option value="kiloan">Kiloan</option>
                        <option value="selimut">Selimut</option>
                        <option value="bed_cover">Bed Cover</option>
                        <option value="kaos">Kaos</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Harga
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="harga"
                        placeholder="harga"
                        value={this.state.harga}
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
    );
  }
}
export default Paket;
