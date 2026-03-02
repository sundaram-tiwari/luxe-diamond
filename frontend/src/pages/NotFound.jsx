import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-dark text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-4">

            <img
              src="/assets/img/404.png"
              alt="404"
              className="img-fluid opacity-50 mb-4"
            />

            <h1 className="text-uppercase fw-light mb-4">
              Oops! Page not found.
            </h1>

            <Link
              to="/"
              className="btn btn-dark px-4 py-2 text-uppercase"
            >
              Back to Home
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;