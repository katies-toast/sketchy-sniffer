import { Link } from "react-router-dom";

const Navbar = () => {

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

        {/* Nav Links + Login */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/" className="font-body text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              Home
            </Link>
            <a href="#" className="font-body text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              How it Works
            </a>
            <a href="#" className="font-body text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              About
            </a>
          </div>

          <button
            className="rounded-md border-[3px] border-foreground bg-[hsl(45,100%,65%)] px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wide text-foreground transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(31,31,31,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
