import React from "react";
import {Link} from "react-router-dom"
class About extends React.Component {
  render() {
    return (
      <>
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
              <p>
                Aperiam dolorum et et wuia molestias qui eveniet numquam nihil
                porro incidunt dolores placeat sunt id nobis omnis tiledo stran
                delop
              </p>
            </div>

            <div className="row gy-4">
              <div className="col-lg-6">
                <h3>Voluptatem dignissimos provident quasi corporis</h3>
                <img
                  src="img/about.jpg"
                  className="img-fluid rounded-4 mb-4"
                  alt=""
                />
                <p>
                  Ut fugiat ut sunt quia veniam. Voluptate perferendis
                  perspiciatis quod nisi et. Placeat debitis quia recusandae
                  odit et consequatur voluptatem. Dignissimos pariatur
                  consectetur fugiat voluptas ea.
                </p>
                <p>
                  Temporibus nihil enim deserunt sed ea. Provident sit expedita
                  aut cupiditate nihil vitae quo officia vel. Blanditiis
                  eligendi possimus et in cum. Quidem eos ut sint rem veniam
                  qui. Ut ut repellendus nobis tempore doloribus debitis
                  explicabo similique sit. Accusantium sed ut omnis beatae neque
                  deleniti repellendus.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Duis aute irure
                      dolor in reprehenderit in voluptate velit.
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure
                      dolor in reprehenderit in voluptate trideta storacalaperda
                      mastiro dolore eu fugiat nulla pariatur.
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident
                  </p>

                  <div className="position-relative mt-4">
                    <img
                      src="img/about-2.jpg"
                      className="img-fluid rounded-4"
                      alt=""
                    />
                    <Link to="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                      className="glightbox play-btn"
                    ></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="clients" classNameName="clients">
          <div classNameName="container" data-aos="zoom-out">
            <div classNameName="clients-slider swiper">
              <div classNameName="swiper-wrapper align-items-center">
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-1.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-2.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-3.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-4.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-5.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-6.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-7.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
                <div classNameName="swiper-slide">
                  <img
                    src="img/clients/client-8.png"
                    classNameName="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="stats-counter" classNameName="stats-counter">
          <div classNameName="container" data-aos="fade-up">
            <div classNameName="row gy-4 align-items-center">
              <div classNameName="col-lg-6">
                <img src="img/stats-img.svg" alt="" classNameName="img-fluid" />
              </div>

              <div classNameName="col-lg-6">
                <div classNameName="stats-item d-flex align-items-center">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="232"
                    data-purecounter-duration="1"
                    classNameName="purecounter"
                  ></span>
                  <p>
                    <strong>Happy Clients</strong> consequuntur quae diredo para
                    mesta
                  </p>
                </div>
                {/* End Stats Item */}

                <div classNameName="stats-item d-flex align-items-center">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="521"
                    data-purecounter-duration="1"
                    classNameName="purecounter"
                  ></span>
                  <p>
                    <strong>Projects</strong> adipisci atque cum quia aut
                  </p>
                </div>
                {/* End Stats Item */}

                <div classNameName="stats-item d-flex align-items-center">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="453"
                    data-purecounter-duration="1"
                    classNameName="purecounter"
                  ></span>
                  <p>
                    <strong>Hours Of Support</strong> aut commodi quaerat
                  </p>
                </div>
                {/* End Stats Item */}
              </div>
            </div>
          </div>
        </section>
        <Link to="#" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
      </>
    );
  }
}
export default About;
