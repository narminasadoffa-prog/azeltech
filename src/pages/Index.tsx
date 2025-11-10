import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { Check, Truck, Building2, Hammer, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const services = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Heavy Machinery Rental",
      description: "Modern fleet of bulldozers, excavators, loaders, and more",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Earthworks & Site Preparation",
      description: "Professional excavation, leveling, and soil compaction",
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Road Construction",
      description: "Complete roadbed preparation and pre-asphalt works",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Subcontracting Services",
      description: "Full technical support for construction projects",
    },
  ];

  const values = [
    { title: "Reliability", description: "Long-term cooperation and responsible execution" },
    { title: "Quality", description: "High-standard performance and technical accuracy" },
    { title: "Professional Team", description: "Skilled engineers, certified operators" },
    { title: "Transparency", description: "Clear terms, fair pricing, mutual trust" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Reliable machinery – Professional service – Sustainable results
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Your trusted partner in heavy equipment rental, earthworks, and construction services across Azerbaijan.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <NavLink to="/fleet">View Our Fleet</NavLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <NavLink to="/contact">Contact Us</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground md:text-4xl">
              Who We Are
            </h2>
            <div className="mb-8 text-center text-lg text-muted-foreground">
              <p className="mb-4">
                "Azel Texnika" LLC is a rapidly growing heavy machinery service company operating in Azerbaijan since 2021.
              </p>
              <p>
                We provide machinery rental, earthworks, road construction, infrastructure support and subcontracting services for projects of any scale.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Professional operators & engineers</h3>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Modern machinery fleet</h3>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Timely and safe project execution</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            Why Choose Us
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold text-primary">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            We Provide
          </h2>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center text-primary">{service.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Start Your Project?</h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Get a quote or rent machinery today
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary">
              <NavLink to="/contact">Request a Quote</NavLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <NavLink to="/fleet">Rent Machinery</NavLink>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
