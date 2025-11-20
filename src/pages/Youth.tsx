import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Youth = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("programs");

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '').toLowerCase();
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, [location.hash]);

  const sections = [
    {
      id: "programs",
      title: "Yeniyetmə Proqramları",
      description: "Yeniyetmələr üçün təhsil, təcrübə və inkişaf proqramları",
    },
    {
      id: "education",
      title: "Təhsil və Təlim",
      description: "Peşəkar təhsil və təlim proqramları",
    },
    {
      id: "sports",
      title: "İdman və Fəaliyyətlər",
      description: "İdman və əyləncəli fəaliyyətlər",
    },
    {
      id: "children",
      title: "Uşaqlar üçün Xidmətlər",
      description: "Uşaqlar üçün xüsusi xidmətlər və proqramlar",
    },
    {
      id: "events",
      title: "Tədbirlər və Aktivliklər",
      description: "Müxtəlif tədbirlər və aktivliklər",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-white">
        <div className="absolute inset-0">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/scott-blake-x-ghf9LjrVg-unsplash.jpg"
            alt="Yeniyetmə və Uşaq"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(65,74,138)]/80 via-[rgb(55,65,120)]/75 to-[rgb(45,55,100)]/80" />
        </div>
        <div className="container relative mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
              Yeniyetmə və Uşaq
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight drop-shadow-lg md:text-5xl lg:text-6xl">
              Yeniyetmə və Uşaq Xidmətləri
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90 leading-relaxed">
              Yeniyetmələr və uşaqlar üçün təhsil, təlim və inkişaf proqramları
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="grid gap-8 lg:grid-cols-2">
            {sections.map((section) => (
              <Card
                key={section.id}
                id={section.id}
                className="group overflow-hidden transition-shadow hover:shadow-xl scroll-mt-20"
              >
                <CardContent className="p-8">
                  <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Youth;

