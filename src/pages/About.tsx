import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const principles = [
    {
      title: "Etibarlılıq",
      description: "Müştərilərlə uzunmüddətli əməkdaşlıq və məsuliyyətli yanaşma.",
    },
    {
      title: "Keyfiyyət",
      description: "Yüksək standartlara uyğun icra və texniki dəqiqlik.",
    },
    {
      title: "Peşəkarlıq",
      description: "Təcrübəli mühəndislər və operator heyəti.",
    },
    {
      title: "Şəffaflıq",
      description: "Açıq şərtlərlə əməkdaşlıq və qarşılıqlı etimad.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-primary-foreground/80">
              Şəffaflıq · Dəqiqlik · Etibarlılıq
            </p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              Azərbaycanın ağır texnika sahəsində peşəkar tərəfdaşınız
            </h1>
          </div>
        </div>
      </section>

      {/* Company Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              “Azel Texnika” MMC 2021-ci ildən etibarən Azərbaycanda ağır texnika icarəsi, torpaq
              işləri, yol inşaatı və tikinti layihələrində texnika dəstəyi göstərən dinamik inkişaf
              edən şirkətdir. Şirkətimizin missiyası – Azərbaycanın iqtisadi inkişafına töhfə verən
              layihələrin icrasında müasir texnika və peşəkar kadr potensialı ilə iştirak etməkdir.
            </p>
            <p>
              Şirkətimizin balansında müxtəlif markalı buldozerlər, ekskavatorlar, qreyderlər,
              teleskopik yükləyicilər, katoklar və digər texnikalar mövcuddur. Yüksək ixtisaslı
              mütəxəssislər və müasir texnika parkı sayəsində biz istənilən mürəkkəblikdə layihələrin
              icrasını təmin edirik.
            </p>
            <p>
              Müasir texnika parkımız, təcrübəli mühəndis heyətimiz və yüksək icra intizamımız
              sayəsində keyfiyyətli, operativ və etibarlı xidmət təqdim edirik. Bizim məqsədimiz –
              müştərilərimizə keyfiyyətli xidmət, vaxtında icra və maksimum effektivlik təmin etməkdir.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
              Biz fəaliyyətimizi bu prinsiplər üzərində qurmuşuq
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {principles.map((principle) => (
                <Card key={principle.title} className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Check className="h-6 w-6 text-success" />
                      <h3 className="text-xl font-semibold text-foreground">{principle.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Etibarlı texnika – Peşəkar xidmət – Dayanıqlı nəticə</h2>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
