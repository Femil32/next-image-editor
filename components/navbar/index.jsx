import Link from "next/link";

const Navbar = ({ children }) => {
  return (
    <nav className="fixed-navbar">
      <Link className="active" href="/">
        Image Editor
      </Link>
      {children}
    </nav>
  );
};

export default Navbar;
