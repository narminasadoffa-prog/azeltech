import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFleetOpen, setMobileFleetOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileFleetOpen(false);
      setMobileServicesOpen(false);
    }
  }, [mobileMenuOpen]);

  const activeFleetHash = useMemo(() => {
    if (!location.pathname.startsWith("/fleet")) {
      return null;
    }

    return (location.hash && location.hash !== "#") ? location.hash : "#all";
  }, [location.hash, location.pathname]);

  const fleetDropdownItems = [
    { to: "/fleet#all", label: "Hamısı", value: "all" },
    { to: "/fleet#telehandlers", label: "Teleskopik yükləyicilər", value: "telehandlers" },
    { to: "/fleet#backhoe", label: "Bekoladerlər", value: "backhoe" },
    { to: "/fleet#bulldozers", label: "Buldozerlər", value: "bulldozers" },
    { to: "/fleet#excavators", label: "Ekskavatorlar", value: "excavators" },
    { to: "/fleet#loaders", label: "Frontal yükləyicilər", value: "loaders" },
    { to: "/fleet#rollers", label: "Katoklar", value: "rollers" },
    { to: "/fleet#graders", label: "Qreyderlər", value: "graders" },
  ];

  const servicesDropdownItems = [
    { to: "/services#heavy-equipment", label: "Ağır Texnika İcarəsi", value: "heavy-equipment" },
    { to: "/services#earthworks", label: "Torpaq Qazma və Ərazi Hazırlığı", value: "earthworks" },
    { to: "/services#road-construction", label: "Yol Tikintisi və İnfrastruktur İşləri", value: "road-construction" },
    { to: "/services#construction-services", label: "Tikinti və Subpodrat Xidmətləri", value: "construction-services" },
    { to: "/services#planning-support", label: "Ərazi Planlaşdırılması və Layihə Dəstəyi", value: "planning-support" },
  ];

  const activeServicesHash = useMemo(() => {
    if (!location.pathname.startsWith("/services")) {
      return null;
    }

    return (location.hash && location.hash !== "#") ? location.hash : null;
  }, [location.hash, location.pathname]);

  const navLinks = [
    { to: "/", label: "Ana Səhifə" },
    { to: "/about", label: "Haqqımızda" },
    { to: "/services", label: "Xidmətlər", dropdown: servicesDropdownItems },
    { to: "/fleet", label: "Texnika Parkı", dropdown: fleetDropdownItems },
    { to: "/projects", label: "Layihələr" },
    { to: "/blog", label: "Blog / Yeniliklər" },
    { to: "/contact", label: "Əlaqə" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex min-h-20 items-center justify-between px-4 py-4" style={{ maxWidth: '1200px' }}>
        <NavLink to="/" className="flex items-center">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/Screenshot%202025-11-14%20181237.png"
            alt="AZEL TEXNIKA"
            className="h-16 w-auto object-contain"
          />
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
                      {link.dropdown.map((item) => {
                        const isActive = link.to === "/fleet" 
                          ? activeFleetHash === `#${item.value}`
                          : link.to === "/services"
                          ? activeServicesHash === `#${item.value}`
                          : false;
                        return (
                          <li key={item.to}>
                            <NavLink
                              to={item.to}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-primary",
                                isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                              )}
                              end
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        );
                      })}
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
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4" style={{ maxWidth: '1200px' }}>
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
                      onClick={() => {
                        if (link.to === "/fleet") {
                          setMobileFleetOpen((prev) => !prev);
                        } else if (link.to === "/services") {
                          setMobileServicesOpen((prev) => !prev);
                        }
                      }}
                      className="rounded-full p-1 text-muted-foreground transition hover:bg-muted/80"
                      aria-label={`${link.label} kateqoriyalarını aç`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          (link.to === "/fleet" && mobileFleetOpen) ||
                          (link.to === "/services" && mobileServicesOpen)
                            ? "-rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                  {((link.to === "/fleet" && mobileFleetOpen) ||
                    (link.to === "/services" && mobileServicesOpen)) && (
                    <div className="space-y-2 border-l border-border/60 pl-4">
                      {link.dropdown.map((item) => {
                        const isActive =
                          link.to === "/fleet"
                            ? activeFleetHash === `#${item.value}`
                            : link.to === "/services"
                            ? activeServicesHash === `#${item.value}`
                            : false;
                        return (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            className={cn(
                              "block text-sm text-muted-foreground transition-colors hover:text-primary",
                              isActive && "text-primary font-semibold",
                            )}
                            activeClassName="text-primary"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFleetOpen(false);
                              setMobileServicesOpen(false);
                            }}
                          >
                            {item.label}
                          </NavLink>
                        );
                      })}
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
