import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string | null;
  items: string | null;
  published: boolean;
}

const Services = () => {
  const location = useLocation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (location.hash && services.length > 0) {
      const hash = location.hash.replace('#', '').toLowerCase();
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
      if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, [location.hash, services]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      const data = await response.json();
      setServices(data.filter((service: Service) => service.published));
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseItems = (items: string | null): string[] => {
    if (!items) return [];
    try {
      return JSON.parse(items);
    } catch {
      return [];
    }
  };

  const parseImages = (image: string | null): string[] => {
    if (!image) return [];
    try {
      const parsed = JSON.parse(image);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      // Köhnə format - tək string
      return [image];
    } catch {
      // JSON deyilsə, tək string kimi işlə
      return image ? [image] : [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-white">
        <div className="absolute inset-0">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/scott-blake-x-ghf9LjrVg-unsplash.jpg"
            alt="Xidmətlərimiz"
            className="h-full w-full object-cover object-center"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(65,74,138)]/80 via-[rgb(55,65,120)]/75 to-[rgb(45,55,100)]/80" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-[-10%] hidden aspect-square rounded-full bg-white/5 blur-3xl sm:block" />
        <div className="container relative mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
              Peşəkar Xidmətlər
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight drop-shadow-lg md:text-5xl lg:text-6xl">
              Xidmətlərimiz
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90 leading-relaxed">
              İstənilən miqyaslı layihələr üçün kompleks ağır texnika və tikinti xidmətləri
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          {loading ? (
            <div className="text-center py-12">Yüklənir...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Hələ xidmət yoxdur</div>
          ) : (
          <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service) => {
                // Map service titles to hash values from header
                const serviceHashMap: Record<string, string> = {
                  'Ağır Texnika İcarəsi': 'heavy-equipment',
                  'Torpaq Qazma və Ərazi Hazırlığı': 'earthworks',
                  'Yol Tikintisi və İnfrastruktur İşləri': 'road-construction',
                  'Tikinti və Subpodrat Xidmətləri': 'construction-services',
                  'Ərazi Planlaşdırılması və Layihə Dəstəyi': 'planning-support',
                };
                
                const hashId = serviceHashMap[service.title] || service.id;
                
                return (
              <Card key={service.id} id={hashId} className="group overflow-hidden transition-shadow hover:shadow-xl scroll-mt-20">
                <div className="relative aspect-video overflow-hidden">
                  {(() => {
                    const serviceImages = parseImages(service.image);
                    if (serviceImages.length === 0) {
                      return (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                          Şəkil yoxdur
                        </div>
                      );
                    }
                    if (serviceImages.length === 1) {
                      return (
                        <>
                          <img
                            src={serviceImages[0].startsWith('http') ? serviceImages[0] : (serviceImages[0].startsWith('/uploads') ? `${API_URL}${serviceImages[0]}` : `${API_URL}/uploads/${serviceImages[0]}`)}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              console.error('Image load error:', serviceImages[0]);
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                  </div>
                        </>
                      );
                    }
                    // Multiple images - use carousel
                    return (
                      <Carousel className="h-full w-full" opts={{ loop: true }}>
                        <CarouselContent className="h-full">
                          {serviceImages.map((img, imgIndex) => (
                            <CarouselItem key={imgIndex} className="h-full">
                              <div className="relative h-full w-full">
                                <img
                                  src={img.startsWith('http') ? img : (img.startsWith('/uploads') ? `${API_URL}${img}` : `${API_URL}/uploads/${img}`)}
                                  alt={`${service.title} - ${imgIndex + 1}`}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  onError={(e) => {
                                    console.error('Image load error:', img);
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                {imgIndex === 0 && (
                                  <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                                  </div>
                                )}
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 text-white border-white/20 bg-black/40 hover:bg-black/60 hover:border-white/40" />
                        <CarouselNext className="right-2 text-white border-white/20 bg-black/40 hover:bg-black/60 hover:border-white/40" />
                      </Carousel>
                    );
                  })()}
                </div>
                <CardContent className="p-6">
                  {parseItems(service.items).length > 0 && (
                  <ul className="mb-4 space-y-2">
                      {parseItems(service.items).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  )}
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
                );
              })}
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
