import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Equipment {
  id: string;
  category: string;
  name: string;
  description: string | null;
  image: string | null;
  count: string | null;
  published: boolean;
}

const Fleet = () => {
  const location = useLocation();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    if (location.hash && equipment.length > 0) {
      const hash = location.hash.replace('#', '').toLowerCase();
      // Set active tab based on hash
      setActiveTab(hash);
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    } else if (!location.hash && equipment.length > 0) {
      setActiveTab("all");
    }
  }, [location.hash, equipment]);

  const fetchEquipment = async () => {
    try {
      const response = await fetch(`${API_URL}/api/equipment`);
      const data = await response.json();
      setEquipment(data.filter((eq: Equipment) => eq.published));
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
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

  // Get unique categories
  const categoriesList = Object.keys(groupedEquipment).sort();

  // Create categories for tabs
  const categories = [
    {
      value: "all",
      label: "Hamısı",
      description: "Bütün texnika parkımızın ümumi mənzərəsi ilə tanış olun.",
      equipment: equipment,
    },
    ...categoriesList.map((categoryName) => {
      // Map category names to hash values
      const categoryToHash: Record<string, string> = {
        'Teleskopik yükləyicilər': 'telehandlers',
        'Bekoladerlər': 'backhoe',
        'Buldozerlər': 'bulldozers',
        'Ekskavatorlar': 'excavators',
        'Frontal yükləyicilər': 'loaders',
        'Katoklar': 'rollers',
        'Qreyderlər': 'graders',
      };
      
      const hashValue = categoryToHash[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
      
      return {
        value: hashValue,
        label: categoryName,
        description: `${categoryName} kateqoriyasındakı texnikalarımız.`,
        equipment: groupedEquipment[categoryName],
      };
    }),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden text-white">
        <div className="absolute inset-0">
          <div className="grid h-full grid-cols-3">
            <div className="relative overflow-hidden">
              <img
                src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/boom-bucket-DIsLoeMXCuQ-unsplash.jpg"
                alt="Texnika 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <img
                src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/kyle-mcdonald-t2fB0e5msmQ-unsplash.jpg"
                alt="Texnika 2"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <img
                src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/thomas-chan-dC40FUTCTA0-unsplash.jpg"
                alt="Texnika 3"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/70">
              Etibarlı texnika, peşəkar xidmət
            </p>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Texnika Parkımız</h1>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 mb-6 border border-primary/20">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Texnika Parkımız
              </span>
            </div>
            <p className="text-xl leading-relaxed text-foreground">
              Texnika parkımız aparıcı qlobal brendlərin ağır texnikasından ibarətdir. Hər bir
              avadanlığımız müntəzəm texniki baxışdan keçir və ixtisaslı operatorların nəzarəti ilə
              işləyir. Layihələriniz üçün etibarlı, çevik və məhsuldar həllər təqdim edirik.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Tabs */}
      <section className="relative overflow-hidden py-16" style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, hsl(var(--primary) / 0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          {loading ? (
            <div className="text-center py-12">Yüklənir...</div>
          ) : equipment.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Hələ texnika yoxdur</div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="flex w-full gap-2 bg-transparent p-0">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                      className="whitespace-nowrap rounded-full border border-border px-5 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:border-primary/50"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} id={category.value} className="scroll-mt-20">
                  <div className="space-y-8">
                    <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/10 shadow-lg transition-all duration-300">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                      <CardContent className="relative p-8 text-center">
                        <h3 className="text-3xl font-bold mb-4 text-primary">
                          {category.label}
                        </h3>
                        <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                          {category.description}
                        </p>
                    </CardContent>
                  </Card>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {category.equipment.map((item) => (
                        <Card key={item.id} className="group h-full overflow-hidden border-2 border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl flex flex-col">
                          <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted flex-shrink-0">
                            {item.image ? (
                              <>
                                <img
                                  src={item.image.startsWith('http') ? item.image : (item.image.startsWith('/uploads') ? `${API_URL}${item.image}` : `${API_URL}/uploads/${item.image}`)}
                                  alt={item.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  onError={(e) => {
                                    console.error('Image load error:', item.image);
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              </>
                            ) : null}
                            <div className={`absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground/70 ${item.image ? 'hidden' : ''}`}>
                              Şəkil yoxdur
                                </div>
                              </div>
                          <CardContent className="flex flex-col gap-4 p-6 flex-grow">
                            <div className="space-y-3">
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary border border-primary/20">
                                {item.category}
                                  </span>
                              <h4 className="text-xl font-bold text-foreground leading-tight">{item.name}</h4>
                              {item.count && (
                                <p className="text-sm font-semibold text-primary flex items-center gap-2">
                                  <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                                  Sayı: {item.count}
                                </p>
                              )}
                            </div>
                            {item.description && (
                              <div className="mt-auto pt-4 border-t border-border/50">
                                <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">
                                  {item.description.split('\n').map((line, index) => {
                                    const trimmedLine = line.trim();
                                    if (!trimmedLine) return null;
                                    
                                    if (trimmedLine.startsWith('•')) {
                                      return (
                                        <div key={index} className="flex items-start gap-2">
                                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                          <span className="flex-1">{trimmedLine.replace('•', '').trim()}</span>
                                        </div>
                                      );
                                    }
                                    return (
                                      <p key={index} className={index === 0 ? "font-semibold text-foreground mb-2" : ""}>
                                        {trimmedLine}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
          </Tabs>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
