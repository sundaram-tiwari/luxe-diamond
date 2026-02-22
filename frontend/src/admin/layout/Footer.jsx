const Footer = () => {
  return (
    <footer className="p-4 mt-auto border-top border-secondary text-center bg-light">
      <div className="container-fluid">
        <h6 className="text-dark m-0">
          Luxe Diamond © {new Date().getFullYear()}
        </h6>
      </div>
    </footer>
  );
};

export default Footer;