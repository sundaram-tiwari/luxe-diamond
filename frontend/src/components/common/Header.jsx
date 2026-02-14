import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [megaOpen] = useState(false);

  return (
    <header className="main-header bg-white position-sticky top-0 shadow-sm">

      <div className="modal fade search-modal" id="searchModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
              <form action="#" className="product-search">
                <div className="input-group">
                  <input type="search" className="form-control" placeholder="Search products…" />
                  <button type="button" className="btn" data-bs-dismiss="modal"><i className="fa-solid fa-arrow-right"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="ads-card bg-black">
        <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <p className="text-center text-white py-2 text-uppercase fs-14 d-flex flex-wrap justify-content-center fw-bold">
                Love thyself | 30% OFF*
              </p>
            </div>
            <div className="back">
              <div className="text-center text-uppercase fs-14 d-flex flex-wrap justify-content-center py-2">
                <a href="" className="text-white mx-2 fw-bold">
                  24/7 CUSTOMER SERVICE
                </a>
                <a href="" className="text-white mx-2 fw-bold">
                  LIFETIME WARRANTY
                </a>
                <a href="" className="text-white mx-2 fw-bold">
                  FREE INTERNATIONAL SHIPPING
                </a>
                <a href="" className="text-white mx-2 fw-bold">
                  100% MONEY BACK GUARANTEE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TOP HEADER ================= */}
      <div className="header-top py-2 border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center gy-2">
            {/* Left */}
            <div className="col-lg-4 col-md-6">
              <ul className="d-flex align-items-center list-unstyled mb-0 gap-3 small">
                <li>
                  <a
                    href="tel:13265465985"
                    className="text-dark text-decoration-none"
                  >
                    132-65-465985
                  </a>
                  <span className="ms-2">Call or Text 24/7</span>
                </li>

                <li>
                  <a href="mailto:info@diamond.com" className="text-dark">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </li>

                <li className="dropdown">
                  <button
                    className="btn btn-sm dropdown-toggle border-0"
                    data-bs-toggle="dropdown"
                  >
                    USD
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item">USD</button>
                    </li>
                    <li>
                      <button className="dropdown-item">EUR</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div className="col-lg-4 text-center">
              <Link to="/">
                <img
                  src="/assets/img/lux-diamond-vertical-logo2.PNG"
                  alt="Diamond Sutra"
                  style={{ height: "50px" }}
                />
              </Link>
            </div>

            {/* Right */}
            <div className="col-lg-4 col-md-6 text-end">
              <ul className="d-flex justify-content-end align-items-center list-unstyled mb-0 gap-4">
                <li>
                  <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
                </li>
                <li>
                  <Link to="/wishlist" className="text-dark">
                    <i className="fa-regular fa-heart"></i>
                  </Link>
                </li>
                <li className="small text-muted d-none d-md-flex align-items-center">
                  <img src="/assets/img/market.png" width="20" alt="" />
                  <span className="ms-2">
                    locate <br /> our store
                  </span>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-dark text-decoration-none small"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-dark text-decoration-none small"
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="mainNavbar"
          >
            <ul className="navbar-nav gap-4">
              {/* ===== MEGA MENU ===== */}
              <li
                className="nav-item position-static"
                // onMouseEnter={() => setMegaOpen(true)}
                // onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="nav-link btn border-0">Rings</button>

                {megaOpen && (
                  <div className="mega-menu shadow-lg bg-white py-4 px-5 position-absolute start-0 w-100">
                    <div className="row">
                      <div className="col-md-3">
                        <h6 className="fw-bold">Shop By Ring Product</h6>
                        <ul className="list-unstyled small">
                          <li>
                            <Link to="#">Start with a Setting</Link>
                          </li>
                          <li>
                            <Link to="#">Start with a Diamond</Link>
                          </li>
                          <li>
                            <Link to="#">Lab-Created Diamond</Link>
                          </li>
                          <li>
                            <Link to="#">Start with a Gemstone</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-3">
                        <h6 className="fw-bold">Engagement Styles</h6>
                        <ul className="list-unstyled small">
                          <li>
                            <Link to="#">Solitaire</Link>
                          </li>
                          <li>
                            <Link to="#">Halo</Link>
                          </li>
                          <li>
                            <Link to="#">Vintage</Link>
                          </li>
                          <li>
                            <Link to="#">Three-Stone</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-3">
                        <h6 className="fw-bold">Shop by Metal</h6>
                        <ul className="list-unstyled small">
                          <li>
                            <Link to="#">Rose Gold</Link>
                          </li>
                          <li>
                            <Link to="#">White Gold</Link>
                          </li>
                          <li>
                            <Link to="#">Yellow Gold</Link>
                          </li>
                          <li>
                            <Link to="#">Platinum</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-3 text-center">
                        <img
                          src="/assets/img/cs-img2.png"
                          alt=""
                          className="img-fluid rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Other Nav Links */}
              <li className="nav-item">
                <Link className="nav-link" to="/earrings">
                  Earrings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pendants">
                  Pendants
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/solitaires">
                  Solitaires
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/jewellery">
                  All Jewellery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-danger" to="/offers">
                  Offers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
