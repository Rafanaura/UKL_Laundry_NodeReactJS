import React from "react"
import {Link} from "react-router-dom"
class Header extends React.Component{
  constructor(){
    super()
    this.state = {
      role : ""
    }
    this.state.role = localStorage.getItem("role")
    }

    Logout = ()=> {
      localStorage.clear();
      window.location ="/"
    }
    render(){
        return(
            <>
            {/* ======= Header ======= */}
      <section id="topbar" className="topbar d-flex align-items-center">
      <div>
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              {/* <a to="mailto:contact@example.com">contact@example.com</a> */}
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 5589 55488 55</span>
            </i>
          </div>
          <div className="social-NavLinks d-none d-md-flex align-items-center">
            {/* <a href="_blank" className="twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="NavLinkedin">
              <i className="bi bi-NavLinkedin"></i>
            </a> */}
          </div>
        </div>
      </div>
    </section>
    {/* End Top Bar */}

    <header id="header" className="header d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <div className="logo d-flex align-items-center">
          {/* Uncomment the line below if you also wish to use an image logo */}
          <img src="img/logo.png" alt=""/>
          <h1>
            Fresh Laundry<span>.</span>
          </h1>
        </div>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li>
              <Link to="/user" className="nav-link">User</Link>
            </li>
            <li>
              <Link to="/member" className="nav-link">Member</Link>
            </li>
            <li>
              <Link to="/outlet" className="nav-link">Outlet</Link>
            </li>
            <li>
              <Link to="/paket" className="nav-link">Paket</Link>
            </li>
            <li>
              <Link to="/transaksi" className="nav-link">Transaksi</Link>
            </li>
            {/* <li>
              <Link to="/cart" className="nav-link">Ker</Link>
            </li> */}
            <li>
              <button onClick={()=> this.Logout()} className="btn btn-dark btn-rounded">Logout</button>
            </li>
          </ul>
        </nav>
        {/* .navbar */}

        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      </div>
    </header>
    {/* End Header */}
    </>
        )
    }
}
export default Header;