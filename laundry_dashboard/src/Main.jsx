import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Outlet from "./pages/Outlet";
import Paket from "./pages/Paket";
import User from "./pages/User";
import Member from "./pages/Member";
import Transaksi from "./pages/Transaksi";
import DetailTransaksi from "./pages/Detail-Transaksi";
import Cart from "./pages/Cart"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Laporan from "./pages/Laporan"
class Main extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/outlet" element={<Outlet />}></Route>
        <Route exact path="/paket" element={<Paket />}></Route>
        <Route exact path="/user" element={<User />}></Route>
        <Route exact path="/member" element={<Member />}></Route>
        <Route exact path="/transaksi" element={<Transaksi />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/detail/:id_transaksi" element={<DetailTransaksi/>} />
        <Route exact path="/cart" element={<Cart/>}></Route>
        <Route exact path="/laporan" element={<Laporan/>}></Route>
      </Routes>
    );
  }
}
export default Main;
