import { NavLink } from "./NavLink";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 bg-[rgb(65,74,138)]">
      <div className="container mx-auto px-4 py-12" style={{ maxWidth: '1200px' }}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">AZEL TEXNIKA</h3>
            <p className="text-sm text-white">
              2021-ci ildən etibarən Azərbaycanda peşəkar ağır texnika icarəsi və tikinti xidmətləri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Sürətli Keçidlər</h4>
            <nav className="flex flex-col gap-2">
              <NavLink to="/about" className="text-sm text-white hover:text-white/80">
                Haqqımızda
              </NavLink>
              <NavLink to="/services" className="text-sm text-white hover:text-white/80">
                Xidmətlər
              </NavLink>
              <NavLink to="/fleet" className="text-sm text-white hover:text-white/80">
                Texnika Parkı
              </NavLink>
              <NavLink to="/projects" className="text-sm text-white hover:text-white/80">
                Layihələr
              </NavLink>
              <NavLink to="/blog" className="text-sm text-white hover:text-white/80">
                Blog / Yeniliklər
              </NavLink>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Xidmətlərimiz</h4>
            <ul className="flex flex-col gap-2 text-sm text-white">
              <li>Texnika İcarəsi</li>
              <li>Torpaq İşləri</li>
              <li>Yol Tikintisi</li>
              <li>Subpodratçılıq</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Bizimlə Əlaqə</h4>
            <div className="flex flex-col gap-3 text-sm text-white">
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

        <div className="mt-8 border-t border-white/20 pt-8 text-center text-base text-white">
          <p className="text-white/70">Created by Midiya.az</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
