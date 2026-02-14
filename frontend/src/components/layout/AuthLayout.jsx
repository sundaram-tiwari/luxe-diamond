const AuthLayout = ({ children }) => {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center vh-100 bg-light text-dark">
      <div className="container">
        <div className="row justify-content-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
