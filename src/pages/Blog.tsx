import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  date: string;
  published: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const parallaxRefs = useRef<(HTMLImageElement | null)[]>([]);
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);
  const headingRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog-posts`);
      const data = await response.json();
      setPosts(data.filter((post: BlogPost) => post.published));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ticking = false;

    // Parallax effect for images with requestAnimationFrame for better performance
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallaxRefs.current.forEach((img) => {
            if (img) {
              const rect = img.getBoundingClientRect();
              const scrolled = window.pageYOffset;
              const elementTop = rect.top + scrolled;
              const elementCenter = elementTop + rect.height / 2;
              const windowCenter = scrolled + window.innerHeight / 2;
              const distance = windowCenter - elementCenter;
              const rate = distance * 0.15;
              img.style.transform = `translateY(${rate}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Fade in effect for text elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Fade-up effect for headings (H2, H3)
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up-visible");
          headingObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    headingRefs.current.forEach((el) => {
      if (el) headingObserver.observe(el);
    });

    // Initial call to set initial positions
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      headingObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-900" style={{
      background: `
        linear-gradient(180deg, #f0f8ff 0%, #e6f2ff 100%),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
        radial-gradient(ellipse 800px 1200px at -200px 50%, rgba(240, 248, 255, 0.4) 0%, transparent 70%),
        radial-gradient(ellipse 600px 800px at 80% 20%, rgba(212, 166, 86, 0.1) 0%, transparent 70%)
      `,
      backgroundSize: '100% 100%, 200px 200px, 100% 100%, 100% 100%',
      backgroundPosition: '0 0, 0 0, 0 0, 0 0',
      backgroundRepeat: 'no-repeat, repeat, no-repeat, no-repeat',
    }}>
      <style>{`
        /* Noise texture overlay */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Parallax image */
        .parallax-image {
          transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Hero 3D Images */
        .hero-image-3d {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        /* Fade-up animation for headings */
        .fade-up {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-up-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* General fade-in */
        .fade-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Glassmorphism card */
        .glass-card {
          position: relative;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(240, 248, 255, 0.3) 0%, rgba(212, 166, 86, 0.1) 100%);
          pointer-events: none;
        }
        .glass-card:hover {
          border-color: rgba(212, 166, 86, 0.5);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15),
                      0 0 0 1px rgba(212, 166, 86, 0.2);
          transform: translateY(-4px);
        }

        /* Golden accent text */
        .golden-text {
          color: #d4a656;
        }
        .golden-accent {
          color: #d4a656;
        }
      `}</style>
      <Header />

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-32 md:py-40"
        style={{
          backgroundImage: `url('https://iytgdt68iww627sj.public.blob.vercel-storage.com/kran/close-up-construction-site-excavator.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="fade-in mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border border-white/40 bg-white/20 px-6 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white backdrop-blur-sm">
              Blog · Yeniliklər
            </Badge>
            <h1
              ref={(el) => {
                if (el) headingRefs.current.push(el);
              }}
              className="fade-up mt-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl drop-shadow-lg leading-tight"
            >
              <span className="block">Texnika parkımızdan və komandamızdan yeniliklər</span>
            </h1>
            <p className="mt-8 text-xl text-white drop-shadow-md max-w-2xl mx-auto leading-relaxed">
              Texnika parkımızdan, layihələrimizdən və komandamızdan ən aktual xəbərlər. 
              <span className="block mt-2 text-lg text-white/90">
                Bizimlə bir addım öndə olun və sənayedəki yenilikləri izləyin.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          {loading ? (
            <div className="text-center py-12">Yüklənir...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Hələ blog yazısı yoxdur</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {posts.slice(0, 3).map((story, index) => (
              <Card
                key={story.id}
                ref={(el) => {
                  if (el) fadeRefs.current.push(el);
                }}
                className="fade-in glass-card overflow-hidden shadow-xl"
              >
                <Carousel className="relative w-full" opts={{ loop: true }}>
                  <CarouselContent>
                    <CarouselItem>
                      <div className="relative h-56 overflow-hidden" style={{ backgroundColor: 'aliceblue' }}>
                        {story.image ? (
                          <img
                            ref={(el) => {
                              if (el) parallaxRefs.current.push(el);
                            }}
                            src={story.image.startsWith('http') ? story.image : (story.image.startsWith('/uploads') ? `${API_URL}${story.image}` : `${API_URL}/uploads/${story.image}`)}
                            alt={story.title}
                            className="parallax-image h-full w-full object-cover transition-transform duration-700 hover:scale-110 opacity-90"
                            onError={(e) => {
                              console.error('Image load error:', story.image);
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                            Şəkil yoxdur
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-[#d4a656]/40 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4a656] backdrop-blur-sm">
                          {story.date}
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 border border-[#d4a656]/40 bg-white/80 text-[#d4a656] backdrop-blur-sm hover:bg-[#d4a656]/20 hover:text-white" />
                  <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 border border-[#d4a656]/40 bg-white/80 text-[#d4a656] backdrop-blur-sm hover:bg-[#d4a656]/20 hover:text-white" />
                </Carousel>
                <CardContent
                  ref={(el) => {
                    if (el) fadeRefs.current.push(el);
                  }}
                  className="fade-in space-y-3 p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-800">{story.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{story.excerpt || story.content?.substring(0, 150) || ''}</p>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Posts */}
      {posts.length > 3 && (
        <section
          className="py-20"
          style={{
            background: `linear-gradient(180deg, #f0f8ff 0%, #e6f2ff 100%)`,
          }}
        >
          <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
            <div
              ref={(el) => {
                if (el) fadeRefs.current.push(el);
              }}
              className="fade-in mx-auto max-w-3xl text-center"
            >
              <h2
                ref={(el) => {
                  if (el) headingRefs.current.push(el);
                }}
                className="fade-up text-3xl font-bold text-slate-800 md:text-4xl"
              >
                Bütün Yazılar
              </h2>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {posts.slice(3).map((article, articleIndex) => (
                <Card
                  key={article.id}
                  ref={(el) => {
                    if (el) fadeRefs.current.push(el);
                  }}
                  className="fade-in glass-card overflow-hidden shadow-xl"
                >
                  <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
                    <div className="relative h-52 w-full overflow-hidden md:h-full" style={{ backgroundColor: 'aliceblue' }}>
                      {article.image ? (
                        <img
                          ref={(el) => {
                            if (el) parallaxRefs.current.push(el);
                          }}
                          src={article.image.startsWith('http') ? article.image : (article.image.startsWith('/uploads') ? `${API_URL}${article.image}` : `${API_URL}/uploads/${article.image}`)}
                          alt={article.title}
                          className="parallax-image h-full w-full object-cover transition-transform duration-700 hover:scale-110 opacity-90"
                          onError={(e) => {
                            console.error('Image load error:', article.image);
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                          Şəkil yoxdur
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full border border-[#d4a656]/40 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4a656] backdrop-blur-sm">
                        {article.date}
                      </div>
                    </div>
                    <CardContent
                      ref={(el) => {
                        if (el) fadeRefs.current.push(el);
                      }}
                      className="fade-in space-y-4 p-6"
                    >
                      <h3
                        ref={(el) => {
                          if (el) headingRefs.current.push(el);
                        }}
                        className="fade-up text-xl font-semibold text-slate-800"
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{article.excerpt || article.content?.substring(0, 150) || ''}</p>
                      <button className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#d4a656] transition-all hover:text-[#b8943f] hover:gap-3">
                        Daha çox oxu
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Blog;

