// src/components/Home/navbar/navbar.jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/photos/logo.png";

const NAV_LINKS = [
  { to: "/events", label: "Events" },
  { to: "/teams", label: "Team" },
  { to: "/developer", label: "Developers" },
];

const SCROLL_LINKS = [
  { section: "guests", label: "Lectures" },
  { section: "sponsors", label: "Sponsors" },
  { section: "aboutus", label: "About Us" },
];

const NavLink = ({ to, label, onClick, isMobile = false }) => (
  <Link
    to={to}
    onClick={onClick}
    className={
      isMobile
        ? "block px-6 py-3 font-bold text-xl text-white hover:scale-110 hover:text-orange-400 transition-all duration-200"
        : "px-2 lg:px-4 py-2 font-bold text-sm lg:text-base hover:text-orange-400 transition-colors whitespace-nowrap"
    }
  >
    {label}
  </Link>
);

const ScrollLink = ({ section, label, onClick, isMobile = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const scrollToSection = () => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 100);
    } else {
      scrollToSection();
    }

    if (onClick) onClick();
  };

  return (
    <a
      href={`#${section}`}
      onClick={handleClick}
      className={
        isMobile
          ? "block px-6 py-3 font-bold text-xl text-white hover:scale-110 hover:text-orange-400 transition-all duration-200"
          : "px-2 lg:px-4 py-2 font-bold text-sm lg:text-base hover:text-orange-400 transition-colors whitespace-nowrap"
      }
    >
      {label}
    </a>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`top-0 py-5 bg-black z-[999] transition-all duration-300 flex items-center justify-center ${
        isScrolled ? "translate-y-2" : "translate-y-0"
      }`}
    >
      <div
        className={`sticky top-0 text-white px-3 py-2 rounded-full flex items-center justify-between w-full sm:w-auto md:max-w-5xl shadow-[0_0_10px_2px_rgba(255,140,0,0.8)] ${
          isScrolled ? "bg-black/40 backdrop-blur-sm" : "bg-[#2b2b28]"
        }`}
      >
        {/* Mobile hamburger */}
        <button
          className="md:hidden focus:outline-none z-[100]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Mobile overlay menu */}
        {typeof document !== "undefined" &&
          ReactDOM.createPortal(
            <div
              className={`fixed inset-x-0 top-0 w-full bg-[#111] py-6 transition-all duration-300 z-[9999] md:hidden ${
                isOpen ? "flex flex-col" : "hidden"
              }`}
            >
              <button
                onClick={closeMenu}
                className="absolute right-4 top-4 p-2 focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} {...link} onClick={closeMenu} isMobile />
              ))}
              {SCROLL_LINKS.map((link) => (
                <ScrollLink key={link.section} {...link} onClick={closeMenu} isMobile />
              ))}
            </div>,
            document.body
          )}

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </div>

          <Link to="/" className="flex-shrink-0 mx-2 lg:mx-4">
            <img src={logo} alt="Techspardha Logo" className="h-8 lg:h-12 w-auto" />
          </Link>

          <div className="flex items-center gap-1 lg:gap-2">
            {SCROLL_LINKS.map((link) => (
              <ScrollLink key={link.section} {...link} />
            ))}
          </div>
        </div>

        {/* Mobile branding */}
        <Link to="/" className="md:hidden flex items-center gap-2">
          <span className="text-white font-bold text-lg">
            Techspardha <span className="text-orange-400">25</span>
          </span>
          <img src={logo} alt="Techspardha Logo" className="h-8 w-auto" />
        </Link>
      </div>
    </nav>
  );
}
