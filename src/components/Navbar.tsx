import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover-wiggle">
          <img src="/snif.png" alt="SketchySniffer" className="h-14 w-15" />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
            SketchySniffer
          </span>
        </Link>

        {/* Desktop Nav Links + Login */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/how-it-works" className="font-body text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
            How it Works
          </Link>
          <Link to="/about" className="font-body text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
            About
          </Link>
          <Link
            to="/login"
            className="rounded-md border-[3px] border-foreground bg-[hsl(45,100%,65%)] px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wide text-foreground transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(31,31,31,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            Login
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            ref={buttonRef}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground/40 bg-background transition-colors hover:border-foreground hover:bg-accent"
          >
            <div className="flex w-5 flex-col items-center gap-[5px]">
              <span
                className={`block h-[2.5px] w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "translate-y-[7.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "-translate-y-[7.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[calc(var(--navbar-h,73px))] z-40 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`absolute left-0 right-0 z-50 border-b-2 border-border bg-background shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        role="menu"
      >
        <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
          <Link
            to="/how-it-works"
            className={`rounded-md px-4 py-3 font-body text-base font-medium transition-colors ${
              location.pathname === "/how-it-works"
                ? "bg-accent text-primary"
                : "text-foreground/80 hover:bg-accent/60 hover:text-primary"
            }`}
            role="menuitem"
          >
            How it Works
          </Link>
          <Link
            to="/about"
            className={`rounded-md px-4 py-3 font-body text-base font-medium transition-colors ${
              location.pathname === "/about"
                ? "bg-accent text-primary"
                : "text-foreground/80 hover:bg-accent/60 hover:text-primary"
            }`}
            role="menuitem"
          >
            About
          </Link>
          <div className="my-1 border-t border-border" />
          <Link
            to="/login"
            className="mx-4 mt-1 mb-1 rounded-md border-[3px] border-foreground bg-[hsl(45,100%,65%)] px-4 py-2 text-center font-heading text-sm font-bold uppercase tracking-wide text-foreground transition-all active:translate-y-0.5"
            role="menuitem"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
