const Loader = () => {
  return (
    <div className="loader position-fixed top-0 start-0 w-100 h-100 bg-white d-flex align-items-center justify-content-center">
      <div className="spinner-border text-dark" role="status"></div>
    </div>
  );
};

export default Loader;
