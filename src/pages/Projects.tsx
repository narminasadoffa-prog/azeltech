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

  const projects = [
    {
      no: "1",
      name: "Daşkəsən qızıl mədəni layihəsi",
      contractor: "“MAQRO CONSTRUCTION” MMC",
      period: "2022–2023",
    },
    {
      no: "2",
      name: "Şuşa şəhərində yeni yaşayış massivinin tikintisi",
      contractor: "“CONCO” QSC",
      period: "2023–2024",
    },
    {
      no: "3",
      name: "Daşkəsən–Kəlbəcər hərbi yolunun tikintisi",
      contractor: "“NORT VEST KONSTRAKŞN” MMC",
      period: "2023",
    },
    {
      no: "4",
      name: "Böyükşor–Pirşağı avtomobil yolunun tikintisi",
      contractor: "“AZ.YOL-TİKİNTİ” MMC",
      period: "2024",
    },
    {
      no: "5",
      name: "Masazır duz gölünün ətrafının təmizlənməsi",
      contractor: "“AZƏRBAYCAN DUZ İSTEHSALAT BİRLİYİ” QSC",
      period: "2024",
    },
    {
      no: "6",
      name: "Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi",
      contractor: "“Özgün Yapı Sanayi ve Ticaret A.Ş.” (Azərbaycan filialı)",
      period: "2024",
    },
    {
      no: "7",
      name: "Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi",
      contractor: "“AZ-MAŞ” QSC",
      period: "2024",
    },
    {
      no: "8",
      name: "Ağdam 3-cü yaşayış massivinin inşası",
      contractor: "“AZƏRAQRARTİKİNTİ” ASC",
      period: "2025",
    },
    {
      no: "9",
      name: "Biləsuvar rayonunda günəş panellərinin quraşdırılması sahəsində ərazinin hazırlanması",
      contractor: "“AZ.YOL-TİKİNTİ” MMC",
      period: "2025 – davam edir",
    },
    {
      no: "10",
      name: "Neftçala rayonunda günəş panellərinin quraşdırılması sahəsində ərazinin hazırlanması",
      contractor: "“AZ.YOL-TİKİNTİ” MMC",
      period: "2025 – davam edir",
    },
    {
      no: "11",
      name: "Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi",
      contractor: "“ENERGY SERVICE GROUP” MMC",
      period: "2025 – davam edir",
    },
    {
      no: "12",
      name: "Seebreeze ərazisində torpaq işləri",
      contractor: "“PARLAQ İNŞAAT” MMC",
      period: "2025 – davam edir",
    },
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

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="mb-4 text-3xl font-bold text-foreground">Layihələr</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  “Azel Texnika” MMC 2021-ci ildən etibarən ölkə üzrə müxtəlif miqyaslı tikinti, infrastruktur və ərazi hazırlığı layihələrində subpodratçı kimi uğurla fəaliyyət göstərir. Aşağıda şirkətimizin iştirak etdiyi əsas layihələrin bir hissəsi təqdim olunur:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm md:text-base">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border px-4 py-3 font-semibold text-foreground">
                          №
                        </th>
                        <th className="border border-border px-4 py-3 font-semibold text-foreground">
                          Layihə
                        </th>
                        <th className="border border-border px-4 py-3 font-semibold text-foreground">
                          Podratçı şirkət
                        </th>
                        <th className="border border-border px-4 py-3 font-semibold text-foreground">
                          Dövr
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.no} className="odd:bg-background even:bg-muted/40">
                          <td className="border border-border px-4 py-3 text-foreground">
                            {project.no}
                          </td>
                          <td className="border border-border px-4 py-3 text-foreground">
                            {project.name}
                          </td>
                          <td className="border border-border px-4 py-3 text-foreground">
                            {project.contractor}
                          </td>
                          <td className="border border-border px-4 py-3 text-foreground">
                            {project.period}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-lg text-muted-foreground">
                    “Azel Texnika” MMC yuxarıda göstərilən layihələrdə torpaq qazma, ərazi düzləndirmə, yol əsasının hazırlanması və digər texniki xidmətlərin icrasını həyata keçirmişdir. Bizim məqsədimiz — hər bir layihədə vaxtında, təhlükəsiz və yüksək keyfiyyətlə icranı təmin etməkdir. Davam edən və tamamlanmış işlərimiz şirkətimizin peşəkarlığını, texniki potensialını və etibarlı tərəfdaş imicini əks etdirir.
                  </p>
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
