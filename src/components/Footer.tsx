import { NavLink } from "./NavLink";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">AZEL TEXNIKA</h3>
            <p className="text-sm text-muted-foreground">
              Professional heavy machinery rental and construction services across Azerbaijan since 2021.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <NavLink to="/about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </NavLink>
              <NavLink to="/services" className="text-sm text-muted-foreground hover:text-primary">
                Services
              </NavLink>
              <NavLink to="/fleet" className="text-sm text-muted-foreground hover:text-primary">
                Our Fleet
              </NavLink>
              <NavLink to="/projects" className="text-sm text-muted-foreground hover:text-primary">
                Projects
              </NavLink>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Our Services</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Machinery Rental</li>
              <li>Earthworks</li>
              <li>Road Construction</li>
              <li>Subcontracting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Baku, Azerbaijan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+994 XX XXX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@azeltexnika.az</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Azel Texnika LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
