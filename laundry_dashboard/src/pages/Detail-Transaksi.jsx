import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import {Badge} from "react-bootstrap"
// import { withRouter } from "./Withrouter";

class DetailTransaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      detail: [],
      transaksi: [],
      member: [],
      user: [],
      outlet: [],
      token: "",
      role: "",
      nama: "",
      id_outlet: 0,
      id_transaksi: 0,
      id_member: 0,
      id_user: 0,
      action: "",
    };
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "kasir"
      ) {
        this.state.role = localStorage.getItem("role");
        this.state.token = localStorage.getItem("token");
        this.state.nama = localStorage.getItem("nama");
        this.state.id_transaksi = localStorage.getItem("id_transaksi");
        this.state.id_member = localStorage.getItem("id_member");
        this.state.id_user = localStorage.getItem("id_user");
      } else {
        window.alert("You are not an admin or a cashier");
        window.location = "/login";
        localStorage.clear();
      }
    } else {
      window.location = "/login";
    }
  }

  getDetail = () => {
    let url =
      "http://localhost:3000/transaksi/detail/" + this.state.id_transaksi;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          transaksi: res.data.transaksi,
          member : res.data.transaksi.Member,
          user : res.data.transaksi.User,
          detail: res.data.transaksi.Detail_Transaksi,
          totalAkhir: res.data.totalAkhir,
        });
        console.log(this.state.transaksi);
        console.log(this.state.detail);
      })
      .catch((error) => [console.log(error)]);
  };

//   getMember = () => {
//       let url = `"http://localhost:3000/member/" + this.state.id_member
//       axios.get(url)
//           .then(res => {
//               this.setState({
//                   member: res.data.member
//               })
//               console.log(this.state.member)
//           })
//           .catch(error => {
//               console.log(error)
//           })
//   }

//   getUser = () => {
//       let url = `http://localhost:3000/user/${this.state.id_user}`
//       axios.get(url)
//           .then(res => {
//               this.setState({
//                   user: res.data.user
//               })
//               console.log(this.state.user)
//           })
//           .catch(error => {
//               console.log(error)
//           })
//   }

  convertTime = (time) => {
    let date = new Date(time);
    return `${date.getDate()}-${
      Number(date.getMonth()) + 1
    }-${date.getFullYear()}`;
  };

  componentDidMount() {
    this.getDetail();
    // this.getMember()
    // this.getUser()
  }

  render() {
    return (
      <>
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <div className="row mb-4">
              <div className="col-4">
                <h6>Id Transaksi</h6>
                <h6>Tanggal Transaksi</h6>
                <h6>Batas Waktu</h6>
                <h6>Tanggal Bayar</h6>
                <h6>Status</h6>
                <h6>Status Pembayaran</h6>
                <h6>Nama Member</h6>
                <h6>Telepon Member</h6>
                <h6>Alamat Member</h6>
                <h6>Nama User</h6>
              </div>
              <div className="col-6">
                <h6 className="text-muted">
                  {this.state.transaksi.id_transaksi}
                </h6>
                <h6 className="text-muted">
                  {this.convertTime(this.state.transaksi.tanggal)}
                </h6>
                <h6 className="text-muted">
                  {this.convertTime(this.state.transaksi.batas_waktu)}
                </h6>
                {this.state.transaksi.tanggal_bayar === null && (
                  <h6 className="text-danger">0/0/0</h6>
                )}
                {this.state.transaksi.tanggal_bayar !== null && (
                  <h6 className="text-muted">
                    {this.convertTime(this.state.transaksi.tanggal_bayar)}
                  </h6>
                )}
                <h6 className="text-muted">{this.state.transaksi.status}</h6>
                {this.state.transaksi.dibayar === "dibayar" && (
                  <h6 className="text-muted"> Dibayar </h6>
                )}
                {this.state.transaksi.dibayar === "belum_dibayar" && (
                  <h6 className="text-muted"> Belum dibayar </h6>
                )}
                <h6 className="text-muted">{this.state.member.nama_member}</h6>
                <h6 className="text-muted">{this.state.member.telepon}</h6>
                <h6 className="text-muted">
                  {this.state.member.alamat}
                </h6>
                <h6 className="text-muted">{this.state.user.nama}</h6>
              </div>
            </div>

            <table className="table table-bordered text-black">
              <thead>
                <tr>
                  <th>Paket</th>
                  <th>Qty</th>
                  <th>Harga</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.detail.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Paket.jenis}</td>
                    <td>{item.qty}</td>
                    <td>Rp {item.Paket.harga}</td>
                    <td className="text-left">Rp {item.totalAwal}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="align-self-end">
                    Total
                  </td>
                  <td className="text-left" colSpan={3}>
                    Rp {this.state.transaksi.totalAkhir}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
export default DetailTransaksi;
