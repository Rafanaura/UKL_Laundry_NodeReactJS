import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import {Badge} from "react-bootstrap"
// import { withRouter } from "./Withrouter";

class Laporan extends React.Component {
  constructor() {
    super();
    this.state = {
      detail: [],
      transaksi: [],
      member: [],
      user: [],
      // outlet: [],
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
      this.state.role = localStorage.getItem("role")
      this.state.token = localStorage.getItem("token")
  } else {
      window.location = "/login"
  }
  }

  laporan = () => {
    let url =
      "http://localhost:3000/transaksi" 
    axios
      .get(url)
      .then((res) => {
        this.setState({
          transaksi: res.data.transaksi
          // member : res.data.transaksi.Member,
          // user : res.data.transaksi.User,
          // detail: res.data.transaksi.Detail_Transaksi,
        });
        console.log(this.state.transaksi);
        // console.log(this.state.detail);
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
    this.laporan();
    // this.getMember()
    // this.getUser()
  }

  render() {
    return (
      <>
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <div className="section-title">Laporan</div>
                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Id Transaksi</th>
                                        <th scope="col">Admin</th>
                                        <th scope="col">member</th>
                                        <th scope="col">Tgl Transaksi</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Total Akhir</th>
                                        <th scope="col">Paket</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Subtotal</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.transaksi.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.id_transaksi}</td>
                                                <td>{item.User.nama}</td>
                                                <td>{item.Member.nama_member}</td>
                                                <td>{this.convertTime(item.tanggal)}</td>
                                                <td>{item.status}</td>
                                                <td>{item.totalAkhir}</td>
                                                <td>
                                                    <ol>
                                                        {item.Detail_Transaksi.map((it, index) => (
                                                            <li>{it.Paket.jenis}</li>
                                                        ))}
                                                    </ol>
                                                </td>
                                                <td>
                                                    <ol>
                                                        {item.Detail_Transaksi.map((it, index) => (
                                                            <p>Rp {it.Paket.harga},-</p>
                                                        ))}
                                                    </ol>
                                                </td>
                                                <td>
                                                    {/* <ol> */}
                                                        {item.Detail_Transaksi.map((it, index) => (
                                                            <p>{it.qty}</p>
                                                        ))}
                                                    {/* </ol> */}
                                                </td>
                                                <td>
                                                    {/* <ol> */}
                                                        {item.Detail_Transaksi.map((it, index) => (
                                                            <p>Rp {it.totalAwal}</p>
                                                        ))}
                                                    {/* </ol> */}
                                                </td>
                                                {/* <td>{this.getAmount(item.detail_transaksi)}</td> */}

                                            </tr>
                                        )
                                    })}
                                    {/* <tr>
                                        <td colSpan="10">Total Pendapatan</td>
                                        <td>{this.state.total}</td>


                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
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
export default Laporan;
