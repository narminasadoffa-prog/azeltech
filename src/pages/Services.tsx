import { Card, CardContent } from "@/components/ui/card";
import { Truck, Mountain, Construction, Building, Map } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Ağır Texnika İcarəsi",
      items: ["Buldozerlər", "Ekskavatorlar", "Frontal yükləyicilər", "Sıxlaşdırıcılar", "Teleskopik yükləyicilər"],
      description: "Bütün avadanlıqlar tam işlək vəziyyətdə təhvil verilir və müntəzəm servis göstərilir. Qısamüddətli və uzunmüddətli icarə variantları mövcuddur.",
    },
    {
      icon: <Mountain className="h-12 w-12" />,
      title: "Torpaq İşləri və Sahə Hazırlığı",
      items: ["Qazma işləri", "Torpaq düzləşdirmə", "Altlıq hazırlığı", "Torpaq sıxlaşdırma"],
      description: "Təcrübəli operatorlar və mühəndis nəzarəti ilə peşəkar icra.",
    },
    {
      icon: <Construction className="h-12 w-12" />,
      title: "Yol Tikintisi",
      items: ["Yol yatağı hazırlığı", "Sıxlaşdırma işləri", "Asfaltdan əvvəlki işlər"],
      description: "Mülki və infrastruktur yol tikintisinin istənilən mərhələsi üçün tam texniki dəstək təqdim edirik.",
    },
    {
      icon: <Building className="h-12 w-12" />,
      title: "Tikinti və Subpodratçılıq",
      items: ["Torpaq işləri xidməti", "Texnika logistikası", "Sənaye tikintisi", "Mülki tikinti"],
      description: "Sənaye və mülki tikinti layihələrində torpaq işləri, texnika xidməti və logistika təminatı.",
    },
    {
      icon: <Map className="h-12 w-12" />,
      title: "Torpaq Planlaşdırması və Layihə Dəstəyi",
      items: ["Layihəyə uyğun torpaq planlaşdırması", "Relyef düzləşdirmə", "Texniki nəzarət"],
      description: "Peşəkar texniki nəzarət ilə layihə dizaynına uyğun torpaq planlaşdırması.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Xidmətlərimiz</h1>
            <p className="text-xl text-primary-foreground/90">
              İstənilən miqyaslı layihələr üçün kompleks ağır texnika və tikinti xidmətləri
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
