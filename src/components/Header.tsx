import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Ana Səhifə" },
    { to: "/about", label: "Haqqımızda" },
    { to: "/services", label: "Xidmətlər" },
    { to: "/fleet", label: "Texnika Parkı" },
    { to: "/projects", label: "Layihələr" },
    { to: "/contact", label: "Əlaqə" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="text-xl font-bold text-primary">
          AZEL TEXNIKA
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </NavLink>
          ))}
          <Button asChild variant="default" size="sm">
            <NavLink to="/contact">Qiymət Təklifi</NavLink>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Button asChild variant="default" size="sm" className="w-full">
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Qiymət Təklifi
              </NavLink>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
