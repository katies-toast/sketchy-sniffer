import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover-wiggle">
          <span className="text-2xl" role="img" aria-label="nose">👃</span>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
            SketchySniffer
          </span>
        </Link>

        {/* Nav Links */}
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

        {/* CTA */}
        <Button
          onClick={() => navigate("/")}
          className="sniff-pulse sketchy-border font-heading font-bold"
          size="sm"
        >
          Sniff a link
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
