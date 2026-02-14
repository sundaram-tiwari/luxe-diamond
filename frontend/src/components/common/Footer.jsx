import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer>

      {/* ================= NEWSLETTER ================= */}
      <div className="bg-light py-4 border-top">
        <div className="container">
          <div className="row justify-content-between align-items-center gy-3">

            <div className="col-lg-6">
              <div className="d-flex flex-wrap gap-4 align-items-center">
                <h5 className="m-0 fw-bold text-uppercase">
                  Our Newsletter
                </h5>

                <form
                  onSubmit={handleSubscribe}
                  className="d-flex align-items-center gap-2 border p-2"
                >
                  <input
                    type="email"
                    className="form-control bg-transparent border-0 shadow-none"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn bg-black text-white rounded-0 px-4"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>

            {/* Social Icons */}
            <div className="col-auto">
              <div className="fs-4 d-flex gap-4">
                <a href="#" className="text-dark">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="text-dark">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="text-dark">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="text-dark">
                  <i className="fa-brands fa-pinterest-p"></i>
                </a>
                <a href="#" className="text-dark">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="main-footer py-5 bg-white">
        <div className="container">
          <div className="row gy-4">

            {/* ABOUT */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="mb-3 fw-bold">ABOUT US</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="#">Who We Are</Link></li>
                <li><Link to="#">Careers</Link></li>
              </ul>

              <h6 className="mb-3 fw-bold mt-4">CUSTOMER DELIGHT</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="#">Contact Us</Link></li>
                <li><Link to="#">FAQ</Link></li>
                <li><a href="tel:18004190066">18004190066</a></li>
                <li className="small text-muted">
                  (9 am - 10 pm, 7 days a week)
                </li>
              </ul>
            </div>

            {/* POLICIES */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="mb-3 fw-bold">POLICIES</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="#">15-Day Returns</Link></li>
                <li><Link to="#">Lifetime Exchange & Buyback</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
                <li><Link to="#">Fraud Warning Disclaimer</Link></li>
              </ul>
            </div>

            {/* CONFIDENCE */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="mb-3 fw-bold">SHOP WITH CONFIDENCE</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="#">Why Buy From Us?</Link></li>
                <li><Link to="#">Our Certifications</Link></li>
                <li><Link to="#">Testimonials</Link></li>
                <li><Link to="#">Corporate Gifting</Link></li>
              </ul>
            </div>

            {/* GUIDE */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="mb-3 fw-bold">JEWELLERY GUIDE</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="#">Buying & Price Guide</Link></li>
                <li><Link to="#">Certification Guide</Link></li>
                <li><Link to="#">Diamond & Solitaire Guide</Link></li>
                <li><Link to="#">Gifting Guide</Link></li>
                <li><Link to="#">Jewellery Care Guide</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="text-center text-white bg-black py-3 small text-uppercase">
        © {new Date().getFullYear()} Diamond Sutra. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
