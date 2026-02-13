import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-semibold tracking-wide">
        Luxe Diamond
      </Link>

      <div className="space-x-6">
        <Link to="/signin" className="hover:text-gold transition">
          Sign In
        </Link>
        <Link
          to="/signup"
          className="border border-gold px-4 py-1 hover:bg-gold hover:text-black transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
