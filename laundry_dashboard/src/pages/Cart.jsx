import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: [],
            member: [],
            // isCart: false,
            id_member: 0,
            id_user: 0,
            tanggal: 0,
            batas_waktu: 0,
            tanggal_bayar: 0,
            status: "",
            dibayar: "",
            // total: 0,
            id_transaksi: 0,
            id_paket: 0,
            harga: 0,
            qty: 0,
            totalAkhir: 0,
            totalAwal: 0,
            nama: "",
            token : "",
            role : "",
            action: ""
        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
                this.state.role = localStorage.getItem('role')
                this.state.token = localStorage.getItem('token')
                this.state.nama = localStorage.getItem('nama')
                this.state.id_user = localStorage.getItem('id_user')
            } else {
                window.alert("You are not an admin or a cashier")
                window.location = '/login'
                localStorage.clear()
            }
        } else {
            window.location = "/login"
        }

        this.state.id_member = localStorage.getItem("id_member")
        console.log(this.state.id_member)
    }


    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            // let jsonString = JSON.stringify(tempCart)
            // localStorage.getItem('cart', jsonString)
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        console.log(tempCart)
        // memanggil data user pada localStorage
        let namaUser = localStorage.getItem("nama")
        console.log(namaUser)
        // kalkulasi total harga
        let totalHarga = 0
        tempCart.map(item => {
            return totalHarga += item.totalAwal
        })
        console.log(totalHarga)
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: namaUser,
            totalAkhir: totalHarga
        })
        // console.log(this.setState.cart)
        // console.log(this.state.user)
        // console.log(this.state.total)
    }

    Drop = (selectedItem) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Do you want to delete this class from your cart")) {
            // menghapus data
            let tempCart = this.state.cart
            // posisi index data yg akan dihapus
            let index = tempCart.indexOf(selectedItem)
            // hapus data
            tempCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(tempCart))
            this.setState({ cart: tempCart })
        }
    }

    Edit = (selectedItem) => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(item => item.id_paket === selectedItem.id_paket)
        let promptJumlah = window.prompt(`Masukkan Jumlah ${selectedItem.jenis} yang dibeli`, selectedItem.qty)
        if (promptJumlah === null || promptJumlah === "" || promptJumlah === "0") {
            window.alert("Qty cannot be null")
        } else {
            tempCart[index].qty = promptJumlah
            tempCart[index].totalAwal = promptJumlah * tempCart[index].harga
        }
        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))
        // refresh cart
        this.initCart()
    }

    checkOut = () => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
            let transaksi = {
                id_member: this.state.id_member,
                id_user: this.state.id_user,
                // batas_waktu: this.state.batas_waktu,
                // tanggal_bayar: this.state.tanggal_bayar,
                status: "baru",
                dibayar: "belum_dibayar",
                totalAkhir : this.state.totalAkhir,
                detail : tempCart
                
            }
            let url = "http://localhost:3000/transaksi/tambah-transaksi"
            axios.post(url, transaksi)
                .then(response => {
                    window.alert("Success Checkout")
                    localStorage.removeItem("cart")
                    localStorage.removeItem("id_transaksi")
                    localStorage.removeItem("id_member")
                    this.initCart()
                    window.location = "/transaksi"
                })
                .catch(error => {
                    window.location("Gagal checkout")
                })
        }
    

    getMember = () => {
        let url = "http://localhost:3000/member/" + this.state.id_member
        axios.get(url)
            .then(res => {
                this.setState({
                    member: res.data.member
                })
                console.log(this.state.member)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getUser = () => {
        let url = "http://localhost:3000/user/" + this.state.id_user
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.user
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.initCart()
        this.getMember()
        this.getUser()
    }

    render() {
        return (
            <div>
                {this.state.cart.length > 0 &&
                    <div className='container'>
                        <h1 className='display-6 fw-light text-left mb-10 mt-10'>Cart</h1>
                        <h1 className="fs-5 fw-bold text-left mb-3">Data Member</h1>
                        <div className="row">
                            <div className="col-3 fw-bold">
                                <h6>Nama Member</h6>
                                {/* <h6>Alamat Member</h6>
                                <h6>Jenis Kelamin</h6>
                                <h6>Nomor Telepon</h6> */}
                            </div>

                            <div className="col-9 mb-3">
                                <h6>{this.state.member.nama_member}</h6>
                                {/* <h6>{this.state.member.alamat_member}</h6>
                                <h6>{this.state.member.jenis_kelamin}</h6>
                                <h6>{this.state.member.tlp}</h6> */}
                            </div>

                            <div className='mt-3'>
                                <NavLink to="/paket"><button className="btn btn-dark" id="blue"><i className="fa fa-plus me-2"></i> Add Cart</button></NavLink>
                            </div>
                        </div>

                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th>Jenis Laundry</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Sub Total</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cart.map((item, index) => (
                                    // <>
                                        <tr className="" key={index}>
                                            <td>{item.jenis}</td>
                                            <td>{item.harga}</td>
                                            <td>{item.qty}</td>
                                            <td>Rp {item.totalAwal}</td>
                                            <td className='text-center'>
                                                <button className='btn btn-dark px-3 py-2 mr-2' id="blue" onClick={() => this.Drop(item)}><i className="fa fa-trash"></i>Hapus</button>
                                                <button className='btn btn-dark px-3 py-2' id="blue" onClick={() => this.Edit(item)}><i className="fa fa-pencil"></i>Edit</button>
                                            </td>
                                        </tr>
                                    // </>
                                ))}
                                    <tr>
                                        <td colSpan="3" className="text-center">Total</td>
                                        <td className="text-left" colSpan={2}>Rp {this.state.totalAkhir}</td>
                                    </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <button onClick={() => this.checkOut()} className="btn btn-dark mb-5 w-25 mx-auto" id="blue">Checkout</button>
                        </div>
                    </div>
                }


                {this.state.cart.length === 0 &&
                    <div className="container py-4 my-4">
                        <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.nama}</h1>
                        <h1 className="display-6 fw-bold text-left">Your cart is empty</h1>
                    </div>
                }
            </div>
        );
    }
}

export default Cart;