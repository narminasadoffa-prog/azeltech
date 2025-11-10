import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Projects = () => {
  const services = [
    "Qazma işləri",
    "Torpaq düzləşdirmə",
    "Yol yatağı tikintisi",
    "Texniki dəstək və nəzarət",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Layihələrimiz</h1>
            <p className="text-xl text-primary-foreground/90">
              Uğurlu infrastruktur və tikinti layihələrində sübut olunmuş iş təcrübəsi
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
                  2021-ci ildən etibarən ümummilli tikinti, infrastruktur və torpaq inkişafı layihələrində subpodratçı kimi uğurla fəaliyyət göstəririk.
                </p>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Görülən işlərimiz:</h2>
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
                İş Təcrübəmiz
              </h3>
              <p className="text-lg text-muted-foreground">
                Tamamlanmış və davam edən layihələr Azərbaycanın tikinti və infrastruktur sektorlarında etibarlılığımızı, texniki potensialımızı və güclü tərəfdaş reputasiyamızı nümayiş etdirir.
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
