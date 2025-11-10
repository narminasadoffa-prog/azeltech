import { Card, CardContent } from "@/components/ui/card";
import { Truck, Mountain, Construction, Building, Map } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Heavy Machinery Rental",
      items: ["Bulldozers", "Excavators", "Front loaders", "Compactors", "Telescopic handlers"],
      description: "All equipment is delivered in full working condition and regularly serviced. Short-term and long-term rental options available.",
    },
    {
      icon: <Mountain className="h-12 w-12" />,
      title: "Earthworks & Site Preparation",
      items: ["Excavation", "Land leveling", "Sub-base preparation", "Soil compaction"],
      description: "Professional execution with experienced operators and engineering control.",
    },
    {
      icon: <Construction className="h-12 w-12" />,
      title: "Road Construction",
      items: ["Roadbed preparation", "Compaction", "Pre-asphalt works"],
      description: "We provide full technical support for any stage of civil or infrastructure road construction.",
    },
    {
      icon: <Building className="h-12 w-12" />,
      title: "Construction & Subcontracting",
      items: ["Earthworks service", "Machinery logistics", "Industrial construction", "Civil construction"],
      description: "Providing earthworks, machinery service and logistics in industrial and civil construction projects.",
    },
    {
      icon: <Map className="h-12 w-12" />,
      title: "Land Planning & Project Support",
      items: ["Land planning according to design", "Relief leveling", "Technical supervision"],
      description: "Land planning according to project design with professional technical supervision.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Services</h1>
            <p className="text-xl text-primary-foreground/90">
              Comprehensive heavy machinery and construction services for projects of any scale
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 text-primary">{service.icon}</div>
                  <h2 className="mb-4 text-2xl font-bold text-card-foreground">{service.title}</h2>
                  <ul className="mb-4 space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground">{service.description}</p>
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

export default Services;
