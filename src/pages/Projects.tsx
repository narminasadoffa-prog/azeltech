import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Project {
  id: string;
  no: string;
  name: string;
  contractor: string;
  period: string;
  image: string | null;
  published: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const data = await response.json();
      setProjects(data.filter((project: Project) => project.published));
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[55vh] items-center overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/layih%C9%99l%C9%99rimiz%20AZEL%20/acton-crawford-A4xwAcZOAyo-unsplash.jpg"
            alt="Layihələrimiz üçün ağır texnika"
            className="h-full w-full scale-110 object-cover object-center"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-16" style={{ maxWidth: '1200px' }}>
            <div className="mx-auto max-w-3xl rounded-3xl p-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                Layihələr portfeli
              </p>
              <h1 className="mt-4 text-4xl font-bold md:text-5xl">Layihələrimiz</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" style={{
        background: `linear-gradient(135deg, aliceblue 0%, rgba(240, 248, 255, 0.8) 50%, aliceblue 100%),
                      linear-gradient(to right, rgba(0, 0, 0, 0.3) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        backgroundPosition: '0 0, 0 0, 0 0',
      }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-5xl space-y-12">
            <Card className="border-none bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground">
                    "Azel Texnika" MMC 2021-ci ildən etibarən ölkə üzrə müxtəlif miqyaslı tikinti, infrastruktur və ərazi hazırlığı layihələrində subpodratçı kimi uğurla fəaliyyət göstərir.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Göstərilən layihələrdə torpaq qazma, ərazi düzləndirmə, yol əsasının hazırlanması və digər texniki xidmətlərin icrasını həyata keçirmişdir.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Bizim məqsədimiz — hər bir layihədə vaxtında, təhlükəsiz və yüksək keyfiyyətlə icranı təmin etməkdir.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Davam edən və tamamlanmış işlərimiz şirkətimizin peşəkarlığını, texniki potensialını və etibarlı tərəfdaş imicini əks etdirir.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Aşağıda şirkətimizin iştirak etdiyi əsas layihələrin bir hissəsi təqdim olunur:
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {loading ? (
                <div className="col-span-2 text-center py-12">Yüklənir...</div>
              ) : projects.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-muted-foreground">Hələ layihə yoxdur</div>
              ) : (
                projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden border border-primary/10 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="space-y-5 p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                        Layihə #{project.no}
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {project.period}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Podratçı: <span className="font-medium text-foreground">{project.contractor}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
