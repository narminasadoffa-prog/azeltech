import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Fleet = () => {
  const equipment = [
    {
      category: "Teleskopik Yükləyicilər",
      items: [
        {
          name: "Genie 4017",
          manufacturer: "Genie",
          year: "2023",
          specs: [
            "Qaldırma tutumu: 3.5 t",
            "Maksimum hündürlük: 17 m",
            "Mühərrik gücü: 74 kW",
          ],
        },
      ],
    },
    {
      category: "Ekskavator-Yükləyicilər",
      items: [
        {
          name: "Volvo Ekskavator-Yükləyici",
          manufacturer: "Volvo",
          year: "2025",
          specs: [
            "İşləmə çəkisi: 3.0–3.5 t",
            "Mühərrik gücü: 74–92 kW",
            "Kova tutumu: 1.5–2.0 m³",
            "Maksimum qazma dərinliyi: 4 m",
          ],
        },
      ],
    },
    {
      category: "Buldozerlər",
      items: [
        {
          name: "Shantui SD32",
          manufacturer: "Shantui",
          year: "2018",
          specs: [
            "İşləmə çəkisi: 43 t",
            "Mühərrik gücü: 235 kW",
            "Bıçaq eni: 4.2 m",
            "Maksimum torpaq itələmə: 400 m³/saat",
          ],
        },
        {
          name: "Shantui SD22 (2 ədəd)",
          manufacturer: "Shantui",
          year: "2020",
          specs: [
            "İşləmə çəkisi: 27 t",
            "Mühərrik gücü: 165 kW",
            "Bıçaq eni: 3.9 m",
            "Maksimum torpaq itələmə: 300 m³/saat",
          ],
        },
        {
          name: "Komatsu D155",
          manufacturer: "Komatsu",
          year: "",
          specs: [
            "İşləmə çəkisi: 36 t",
            "Mühərrik gücü: 235 kW",
            "Bıçaq eni: 4.2 m",
            "Maksimum torpaq itələmə: 420 m³/saat",
          ],
        },
        {
          name: "Komatsu D355",
          manufacturer: "Komatsu",
          year: "2012",
          specs: [
            "İşləmə çəkisi: 53 t",
            "Mühərrik gücü: 320 kW",
            "Bıçaq eni: 4.8 m",
            "Maksimum torpaq itələmə: 600 m³/saat",
          ],
        },
      ],
    },
    {
      category: "Ekskavatorlar",
      items: [
        {
          name: "Hyundai 210 (təkərli)",
          manufacturer: "Hyundai",
          year: "2016",
          specs: [
            "İşləmə çəkisi: 21 t",
            "Mühərrik gücü: 110 kW",
            "İş radiusu: 9.8 m",
            "Kova tutumu: 1.0 m³",
          ],
        },
        {
          name: "Doosan DX300",
          manufacturer: "Doosan",
          year: "2016",
          specs: [
            "İşləmə çəkisi: 30 t",
            "Mühərrik gücü: 165 kW",
            "İş radiusu: 10 m",
            "Kova tutumu: 1.5 m³",
          ],
        },
        {
          name: "Doosan DX340 Crawler",
          manufacturer: "Doosan",
          year: "2012",
          specs: [
            "İşləmə çəkisi: 34 t",
            "Mühərrik gücü: 200 kW",
            "İş radiusu: 10.5 m",
            "Kova tutumu: 1.6 m³",
          ],
        },
        {
          name: "New Holland 305",
          manufacturer: "New Holland",
          year: "2022",
          specs: [
            "İşləmə çəkisi: 30 t",
            "Mühərrik gücü: 110 kW",
            "İş radiusu: 9.8 m",
            "Kova tutumu: 1.0–1.2 m³",
          ],
        },
        {
          name: "New Holland 925 Excavator-Rockson",
          manufacturer: "New Holland",
          year: "2019",
          specs: [
            "İşləmə çəkisi: 24 t",
            "Mühərrik gücü: 90 kW",
            "İş radiusu: 8.5 m",
            "Kova tutumu: 0.9–1.1 m³",
          ],
        },
      ],
    },
    {
      category: "Frontal Yükləyicilər",
      items: [
        {
          name: "SDLG 956",
          manufacturer: "SDLG",
          year: "2022",
          specs: [
            "İşləmə çəkisi: 5.6 t",
            "Mühərrik gücü: 85 kW",
            "Kova tutumu: 2.0–2.3 m³",
            "Maksimum qaldırma hündürlüyü: 3.2 m",
          ],
        },
      ],
    },
    {
      category: "Sıxlaşdırıcılar",
      items: [
        {
          name: "XCMG Sıxlaşdırıcı",
          manufacturer: "XCMG",
          year: "2018",
          specs: [
            "İşləmə çəkisi: 12–15 t",
            "Mühərrik gücü: 92 kW",
            "Barabın eni: 2.1 m",
            "Maksimum sıxlaşdırma qüvvəsi: 120 kN",
          ],
        },
        {
          name: "Liugong Sıxlaşdırıcı",
          manufacturer: "Liugong",
          year: "2023",
          specs: [
            "İşləmə çəkisi: 10–14 t",
            "Mühərrik gücü: 85 kW",
            "Barabın eni: 2.0 m",
            "Maksimum sıxlaşdırma qüvvəsi: 110 kN",
          ],
        },
        {
          name: "Dynapac Sıxlaşdırıcı",
          manufacturer: "Dynapac",
          year: "2013",
          specs: [
            "İşləmə çəkisi: 14 t",
            "Mühərrik gücü: 95 kW",
            "Barabın eni: 2.2 m",
            "Maksimum sıxlaşdırma qüvvəsi: 130 kN",
          ],
        },
      ],
    },
    {
      category: "Greyderlər",
      items: [
        {
          name: "Liugong 418",
          manufacturer: "Liugong",
          year: "2024",
          specs: [
            "İşləmə çəkisi: 16 t",
            "Mühərrik gücü: 125 kW",
            "Bıçaq eni: 4.2 m",
            "Maksimum qaldırma hündürlüyü: 0.4 m",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Texnika Parkımız</h1>
            <p className="text-xl text-primary-foreground/90">
              Müasir avadanlıq. Təcrübəli operatorlar. Etibarlı performans.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Texnika parkımız aparıcı qlobal brendlərin müasir ağır avadanlıqlarından ibarətdir. Bütün maşınlar mütəmadi olaraq yoxlanılır və ixtisaslı mütəxəssislər tərəfindən idarə olunur.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {equipment.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <Wrench className="h-8 w-8 text-secondary" />
                <h2 className="text-3xl font-bold text-foreground">{category.category}</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="overflow-hidden transition-shadow hover:shadow-lg">
                    {/* Image Placeholder */}
                    <div className="aspect-video w-full bg-muted flex items-center justify-center">
                      <Wrench className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-foreground">{item.name}</h3>
                      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{item.manufacturer}</span>
                        {item.year && (
                          <>
                            <span>•</span>
                            <span>{item.year}</span>
                          </>
                        )}
                      </div>
                      <div className="space-y-1">
                        {item.specs.map((spec, specIndex) => (
                          <p key={specIndex} className="text-sm text-muted-foreground">
                            • {spec}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
