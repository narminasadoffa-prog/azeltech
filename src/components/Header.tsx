import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFleetOpen, setMobileFleetOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileFleetOpen(false);
    }
  }, [mobileMenuOpen]);

  const fleetDropdownItems = [
    { to: "/fleet#telehandlers", label: "İlə teleskopik yükləyicilər" },
    { to: "/fleet#backhoe", label: "İlə bekoladerlər" },
    { to: "/fleet#bulldozers", label: "İlə buldozerlər" },
    { to: "/fleet#excavators", label: "İlə ekskavatorlar" },
    { to: "/fleet#loaders", label: "İlə frontal yükləyicilər" },
    { to: "/fleet#rollers", label: "İlə katoklar" },
    { to: "/fleet#graders", label: "İlə qreyderlər" },
  ];

  const navLinks = [
    { to: "/", label: "Ana Səhifə" },
    { to: "/about", label: "Haqqımızda" },
    { to: "/services", label: "Xidmətlər" },
    { to: "/fleet", label: "Texnika Parkı", dropdown: fleetDropdownItems },
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
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.to} className="group relative">
                <NavLink
                  to={link.to}
                  className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  activeClassName="text-primary"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:-rotate-180" />
                </NavLink>
                <div className="pointer-events-none absolute left-0 top-full mt-2 w-64 -translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur">
                    <ul className="space-y-1">
                      {link.dropdown.map((item) => (
                        <li key={item.to}>
                          <NavLink
                            to={item.to}
                            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-primary"
                            activeClassName="text-primary"
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </NavLink>
            )
          )}
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
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.to} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={link.to}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                      activeClassName="text-primary"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setMobileFleetOpen((prev) => !prev)}
                      className="rounded-full p-1 text-muted-foreground transition hover:bg-muted/80"
                      aria-label="Texnika parkının kateqoriyalarını aç"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${mobileFleetOpen ? "-rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {mobileFleetOpen && (
                    <div className="space-y-2 border-l border-border/60 pl-4">
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                          activeClassName="text-primary"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileFleetOpen(false);
                          }}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
              )
            )}
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
