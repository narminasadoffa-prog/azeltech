import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string | null;
  published: boolean;
}

interface Equipment {
  id: string;
  category: string;
  name: string;
  description: string | null;
  image: string | null;
  published: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  date: string;
  published: boolean;
}

interface Project {
  id: string;
  no: string;
  name: string;
  contractor: string;
  period: string;
  image: string | null;
  published: boolean;
}

const Index = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingEquipment, setLoadingEquipment] = useState(true);
  const [loadingBlogPosts, setLoadingBlogPosts] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchEquipment();
    fetchBlogPosts();
    fetchProjects();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      const data = await response.json();
      setServices(data.filter((service: Service) => service.published));
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchEquipment = async () => {
    try {
      const response = await fetch(`${API_URL}/api/equipment`);
      const data = await response.json();
      setEquipment(data.filter((eq: Equipment) => eq.published));
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoadingEquipment(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog-posts`);
      const data = await response.json();
      setBlogPosts(data.filter((post: BlogPost) => post.published));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoadingBlogPosts(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const data = await response.json();
      setProjects(data.filter((project: Project) => project.published));
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Group equipment by category
  const groupedEquipment = equipment.reduce((acc, item) => {
    const category = item.category || 'Digər';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, Equipment[]>);

  // Category descriptions
  const categoryDescriptions: Record<string, string> = {
    'Buldozerlər': 'Torpaq düzləndirmə və iri həcmli materialların daşınması üçün güclü texnika.',
    'Ekskavatorlar': 'Qazıntı, yükləmə və demontaj işləri üçün yüksək məhsuldarlıqlı avadanlıq.',
    'Qreyderlər': 'Yol və ərazi düzləndirmə işlərində dəqiqlik və keyfiyyət.',
    'Katoklar': 'Torpaq sıxlaşdırma və yol hazırlığı işlərində istifadə olunur.',
    'Teleskopik yükləyicilər': 'Yük qaldırma işlərində yüksək çeviklik və təhlükəsizlik təmin edən avadanlıq.',
    'Bekoladerlər': 'Torpaq qazma və yükləmə işlərində universal istifadə imkanı.',
    'Yükləyicilər': 'Yükləmə və daşınma işlərində yüksək performanslı avadanlıq.',
    'Digər': 'Digər kateqoriyalardakı texnikalarımız.',
  };

  // Xidmət şəkillərini (JSON array və ya tək string) array şəklində oxu
  const parseServiceImages = (image: string | null): string[] => {
    if (!image) return [];
    try {
      const parsed = JSON.parse(image);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [image];
    } catch {
      return [image];
    }
  };

  const values = [
    { title: "Etibarlılıq", description: "Uzunmüddətli əməkdaşlıq və məsuliyyətli icra" },
    { title: "Keyfiyyət", description: "Yüksək standartlı performans və texniki dəqiqlik" },
    { title: "Peşəkar Komanda", description: "Bacarıqlı mühəndislər, sertifikatlı operatorlar" },
    { title: "Şəffaflıq", description: "Aydın şərtlər, ədalətli qiymətlər, qarşılıqlı etibar" },
  ];

  const aboutImages = [
    {
      src: "https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/heavy-excavator-digging-day-light%20%281%29.jpg",
      alt: "Günəşli gündə qazıntı işləri aparan ağır ekskavator",
    },
    {
      src: "https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/thomas-chan-dC40FUTCTA0-unsplash.jpg",
      alt: "Tikinti sahəsində texnika",
    },
    {
      src: "https://iytgdt68iww627sj.public.blob.vercel-storage.com/slider/gerold-hinzen-WoZs8gGyQBY-unsplash%20%281%29-GRyZ09K7DovZ0FSjzURe3UWP4q6kxU.jpg",
      alt: "Tikinti və torpaq işləri",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[100vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${API_URL}/uploads/1763472916792-736352089.webp`}
            alt="Azel Texnika hero cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        </div>
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-20" style={{ maxWidth: '1200px' }}>
            <div className="max-w-2xl text-left text-white">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                <span className="inline-block text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Etibarlı texnika
                </span>{" "}
                <span className="inline-block text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Peşəkar xidmət
                </span>{" "}
                <span className="inline-block text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Dayanıqlı nəticələr
                </span>
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
                  className="border-2 border-white/90 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-primary transition-all"
                >
                  <NavLink to="/contact">Bizimlə Əlaqə</NavLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative overflow-hidden bg-[hsl(210_60%_96%)] py-16">
        <div className="pointer-events-none absolute inset-y-0 right-[-15%] hidden aspect-square rounded-full bg-primary/15 blur-3xl sm:block" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center" style={{ maxWidth: '1200px' }}>
            <div className="relative">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {aboutImages.map((image, index) => (
                    <CarouselItem key={image.src + index}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 border-none bg-black/60 text-white hover:bg-black/80" />
                <CarouselNext className="right-4 top-1/2 -translate-y-1/2 border-none bg-black/60 text-white hover:bg-black/80" />
              </Carousel>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">Biz Kimik</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  "Azel Texnika" MMC 2021-ci ildən Azərbaycanda ağır texnika icarəsi, torpaq işləri,
                  yol tikintisi və infrastruktur dəstəyi üzrə təhlükəsiz və peşəkar xidmət göstərir.
                </p>
                <p className="text-lg text-muted-foreground">
                  Müasir texnika parkımız və yüksək ixtisaslı operator heyətimiz istənilən miqyaslı
                  layihələrdə etibarlı tərəfdaş kimi çıxış etməyimizə şərait yaradır.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                    <h3 className="text-base font-semibold text-card-foreground">
                      Peşəkar operatorlar
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Təhlükəsizlik standartlarına uyğunlaşdırılmış komanda.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                    <h3 className="text-base font-semibold text-card-foreground">
                      Müasir texnika parkı
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Geniş seçim və yüksək məhsuldarlıq təminatı.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-md sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                    <h3 className="text-base font-semibold text-card-foreground">
                      Vaxtında və təhlükəsiz icra
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Layihələrdə operativ planlama və sistemli nəzarət.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative overflow-hidden bg-[hsl(210_60%_96%)] py-16">
        <div className="pointer-events-none absolute inset-y-0 left-[-15%] hidden aspect-square rounded-full bg-primary/15 blur-3xl sm:block" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 text-center" style={{ maxWidth: '1200px' }}>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Xidmətlərimiz
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Peşəkar komanda və müasir texnika ilə geniş xidmət spektrinə malikik
            </p>
          </div>
          <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4" style={{ maxWidth: '1200px' }}>
            {loadingServices ? (
              <div className="col-span-4 text-center py-12">Yüklənir...</div>
            ) : services.length === 0 ? (
              <div className="col-span-4 text-center py-12 text-muted-foreground">Hələ xidmət yoxdur</div>
            ) : (
              services.slice(0, 4).map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border border-border/60 bg-white transition-all hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {(() => {
                      const images = parseServiceImages(service.image);

                      if (images.length === 0) {
                        return (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                            Şəkil yoxdur
                          </div>
                        );
                      }

                      // Tək şəkil
                      if (images.length === 1) {
                        const img = images[0];
                        const src = img.startsWith('http')
                          ? img
                          : (img.startsWith('/uploads') ? `${API_URL}${img}` : `${API_URL}/uploads/${img}`);

                        return (
                          <>
                            <img
                              src={src}
                              alt={service.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                console.error('Image load error:', img);
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                                {service.title}
                              </h3>
                            </div>
                          </>
                        );
                      }

                      // Bir neçə şəkil - slider
                      return (
                        <Carousel className="h-full w-full" opts={{ loop: true }}>
                          <CarouselContent className="h-full">
                            {images.map((img, index) => {
                              const src = img.startsWith('http')
                                ? img
                                : (img.startsWith('/uploads') ? `${API_URL}${img}` : `${API_URL}/uploads/${img}`);

                              return (
                                <CarouselItem key={index} className="h-full">
                                  <div className="relative h-full w-full">
                                    <img
                                      src={src}
                                      alt={`${service.title} - ${index + 1}`}
                                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                      onError={(e) => {
                                        console.error('Image load error:', img);
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    {index === 0 && (
                                      <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                                          {service.title}
                                        </h3>
                                      </div>
                                    )}
                                  </div>
                                </CarouselItem>
                              );
                            })}
                          </CarouselContent>
                          <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 text-white border-white/30 bg-black/40 hover:bg-black/70 hover:border-white/60" />
                          <CarouselNext className="right-3 top-1/2 -translate-y-1/2 text-white border-white/30 bg-black/40 hover:bg-black/70 hover:border-white/60" />
                        </Carousel>
                      );
                    })()}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <NavLink to="/services">Ətraflı bax</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Fleet Section */}
      <section className="relative overflow-hidden bg-[hsl(210_60%_96%)] py-16">
        <div className="container relative mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Müasir Texnika Parkımız
              </h2>
            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Şirkətimizin balansında müxtəlif markalı buldozerlər, ekskavatorlar, qreyderlər,
                  teleskopik yükləyicilər, katoklar və digər texnikalar mövcuddur. Yüksək ixtisaslı
                  mütəxəssislər və müasir texnika parkı sayəsində biz istənilən mürəkkəblikdə
                  layihələrin icrasını təmin edirik.
                </p>
                <p>
                  Müasir texnika parkımız, təcrübəli mühəndis heyətimiz və yüksək icra intizamımız
                  sayəsində keyfiyyətli, operativ və etibarlı xidmət təqdim edirik.
                </p>
              </div>
            </div>

          {loadingEquipment ? (
            <div className="text-center py-12">Yüklənir...</div>
          ) : equipment.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Hələ texnika yoxdur</div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {(() => {
                  const categories = Object.keys(groupedEquipment).sort();
                  const lastCategories = ['Bekoladerlər', 'Teleskopik yükləyicilər'];
                  const sortedCategories = [
                    ...categories.filter(cat => !lastCategories.includes(cat)),
                    ...lastCategories.filter(cat => categories.includes(cat))
                  ];
                  return sortedCategories;
                })().map((category) => {
                  const categoryItems = groupedEquipment[category];
                  const categoryDescription = categoryDescriptions[category] || `${category} kateqoriyasındakı texnikalarımız.`;
                  const firstItem = categoryItems[0];
                  const categoryImage = firstItem?.image;
                  
                  return (
                    <Card key={category} className="group overflow-hidden border border-border/60 transition-all hover:border-primary/40 hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                        {categoryImage ? (
                  <img
                            src={categoryImage.startsWith('http') ? categoryImage : (categoryImage.startsWith('/uploads') ? `${API_URL}${categoryImage}` : `${API_URL}/uploads/${categoryImage}`)}
                            alt={category}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              console.error('Image load error:', categoryImage);
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                  />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Şəkil yoxdur</span>
                          </div>
                        )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{category}</h3>
                          <p className="mt-1 text-sm text-white/90">{categoryItems.length} ədəd</p>
                  </div>
                </div>
                <CardContent className="p-6">
                        <p className="mb-4 text-sm text-muted-foreground">{categoryDescription}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                      Mövcud modellər:
                    </p>
                    <ul className="space-y-1.5">
                            {categoryItems.slice(0, 3).map((item, idx) => (
                              <li key={item.id} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                <span>{item.name}</span>
                        </li>
                      ))}
                            {categoryItems.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                                +{categoryItems.length - 3} ədəd daha
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <NavLink to="/fleet">Ətraflı bax</NavLink>
                </Button>
          </div>
            </>
          )}
        </div>
      </section>

      {/* Blog News Section */}
      <section className="relative overflow-hidden bg-[hsl(210_60%_96%)] py-16">
        <div className="container relative mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Blog · Yeniliklər
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Texnika parkımızdan və komandamızdan ən aktual xəbərlər
            </p>
          </div>

          {loadingBlogPosts ? (
            <div className="text-center py-12">Yüklənir...</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Hələ blog yazısı yoxdur</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <Card key={post.id} className="group overflow-hidden border border-border/60 transition-all hover:border-primary/40 hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: 'aliceblue' }}>
                    {post.image ? (
                      <img
                        src={post.image.startsWith('http') ? post.image : (post.image.startsWith('/uploads') ? `${API_URL}${post.image}` : `${API_URL}/uploads/${post.image}`)}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-90"
                        onError={(e) => {
                          console.error('Image load error:', post.image);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                        Şəkil yoxdur
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center rounded-full border border-white/40 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary backdrop-blur-sm">
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-foreground line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : '')}
                    </p>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
          
          {blogPosts.length > 3 && (
            <div className="mt-8 text-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <NavLink to="/blog">Bütün yazıları gör</NavLink>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section 
        className="relative overflow-hidden py-16"
        style={{
          background: `linear-gradient(135deg, aliceblue 0%, rgba(240, 248, 255, 0.8) 50%, aliceblue 100%),
                        linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 0, 0 0',
        }}
      >
        <div className="container relative mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Layihələrimiz
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Şirkətimizin iştirak etdiyi əsas layihələr
            </p>
          </div>

          {loadingProjects ? (
            <div className="text-center py-12">Yüklənir...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Hələ layihə yoxdur</div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 6).map((project) => (
                  <Card key={project.id} className="group overflow-hidden border border-border/60 transition-all hover:border-primary/40 hover:shadow-lg">
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                          Layihə #{project.no}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground line-clamp-2">{project.name}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium">Müqaviləçi:</span> {project.contractor}</p>
                        <p><span className="font-medium">Dövr:</span> {project.period}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <NavLink to="/projects">Ətraflı bax</NavLink>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            Niyə Bizi Seçməlisiniz
          </h2>
          <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4" style={{ maxWidth: '1200px' }}>
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

      <Footer />
    </div>
  );
};

export default Index;
