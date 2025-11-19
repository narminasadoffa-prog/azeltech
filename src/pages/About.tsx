import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NavLink } from "@/components/NavLink";
import { Award, BriefcaseBusiness, Check, Upload, FileText, MapPin, Clock, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

gsap.registerPlugin(ScrollTrigger);

interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  location: string | null;
  salary: string | null;
  type: string | null;
  published: boolean;
}

const About = () => {
  const principlesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loadingVacancies, setLoadingVacancies] = useState(true);
  const [showCvForm, setShowCvForm] = useState(false);
  const [cvFormData, setCvFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchVacancies();
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    if (cards.length === 0) return;
    
    cards.forEach((card, index) => {
      gsap.set(card, {
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.to(card, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vacancies`);
      const data = await response.json();
      setVacancies(data.filter((v: Vacancy) => v.published));
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoadingVacancies(false);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCvFormData({
      ...cvFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('CV faylı 10MB-dan böyük ola bilməz');
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Yalnız PDF və Word sənədləri yüklənə bilər');
        return;
      }
      setCvFile(file);
    }
  };

  const handleCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      toast.error('CV faylı seçilməlidir');
      return;
    }

    if (!cvFormData.name || !cvFormData.email) {
      toast.error('Ad və Email tələb olunur');
      return;
    }

    setUploadingCV(true);
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);
      formData.append('name', cvFormData.name);
      formData.append('email', cvFormData.email);
      if (cvFormData.phone) formData.append('phone', cvFormData.phone);
      if (cvFormData.position) formData.append('position', cvFormData.position);
      if (cvFormData.message) formData.append('message', cvFormData.message);

      const response = await fetch(`${API_URL}/api/cv-upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('CV uğurla göndərildi!');
        setCvFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          message: "",
        });
        setCvFile(null);
        setShowCvForm(false);
        const fileInput = document.getElementById('about-cv-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        toast.error(data.error || 'CV göndərilmədi');
      }
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast.error('CV göndərilmədi');
    } finally {
      setUploadingCV(false);
    }
  };

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

  const getTypeLabel = (type: string | null) => {
    switch (type) {
      case 'full-time':
        return 'Tam ştat';
      case 'part-time':
        return 'Yarım ştat';
      case 'contract':
        return 'Müqavilə';
      default:
        return 'Tam ştat';
    }
  };

  const partners = [
    { name: "“CONCO” QSC", detail: "Şuşa yaşayış massivi layihəsi üzrə tərəfdaş" },
    { name: "“MAQRO CONSTRUCTION” MMC", detail: "Daşkəsən qızıl mədəni layihəsi" },
    { name: "“AZ.YOL-TİKİNTİ” MMC", detail: "Yol inşaatı və günəş paneli infrastrukturu" },
    { name: "“ENERGY SERVICE GROUP” MMC", detail: "Ələt Azad İqtisadi Zonası torpaq işləri" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/layih%C9%99l%C9%99rimiz%20AZEL%20/thisisengineering-xYCBw1uIP_M-unsplash.jpg"
            alt="Ağır texnika"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        </div>
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-white/80">
                Şəffaflıq · Dəqiqlik · Etibarlılıq
              </p>
              <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                Azərbaycanın ağır texnika sahəsində peşəkar tərəfdaşınız
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Company Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
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

      {/* Career Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/layih%C9%99l%C9%99rimiz%20AZEL%20/thisisengineering-SyRlD4s_amw-unsplash.jpg"
            alt="Karyera"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white backdrop-blur-sm">
                <BriefcaseBusiness className="h-4 w-4" />
                Karyera
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Peşəkar komandamıza qoşulun
              </h2>
              <p className="text-lg text-white/90">
                İxtisaslı texnika operatorları və mühəndislər üçün davamlı inkişaf, təhlükəsiz iş
                mühiti və sabit əməkhaqqı təklif edirik. Azərbaycan üzrə iri həcmli infrastruktur
                layihələrində iştirak etmək istəyirsinizsə, sizin üçün yerimiz var.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5 shadow-md backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                    Niyə biz?
                  </p>
                  <p className="mt-2 text-sm text-white/90">
                    Müasir texnika parkı, təhlükəsizlik standartları və uzunmüddətli layihələr.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 shadow-md backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                    İnkişaf
                  </p>
                  <p className="mt-2 text-sm text-white/90">
                    Sertifikat proqramları, peşəkar təlimlər və yüksəliş imkanları ilə dəstək.
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-4 w-fit"
                onClick={() => setShowCvForm(!showCvForm)}
              >
                CV göndər
              </Button>
            </div>
            <div className="space-y-6">
              {loadingVacancies ? (
                <div className="text-center py-8 text-white">Yüklənir...</div>
              ) : vacancies.length === 0 ? (
                <div className="text-center py-8 text-white/80">
                  Hazırda aktiv vakansiya yoxdur
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {vacancies.map((vacancy) => (
                    <Card
                      key={vacancy.id}
                      className="cursor-pointer border border-white/20 bg-white/10 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:bg-white/15"
                      onClick={() => {
                        setSelectedVacancy(vacancy);
                        setIsDialogOpen(true);
                      }}
                    >
                      <CardContent className="space-y-3 p-6">
                        <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white backdrop-blur-sm">
                          {getTypeLabel(vacancy.type)}
                        </span>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-white">{vacancy.title}</h3>
                          {vacancy.location && (
                            <p className="text-sm font-medium text-white/80 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {vacancy.location}
                            </p>
                          )}
                          {vacancy.salary && (
                            <p className="text-sm font-medium text-white/80 flex items-center gap-1">
                              <span className="text-base">₼</span>
                              Əməkhaqqı: {vacancy.salary}
                            </p>
                          )}
                          <p className="text-sm text-white/90 line-clamp-2">{vacancy.description}</p>
                          {vacancy.requirements && (
                            <p className="text-xs text-white/80 line-clamp-2">{vacancy.requirements}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* CV Form */}
              {showCvForm && (
                <Card className="border border-white/20 bg-white/95 shadow-lg backdrop-blur">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">CV Göndərin</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCvForm(false)}
                      >
                        ✕
                      </Button>
                    </div>
                    <form onSubmit={handleCvSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-foreground">
                            Ad və Soyad *
                          </label>
                          <Input
                            name="name"
                            value={cvFormData.name}
                            onChange={handleCvChange}
                            required
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-foreground">
                            Email *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={cvFormData.email}
                            onChange={handleCvChange}
                            required
                            className="bg-white"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-foreground">
                            Telefon
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            value={cvFormData.phone}
                            onChange={handleCvChange}
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-foreground">
                            Müraciət etdiyiniz vəzifə
                          </label>
                          <Input
                            name="position"
                            value={cvFormData.position}
                            onChange={handleCvChange}
                            className="bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                          Əlavə məlumat
                        </label>
                        <Textarea
                          name="message"
                          value={cvFormData.message}
                          onChange={handleCvChange}
                          rows={3}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                          CV Faylı * (PDF və ya Word, maksimum 10MB)
                        </label>
                        <Input
                          id="about-cv-file"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCvFileChange}
                          required
                          className="bg-white"
                        />
                        {cvFile && (
                          <p className="mt-1 text-xs text-muted-foreground">{cvFile.name}</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={uploadingCV}
                        className="w-full"
                      >
                        {uploadingCV ? (
                          <>Yüklənir...</>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            CV Göndər
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vacancy Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedVacancy?.title}</DialogTitle>
            <DialogDescription>
              Vakansiya haqqında ətraflı məlumat
            </DialogDescription>
          </DialogHeader>
          {selectedVacancy && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {selectedVacancy.type && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Clock className="h-4 w-4" />
                    {getTypeLabel(selectedVacancy.type)}
                  </span>
                )}
                {selectedVacancy.location && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <MapPin className="h-4 w-4" />
                    {selectedVacancy.location}
                  </span>
                )}
                {selectedVacancy.salary && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <span className="text-base">₼</span>
                    Əməkhaqqı: {selectedVacancy.salary}
                  </span>
                )}
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="h-5 w-5" />
                  Təsvir
                </h3>
                <p className="text-muted-foreground whitespace-pre-line">{selectedVacancy.description}</p>
              </div>

              {selectedVacancy.requirements && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                    <Check className="h-5 w-5" />
                    Tələblər
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">{selectedVacancy.requirements}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setShowCvForm(true);
                    setCvFormData(prev => ({
                      ...prev,
                      position: selectedVacancy.title,
                    }));
                  }}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  CV Göndər
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Bağla
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Certificates & Partners */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              <Award className="h-4 w-4" />
              Sertifikatlar və tərəfdaşlar
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              Sənədlərlə təsdiqlənmiş etibarlılıq
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Bizimlə əməkdaşlıq edən yerli və beynəlxalq tərəfdaşlar, eləcə də texnika parkımızın
              uyğunluğunu təsdiq edən sənədlər güvənli tərəfdaş imicimizi möhkəmləndirir.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {partners.map((partner, index) => (
              <Card
                key={partner.name}
                className="relative overflow-hidden border border-border/60 bg-[hsl(233_88%_32%_/_6%)] shadow-md"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                <CardContent className="space-y-3 p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    Tərəfdaş #{String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-[hsl(233_88%_32%)] px-6 py-8 text-center text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
              Şəffaflıq siyasəti
            </p>
            <p className="mt-3 text-sm text-white/80">
              Sertifikatlaşdırma sənədləri və tərəfdaş siyahısı tələb əsasında təqdim olunur. Bizimlə
              əlaqə saxlayaraq əməkdaşlıq imkanlarını müzakirə edin.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section ref={principlesRef} className="bg-muted py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
              Biz fəaliyyətimizi bu prinsiplər üzərində qurmuşuq
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {principles.map((principle, index) => (
                <Card
                  key={principle.title}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="h-full"
                >
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

      <Footer />
    </div>
  );
};

export default About;
