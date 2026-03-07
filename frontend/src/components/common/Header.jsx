import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCart } from "../../utils/cart";

const Header = () => {
  const [cartItems] = useState(() => getCart());
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // const navigate = useNavigate();

  const [token] = useState(() => {
    return localStorage.getItem("token");
  });

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setToken(null);
  //   navigate("/");
  // };

  return (
    <header className="main-header bg-white position-sticky top-0 shadow-sm">
      <div
        className="modal fade search-modal"
        id="searchModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <form action="#" className="product-search">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search products…"
                  />
                  <button type="button" className="btn" data-bs-dismiss="modal">
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
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

      <div className="header-top py-2 border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center gy-2">
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

                {/* <li className="dropdown">
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
                </li> */}
              </ul>
            </div>

            <div className="col-lg-4 text-center">
              <Link to="/">
                <img
                  src="/assets/img/lux-diamond-vertical-logo2.PNG"
                  alt="Diamond Sutra"
                  style={{ height: "50px" }}
                />
              </Link>
            </div>

            <div className="col-lg-4 col-md-6 text-end">
              <ul className="d-flex justify-content-end align-items-center list-unstyled mb-0 gap-4">
                <li>
                  <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
                </li>
                <li>
                  <Link to="/cart" className="cart-icon-wrapper">
                    <i className="fa-solid fa-shopping-cart"></i>
                    {cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span>
                    )}
                  </Link>
                </li>
                {/* <li className="small text-muted d-none d-md-flex align-items-center">
                  <img src="/assets/img/market.png" width="20" alt="" />
                  <span className="ms-2">
                    locate <br /> our store
                  </span>
                </li> */}
                {!token ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile" className="text-dark fs-5">
                        <i className="fa-solid fa-user"></i>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

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
              <li className="nav-item">
                <NavLink
                  to="/product/Rings"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-nav" : "nav-link"
                  }
                >
                  Rings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/product/Earrings"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-nav" : "nav-link"
                  }
                >
                  Earrings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/product/Pendants"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-nav" : "nav-link"
                  }
                >
                  Pendants
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/product/Bracelets"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-nav" : "nav-link"
                  }
                >
                  Bracelets
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/product/Bangles"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-nav" : "nav-link"
                  }
                >
                  Bangles
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/product/all"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-nav" : "nav-link"
                  }
                >
                  All Jewellery
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink
                  to="/offers"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-danger active-nav"
                      : "nav-link text-danger"
                  }
                >
                  Offers
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
