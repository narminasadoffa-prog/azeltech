import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Fleet = () => {
  const categories = [
    {
      value: "telehandlers",
      label: "Teleskopik yükləyicilər",
      description: "Yük qaldırma işlərində yüksək çeviklik və təhlükəsizlik təmin edən avadanlıq.",
      machines: [
        {
          name: "Teleskopik yükləyici – Genie 4017",
          headline: "İş yükü: 3.5 t",
          specs: [
            "Maksimal hündürlük: 17 m",
            "Mühərrik gücü: 74 kVt",
            "Yük qaldırma hündürlüyü: 17 m",
            "İstehsalçı: Genie",
            "İstehsal ili: 2023",
          ],
        },
      ],
    },
    {
      value: "backhoe",
      label: "Bekoladerlər",
      description: "Torpaq qazma və yükləmə işlərində universal istifadə imkanı.",
      machines: [
        {
          name: "Volvo Bekolader – [Model əlavə edin]",
          headline: "İş yükü: 3.0–3.5 t",
          specs: [
            "Mühərrik gücü: 74–92 kVt",
            "Kova tutumu: 1.5–2.0 m³",
            "Maksimal qazma dərinliyi: 4 m",
            "İstehsalçı: Volvo",
            "İstehsal ili: 2025",
          ],
        },
      ],
    },
    {
      value: "bulldozers",
      label: "Buldozerlər",
      description: "Torpaq düzləndirmə və iri həcmli materialların daşınması üçün güclü texnika.",
      machines: [
        {
          name: "Shantui SD32 Buldozer",
          headline: "İş çəkisi: 43 t",
          specs: [
            "Mühərrik gücü: 235 kVt",
            "Lame eni: 4.2 m",
            "Maksimal torpaq itələmə: 400 m³/saat",
            "İstehsalçı: Shantui",
            "İstehsal ili: 2018",
          ],
        },
        {
          name: "Shantui SD22 Buldozer (2 ədəd)",
          headline: "İş çəkisi: 27 t",
          specs: [
            "Mühərrik gücü: 165 kVt",
            "Lame eni: 3.9 m",
            "Maksimal torpaq itələmə: 300 m³/saat",
            "İstehsalçı: Shantui",
            "İstehsal ili: 2020",
          ],
        },
        {
          name: "Komatsu D155 Buldozer",
          headline: "İş çəkisi: 36 t",
          specs: [
            "Mühərrik gücü: 235 kVt",
            "Lame eni: 4.2 m",
            "Maksimal torpaq itələmə: 420 m³/saat",
            "İstehsalçı: Komatsu",
          ],
        },
        {
          name: "Komatsu D355 Buldozer",
          headline: "İş çəkisi: 53 t",
          specs: [
            "Mühərrik gücü: 320 kVt",
            "Lame eni: 4.8 m",
            "Maksimal torpaq itələmə: 600 m³/saat",
            "İstehsalçı: Komatsu",
            "İstehsal ili: 2012",
          ],
        },
      ],
    },
    {
      value: "excavators",
      label: "Ekskavatorlar",
      description: "Qazıntı, yükləmə və demontaj işləri üçün yüksək məhsuldarlıqlı avadanlıq.",
      machines: [
        {
          name: "Hyundai 210 (8 təkərli) Ekskavator",
          headline: "İş çəkisi: 21 t",
          specs: [
            "Mühərrik gücü: 110 kVt",
            "Əsas qazma radiusu: 9.8 m",
            "Kova tutumu: 1.0 m³",
            "İstehsalçı: Hyundai",
            "İstehsal ili: 2016",
          ],
        },
        {
          name: "Doosan DX300 Ekskavator",
          headline: "İş çəkisi: 30 t",
          specs: [
            "Mühərrik gücü: 165 kVt",
            "Əsas qazma radiusu: 10 m",
            "Kova tutumu: 1.5 m³",
            "İstehsalçı: Doosan",
            "İstehsal ili: 2016",
          ],
        },
        {
          name: "Doosan DX340 Tırtıllı Ekskavator",
          headline: "İş çəkisi: 34 t",
          specs: [
            "Mühərrik gücü: 200 kVt",
            "Əsas qazma radiusu: 10.5 m",
            "Kova tutumu: 1.6 m³",
            "İstehsalçı: Doosan",
            "İstehsal ili: 2012",
          ],
        },
        {
          name: "New Holland 305 Ekskavator",
          headline: "İş çəkisi: 30 t",
          specs: [
            "Mühərrik gücü: 110 kVt",
            "Əsas qazma radiusu: 9.8 m",
            "Kova tutumu: 1.0–1.2 m³",
            "İstehsalçı: New Holland",
            "İstehsal ili: 2022",
          ],
        },
        {
          name: "New Holland 925 Ekskavator-Rokson",
          headline: "İş çəkisi: 24 t",
          specs: [
            "Mühərrik gücü: 90 kVt",
            "Əsas qazma radiusu: 8.5 m",
            "Kova tutumu: 0.9–1.1 m³",
            "İstehsalçı: New Holland",
            "İstehsal ili: 2019",
          ],
        },
      ],
    },
    {
      value: "loaders",
      label: "Frontal yükləyicilər",
      description: "Material yükləmə və daşımada yüksək məhsuldarlıq.",
      machines: [
        {
          name: "SDLG 956 Frontal Yükləyici",
          headline: "İş çəkisi: 5.6 t",
          specs: [
            "Mühərrik gücü: 85 kVt",
            "Kova tutumu: 2.0–2.3 m³",
            "Maksimal qaldırma hündürlüyü: 3.2 m",
            "İstehsalçı: SDLG",
            "İstehsal ili: 2022",
          ],
        },
      ],
    },
    {
      value: "rollers",
      label: "Katoklar",
      description: "Yol və sahə sıxlaşdırma işlərində stabil nəticələr.",
      machines: [
        {
          name: "XCMG Katok",
          headline: "İş çəkisi: 12–15 t",
          specs: [
            "Mühərrik gücü: 92 kVt",
            "Rulon eni: 2.1 m",
            "Maksimal sıxılma gücü: 120 kN",
            "İstehsalçı: XCMG",
            "İstehsal ili: 2018",
          ],
        },
        {
          name: "Liugong Katok",
          headline: "İş çəkisi: 10–14 t",
          specs: [
            "Mühərrik gücü: 85 kVt",
            "Rulon eni: 2.0 m",
            "Maksimal sıxılma gücü: 110 kN",
            "İstehsalçı: Liugong",
            "İstehsal ili: 2023",
          ],
        },
        {
          name: "Dynapac Katok",
          headline: "İş çəkisi: 14 t",
          specs: [
            "Mühərrik gücü: 95 kVt",
            "Rulon eni: 2.2 m",
            "Maksimal sıxılma gücü: 130 kN",
            "İstehsalçı: Dynapac",
            "İstehsal ili: 2013",
          ],
        },
      ],
    },
    {
      value: "graders",
      label: "Qreyderlər",
      description: "Yol səthinin dəqiq formalaşdırılması və bərpası üçün nəzərdə tutulmuşdur.",
      machines: [
        {
          name: "Liugong 418 Qreyder",
          headline: "İş çəkisi: 16 t",
          specs: [
            "Mühərrik gücü: 125 kVt",
            "Lame eni: 4.2 m",
            "Maksimal qaldırma hündürlüyü: 0.4 m",
            "İstehsalçı: Liugong",
            "İstehsal ili: 2024",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1531835551804-77e90951d106?auto=format&fit=crop&w=1600&q=80"
            alt="Tikinti sahəsində çalışan ağır texnika"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/70">
              Etibarlı texnika, peşəkar xidmət
            </p>
            <div
              className="group relative inline-flex flex-col items-center"
              tabIndex={0}
            >
              <h1 className="text-4xl font-bold md:text-5xl">Texnika Parkımız</h1>
              <div className="pointer-events-none absolute top-full mt-3 w-56 -translate-y-1 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="rounded-xl border border-white/20 bg-black/75 p-4 text-left shadow-xl backdrop-blur">
                  <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/60">
                    Kateqoriyalar
                  </p>
                  <ul className="space-y-2 text-sm text-white/90">
                    {categories.map((category) => (
                      <li key={category.value}>
                        <a
                          href={`#${category.value}`}
                          className="flex items-start gap-2 text-white/90 transition hover:text-primary focus:outline-none focus-visible:text-primary"
                        >
                          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                          <span>{category.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Texnika parkımız aparıcı qlobal brendlərin ağır texnikasından ibarətdir. Hər bir
              avadanlığımız müntəzəm texniki baxışdan keçir və ixtisaslı operatorların nəzarəti ilə
              işləyir. Layihələriniz üçün etibarlı, çevik və məhsuldar həllər təqdim edirik.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Tabs */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={categories[0]?.value ?? "telehandlers"} className="w-full">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="flex w-full gap-2 bg-transparent p-0">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="whitespace-nowrap rounded-full border border-border px-5 py-2 text-sm font-medium transition data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
                      </div>
            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} id={category.value}>
                <div className="mx-auto max-w-5xl space-y-6">
                  <Card>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-foreground">{category.label}</h3>
                      <p className="mt-3 text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.machines.map((machine) => (
                      <Card key={machine.name} className="h-full">
                        <CardContent className="flex h-full flex-col gap-4 p-6">
                          <div className="overflow-hidden rounded-lg border border-dashed border-muted-foreground/40 bg-muted/40">
                            <div className="flex h-40 items-center justify-center text-sm font-medium text-muted-foreground/70">
                              Şəkil üçün yer
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-foreground">{machine.name}</h4>
                            <p className="mt-2 text-sm font-medium text-primary">{machine.headline}</p>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            {machine.specs.map((spec) => (
                              <li key={spec} className="flex items-start gap-2 text-sm md:text-base">
                                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
              </TabsContent>
          ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
