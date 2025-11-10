import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    "Vaxtında və təhlükəsiz icra",
    "Texniki dəqiqlik",
    "Peşəkar nəzarət",
    "Qənaətcil və effektiv həllər",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Azel Texnika MMC Haqqında</h1>
            <p className="text-xl text-primary-foreground/90">
              Şəffaflıq, dəqiqlik və etibarlılıq — bizim işimizin əsasıdır.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 space-y-6 text-lg text-muted-foreground">
              <p>
                "Azel Texnika" MMC 2021-ci ildən etibarən Azərbaycanda ağır texnika icarəsi və tikinti dəstəyi xidmətləri göstərir. Missiyamız müasir avadanlıq və peşəkar heyət ilə ölkənin inkişafına töhfə verməkdir.
              </p>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Biz təmin edirik:</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                      <span className="text-card-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Texnika parkımıza buldozerlər, ekskavatorlar, yükləyicilər, greyderlər, sıxlaşdırıcılar, teleskopik yükləyicilər və daha çoxu daxildir — bu bizə istənilən mürəkkəblikdə layihələri icra etməyə imkan verir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Etibarlı texnika – Peşəkar xidmət – Davamlı nəticələr
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
