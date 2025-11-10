import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Projects = () => {
  const services = [
    "Excavation",
    "Land leveling",
    "Roadbed construction",
    "Technical support and supervision",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Projects</h1>
            <p className="text-xl text-primary-foreground/90">
              Proven track record of successful infrastructure and construction projects
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-12">
              <CardContent className="p-8">
                <p className="mb-6 text-lg text-muted-foreground">
                  We have successfully operated as a subcontractor in nationwide construction, infrastructure and land development projects since 2021.
                </p>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Our work includes:</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                      <span className="text-card-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg bg-muted p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Our Track Record
              </h3>
              <p className="text-lg text-muted-foreground">
                Completed and ongoing projects highlight our reliability, technical capability and strong partner reputation across Azerbaijan's construction and infrastructure sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
