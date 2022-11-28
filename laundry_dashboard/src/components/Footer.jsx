import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <>
        {/* ======= Footer ======= */}
        <footer id="footer" className="footer">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-5 col-md-12 footer-info">
                <Link to="#" className="logo d-flex align-items-center">
                  <span>Fresh Laundry</span>
                </Link>
                <p>
                  Cras fermentum odio eu feugiat lide par naso tierra. Justo
                  eget nada terra videa magna derita valies darta donna mare
                  fermentum iaculis eu non diam phasellus.
                </p>
                <div className="social-links d-flex mt-4">
                  <Link to="#" className="twitter">
                    <i className="bi bi-twitter"></i>
                  </Link>
                  <Link to="#" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link to="#" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link to="#" className="linkedin">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <Link to="#">Home</Link>
                  </li>
                  <li>
                    <Link to="#">About us</Link>
                  </li>
                  <li>
                    <Link to="#">Services</Link>
                  </li>
                  <li>
                    <Link to="#">Terms of service</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy policy</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <Link to="#">Web Design</Link>
                  </li>
                  <li>
                    <Link to="#">Web Development</Link>
                  </li>
                  <li>
                    <Link to="#">Product Management</Link>
                  </li>
                  <li>
                    <Link to="#">Marketing</Link>
                  </li>
                  <li>
                    <Link to="#">Graphic Design</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4>Contact Us</h4>
                <p>
                  A108 Adam Street <br></br>
                  New York, NY 535022<br></br>
                  United States <br></br>
                  <br></br>
                  <strong>Phone:</strong> +1 5589 55488 55<br></br>
                  <strong>Email:</strong> info@example.com<br></br>
                </p>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Fresh Laundry</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <Link to="https://bootstrapmade.com/">BootstrapMade</Link>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
export default Footer;
