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
      title: "Ağır Texnika İcarəsi",
      description: "Buldozerlər, ekskavatorlar, yükləyicilər və digər müasir texnika parkı",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Torpaq İşləri və Sahə Hazırlığı",
      description: "Peşəkar qazma, düzləşdirmə və torpaq sıxlaşdırma işləri",
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Yol Tikintisi",
      description: "Tam yol yatağı hazırlığı və asfaltdan əvvəlki işlər",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Subpodratçı Xidmətləri",
      description: "Tikinti layihələri üçün tam texniki dəstək",
    },
  ];

  const values = [
    { title: "Etibarlılıq", description: "Uzunmüddətli əməkdaşlıq və məsuliyyətli icra" },
    { title: "Keyfiyyət", description: "Yüksək standartlı performans və texniki dəqiqlik" },
    { title: "Peşəkar Komanda", description: "Bacarıqlı mühəndislər, sertifikatlı operatorlar" },
    { title: "Şəffaflıq", description: "Aydın şərtlər, ədalətli qiymətlər, qarşılıqlı etibar" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Etibarlı texnika – Peşəkar xidmət – Davamlı nəticələr
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Azərbaycanda ağır texnika icarəsi, torpaq işləri və tikinti xidmətləri üzrə etibarlı tərəfdaşınız.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <NavLink to="/fleet">Texnika Parkımız</NavLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <NavLink to="/contact">Bizimlə Əlaqə</NavLink>
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
              Biz Kimik
            </h2>
            <div className="mb-8 text-center text-lg text-muted-foreground">
              <p className="mb-4">
                "Azel Texnika" MMC 2021-ci ildən etibarən Azərbaycanda fəaliyyət göstərən sürətlə inkişaf edən ağır texnika xidməti şirkətidir.
              </p>
              <p>
                Biz istənilən miqyaslı layihələr üçün texnika icarəsi, torpaq işləri, yol tikintisi, infrastruktur dəstəyi və subpodratçı xidmətləri təqdim edirik.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Peşəkar operatorlar və mühəndislər</h3>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Müasir texnika parkı</h3>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Vaxtında və təhlükəsiz layihə icrası</h3>
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
            Niyə Bizi Seçməlisiniz
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
            Təqdim Etdiyimiz Xidmətlər
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Layihənizə Başlamağa Hazırsınız?</h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Bu gün qiymət təklifi alın və ya texnika icarəyə götürün
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary">
              <NavLink to="/contact">Qiymət Təklifi</NavLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <NavLink to="/fleet">Texnika İcarəsi</NavLink>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
