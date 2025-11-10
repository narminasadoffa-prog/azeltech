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
              2021-ci ildən etibarən Azərbaycanda peşəkar ağır texnika icarəsi və tikinti xidmətləri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Sürətli Keçidlər</h4>
            <nav className="flex flex-col gap-2">
              <NavLink to="/about" className="text-sm text-muted-foreground hover:text-primary">
                Haqqımızda
              </NavLink>
              <NavLink to="/services" className="text-sm text-muted-foreground hover:text-primary">
                Xidmətlər
              </NavLink>
              <NavLink to="/fleet" className="text-sm text-muted-foreground hover:text-primary">
                Texnika Parkı
              </NavLink>
              <NavLink to="/projects" className="text-sm text-muted-foreground hover:text-primary">
                Layihələr
              </NavLink>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Xidmətlərimiz</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Texnika İcarəsi</li>
              <li>Torpaq İşləri</li>
              <li>Yol Tikintisi</li>
              <li>Subpodratçılıq</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Bizimlə Əlaqə</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Bakı, Azərbaycan</span>
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
          <p>&copy; {new Date().getFullYear()} Azel Texnika MMC. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
