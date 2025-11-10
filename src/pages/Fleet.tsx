import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Fleet = () => {
  const machines = [
    {
      value: "genie-4017",
      title: "Teleskopik yükləyici – Genie 4017",
      headline: "İş yükü: 3.5 t",
      specs: [
        "Maksimal hündürlük: 17 m",
        "Mühərrik gücü: 74 kVt",
        "Yük qaldırma hündürlüyü: 17 m",
        "İstehsalçı: Genie",
        "İstehsal ili: 2023",
      ],
    },
    {
      value: "volvo-backhoe",
      title: "Volvo Bekolader – [Model əlavə edin]",
      headline: "İş yükü: 3.0–3.5 t",
      specs: [
        "Mühərrik gücü: 74–92 kVt",
        "Kova tutumu: 1.5–2.0 m³",
        "Maksimal qazma dərinliyi: 4 m",
        "İstehsalçı: Volvo",
        "İstehsal ili: 2025",
      ],
    },
    {
      value: "shantui-sd32",
      title: "Shantui SD32 Buldozer",
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
      value: "shantui-sd22",
      title: "Shantui SD22 Buldozer (2 ədəd)",
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
      value: "hyundai-210",
      title: "Hyundai 210 (8 təkərli) Ekskavator",
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
      value: "sdlg-956",
      title: "SDLG 956 Frontal Yükləyici",
      headline: "İş çəkisi: 5.6 t",
      specs: [
        "Mühərrik gücü: 85 kVt",
        "Kova tutumu: 2.0–2.3 m³",
        "Maksimal qaldırma hündürlüyü: 3.2 m",
        "İstehsalçı: SDLG",
        "İstehsal ili: 2022",
      ],
    },
    {
      value: "doosan-dx300",
      title: "Doosan DX300 Ekskavator",
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
      value: "doosan-dx340",
      title: "Doosan DX340 Tırtıllı Ekskavator",
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
      value: "komatsu-d155",
      title: "Komatsu D155 Buldozer",
      headline: "İş çəkisi: 36 t",
      specs: [
        "Mühərrik gücü: 235 kVt",
        "Lame eni: 4.2 m",
        "Maksimal torpaq itələmə: 420 m³/saat",
        "İstehsalçı: Komatsu",
      ],
    },
    {
      value: "komatsu-d355",
      title: "Komatsu D355 Buldozer",
      headline: "İş çəkisi: 53 t",
      specs: [
        "Mühərrik gücü: 320 kVt",
        "Lame eni: 4.8 m",
        "Maksimal torpaq itələmə: 600 m³/saat",
        "İstehsalçı: Komatsu",
        "İstehsal ili: 2012",
      ],
    },
    {
      value: "xcmg-roller",
      title: "XCMG Katok",
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
      value: "liugong-roller",
      title: "Liugong Katok",
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
      value: "dynapac-roller",
      title: "Dynapac Katok",
      headline: "İş çəkisi: 14 t",
      specs: [
        "Mühərrik gücü: 95 kVt",
        "Rulon eni: 2.2 m",
        "Maksimal sıxılma gücü: 130 kN",
        "İstehsalçı: Dynapac",
        "İstehsal ili: 2013",
      ],
    },
    {
      value: "newholland-305",
      title: "New Holland 305 Ekskavator",
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
      value: "newholland-925",
      title: "New Holland 925 Ekskavator-Rokson",
      headline: "İş çəkisi: 24 t",
      specs: [
        "Mühərrik gücü: 90 kVt",
        "Əsas qazma radiusu: 8.5 m",
        "Kova tutumu: 0.9–1.1 m³",
        "İstehsalçı: New Holland",
        "İstehsal ili: 2019",
      ],
    },
    {
      value: "liugong-418",
      title: "Liugong 418 Qreyder",
      headline: "İş çəkisi: 16 t",
      specs: [
        "Mühərrik gücü: 125 kVt",
        "Lame eni: 4.2 m",
        "Maksimal qaldırma hündürlüyü: 0.4 m",
        "İstehsalçı: Liugong",
        "İstehsal ili: 2024",
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/70">
              Etibarlı texnika, peşəkar xidmət
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">Texnika Parkımız</h1>
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
          <Tabs defaultValue={machines[0]?.value ?? "genie-4017"} className="w-full">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="flex w-full gap-2 bg-transparent p-0">
                {machines.map((machine) => (
                  <TabsTrigger
                    key={machine.value}
                    value={machine.value}
                    className="whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm font-medium transition data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {machine.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {machines.map((machine) => (
              <TabsContent key={machine.value} value={machine.value}>
                <Card>
                  <CardContent className="flex flex-col gap-8 p-8 md:flex-row md:items-start">
                    <div className="md:w-1/3">
                      <p className="text-lg font-semibold text-primary">{machine.headline}</p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-3 text-muted-foreground">
                        {machine.specs.map((spec) => (
                          <li key={spec} className="flex items-start gap-2 text-sm md:text-base">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
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
