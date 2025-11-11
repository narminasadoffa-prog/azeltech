import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  Check,
  Hammer,
  Newspaper,
  Truck,
  Users,
} from "lucide-react";
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

  const news = [
    {
      title: "Yeni Shantui SD22 buldozerləri parkımıza qatıldı",
      date: "Mart 2025",
      description:
        "Torpaq işləri üzrə yeni nəsil buldozerlərimiz daha yüksək məhsuldarlıq və dəqiqlik təmin edir.",
    },
    {
      title: "Ələt Azad İqtisadi Zonası layihəsində mühüm mərhələ",
      date: "Fevral 2025",
      description:
        "Ərazinin düzləndirilməsi və torpaq işləri üzrə icra etdiyimiz xidmətlər uğurla davam edir.",
    },
  ];

  const careers = [
    {
      position: "Buldozer operatoru",
      type: "Tam ştat",
      location: "Bakı və bölgələr",
      requirements: "Minimum 3 il təcrübə, təhlükəsizlik qaydalarına ciddi riayət",
    },
    {
      position: "Ekskavator operatoru",
      type: "Tam ştat",
      location: "Bakı və Qarabağ layihələri",
      requirements: "Texniki sertifikat, müasir ekskavatorlarla işləmə bacarığı",
    },
    {
      position: "Layihə mühəndisi",
      type: "Tam ştat",
      location: "Bakı",
      requirements: "İnşaat mühəndisliyi ixtisası, layihə idarəetmə təcrübəsi",
    },
  ];

  const partners = [
    { name: "“CONCO” QSC", detail: "Şuşa yaşayış massivi layihəsi üzrə tərəfdaş" },
    { name: "“MAQRO CONSTRUCTION” MMC", detail: "Daşkəsən qızıl mədəni layihəsi" },
    { name: "“AZ.YOL-TİKİNTİ” MMC", detail: "Yol inşaatı və günəş paneli infrastrukturu" },
    { name: "“ENERGY SERVICE GROUP” MMC", detail: "Ələt Azad İqtisadi Zonası torpaq işləri" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=2200&q=80"
            alt="Ağır texnika iş başında"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        </div>
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl text-left text-white">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Etibarlı texnika – Peşəkar xidmət – Davamlı nəticələr
              </h1>
              <p className="mb-8 text-lg text-white/85 md:text-xl">
                Azərbaycanda ağır texnika icarəsi, torpaq işləri və tikinti xidmətləri üzrə etibarlı tərəfdaşınız.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <NavLink to="/fleet">Texnika Parkımız</NavLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground"
                >
                  <NavLink to="/contact">Bizimlə Əlaqə</NavLink>
                </Button>
              </div>
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

      {/* News Section */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-primary">
              <Newspaper className="h-7 w-7" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                Xəbərlər / Yeniliklər
              </p>
            </div>
            <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
              Son Yeniliklərimiz
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {news.map((item) => (
              <Card key={item.title} className="h-full border border-border/60">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="text-sm font-semibold uppercase tracking-wide text-primary/80">
                    {item.date}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-primary">
              <BriefcaseBusiness className="h-7 w-7" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                Karyera
              </p>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Peşəkar komandamıza qoşulun
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              İxtisaslı texnika operatorları və mühəndislər üçün davamlı inkişaf, təhlükəsiz iş
              mühiti və sabit əməkhaqqı təklif edirik.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {careers.map((career) => (
              <Card key={career.position} className="h-full border border-border/60">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                    {career.type}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{career.position}</h3>
                  <p className="text-sm font-medium text-muted-foreground/80">{career.location}</p>
                  <p className="text-sm text-muted-foreground">{career.requirements}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <NavLink to="/contact">CV göndər</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Certificates & Partners */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-primary">
              <Award className="h-7 w-7" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                Sertifikatlar və tərəfdaşlar
              </p>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Sənədlərlə təsdiqlənmiş etibarlılıq
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Bizimlə əməkdaşlıq edən yerli və beynəlxalq tərəfdaşlar, eləcə də texnika parkımızın
              uyğunluğunu təsdiq edən sertifikatlar güvənli tərəfdaş imicimizi möhkəmləndirir.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {partners.map((partner) => (
              <Card key={partner.name} className="border border-border/60">
                <CardContent className="space-y-3 p-6">
                  <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>
              * Sertifikatlaşdırma sənədləri və tərəfdaş siyahısı tələb əsasında təqdim olunur.
            </p>
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
