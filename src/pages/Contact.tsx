import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, Building2, Upload, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { z } from "zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast as sonnerToast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().trim().min(1, "Ad və soyad tələb olunur").max(100, "Ad 100 simvoldan az olmalıdır"),
  company: z.string().trim().max(100, "Şirkət adı 100 simvoldan az olmalıdır").optional(),
  phone: z.string().trim().min(1, "Telefon nömrəsi tələb olunur").max(20, "Telefon nömrəsi 20 simvoldan az olmalıdır"),
  email: z.string().trim().email("Yanlış email ünvanı").max(255, "Email 255 simvoldan az olmalıdır"),
  serviceType: z.string().trim().max(100, "Xidmət növü 100 simvoldan az olmalıdır").optional(),
  message: z.string().trim().min(1, "Mesaj tələb olunur").max(1000, "Mesaj 1000 simvoldan az olmalıdır"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });

  const [cvFormData, setCvFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [cvFocusedField, setCvFocusedField] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero fade-in
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    // Form animation
    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Map animation
    if (mapRef.current) {
      gsap.from(mapRef.current, {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      
      toast({
        title: "Mesaj uğurla göndərildi!",
        description: "Tezliklə sizinlə əlaqə saxlayacağıq.",
      });
      
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        serviceType: "",
        message: "",
      });
      setFocusedField(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Doğrulama Xətası",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
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
        sonnerToast.error('CV faylı 10MB-dan böyük ola bilməz');
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        sonnerToast.error('Yalnız PDF və Word sənədləri yüklənə bilər');
        return;
      }
      setCvFile(file);
    }
  };

  const handleCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      sonnerToast.error('CV faylı seçilməlidir');
      return;
    }

    if (!cvFormData.name || !cvFormData.email) {
      sonnerToast.error('Ad və Email tələb olunur');
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
        sonnerToast.success('CV uğurla göndərildi!');
        setCvFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          message: "",
        });
        setCvFile(null);
        const fileInput = document.getElementById('cv-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        sonnerToast.error(data.error || 'CV göndərilmədi');
      }
    } catch (error) {
      console.error('Error uploading CV:', error);
      sonnerToast.error('CV göndərilmədi');
    } finally {
      setUploadingCV(false);
    }
  };

  const handleCvFocus = (fieldName: string) => {
    setCvFocusedField(fieldName);
  };

  const handleCvBlur = () => {
    setCvFocusedField(null);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefon",
      content: "+994 XX XXX XX XX",
      link: "tel:+994XXXXXXXXX",
      description: "Bizimlə telefon vasitəsilə əlaqə saxlayın",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@azeltexnika.az",
      link: "mailto:info@azeltexnika.az",
      description: "E-poçt ünvanımıza yazın",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Ünvan",
      content: "Bakı, Azərbaycan",
      link: "#",
      description: "Ofisimizə gəlmək istəyirsiniz?",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "İş Saatları",
      content: "Bazar ertəsi - Cümə: 09:00 - 18:00",
      link: "#",
      description: "Həftə içi hər gün açığıq",
    },
  ];

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(180deg, #f0f8ff 0%, #e6f2ff 25%, #dceeff 50%, #e6f2ff 75%, #f0f8ff 100%)`
    }}>
      <style>{`
        .floating-label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #0a1b99;
          opacity: 0.6;
          font-size: 16px;
        }
        .floating-label.focused,
        .floating-label.has-value {
          top: 8px;
          transform: translateY(0);
          font-size: 12px;
          color: #0a1b99;
          opacity: 1;
          font-weight: 500;
        }
        .input-field {
          background: rgba(255, 255, 255, 0.95);
          border: 2px solid rgba(10, 27, 153, 0.1);
          color: #0a1b99;
          padding-top: 24px;
          padding-bottom: 8px;
          transition: all 0.3s ease;
        }
        .input-field:focus {
          outline: none;
          border-color: #d4a656;
          box-shadow: 0 0 0 4px rgba(212, 166, 86, 0.2);
          background: rgba(255, 255, 255, 1);
        }
        .contact-card {
          transition: all 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(10, 27, 153, 0.15);
        }
        .gradient-text {
          background: linear-gradient(135deg, #0a1b99 0%, #d4a656 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-card-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .contact-card:hover .contact-card-icon {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(10, 27, 153, 0.2), rgba(212, 166, 86, 0.2));
        }
        .form-input-wrapper {
          position: relative;
        }
        .form-input-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #0a1b99, #d4a656);
          transition: width 0.3s ease;
        }
        .form-input-wrapper:has(.input-field:focus)::after {
          width: 100%;
        }
        .map-marker-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>

      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://iytgdt68iww627sj.public.blob.vercel-storage.com/woman-working-call-center-talking-with-clients-using-headphones-microphone.jpg"
            alt="Əlaqə"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1b99]/60 via-[#0a1b99]/40 to-[#0a1b99]/60" />
        </div>
        <div className="container relative z-10 mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
              <MessageCircle className="h-4 w-4 text-white" />
              <span className="text-white">Bizimlə Əlaqə</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl text-white drop-shadow-lg">
              Gəlin Birgə İşləyək
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90 drop-shadow-md">
              Layihəniz üçün ən yaxşı həlləri tapmaq üçün bizimlə əlaqə saxlayın. 
              Peşəkar komandamız sizə kömək etməyə hazırdır.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="contact-card group border-2 border-[#0a1b99]/10 bg-white/90 backdrop-blur-sm hover:border-[#d4a656]/30 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="contact-card-icon rounded-full bg-gradient-to-br from-[#0a1b99]/10 to-[#d4a656]/10 p-4">
                      <div style={{ color: '#0a1b99' }}>
                        {info.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold" style={{ color: '#0a1b99' }}>
                    {info.title}
                  </h3>
                  <a
                    href={info.link}
                    className="block mb-2 text-base font-semibold transition-colors hover:text-[#d4a656]"
                    style={{ color: '#0a1b99' }}
                  >
                    {info.content}
                  </a>
                  <p className="text-sm" style={{ color: '#0a1b99', opacity: 0.7 }}>
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* Contact Form */}
            <div ref={formRef}>
              <Card className="border-2 border-[#0a1b99]/10 bg-white/95 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="mb-3 text-3xl font-bold" style={{ color: '#0a1b99' }}>
                      Mesaj Göndərin
                    </h2>
                    <p className="text-base" style={{ color: '#0a1b99', opacity: 0.7 }}>
                      Sorğunuzu doldurun və biz tezliklə sizinlə əlaqə saxlayacağıq
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="form-input-wrapper relative">
                        <label
                          htmlFor="name"
                          className={`floating-label ${focusedField === "name" || formData.name ? "focused has-value" : ""}`}
                        >
                          Ad və Soyad *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                          required
                          maxLength={100}
                          className="input-field h-14 w-full"
                        />
                      </div>
                      <div className="form-input-wrapper relative">
                        <label
                          htmlFor="company"
                          className={`floating-label ${focusedField === "company" || formData.company ? "focused has-value" : ""}`}
                        >
                          Şirkət
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => handleFocus("company")}
                          onBlur={handleBlur}
                          maxLength={100}
                          className="input-field h-14 w-full"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="form-input-wrapper relative">
                        <label
                          htmlFor="phone"
                          className={`floating-label ${focusedField === "phone" || formData.phone ? "focused has-value" : ""}`}
                        >
                          Telefon *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus("phone")}
                          onBlur={handleBlur}
                          required
                          maxLength={20}
                          className="input-field h-14 w-full"
                        />
                      </div>
                      <div className="form-input-wrapper relative">
                        <label
                          htmlFor="email"
                          className={`floating-label ${focusedField === "email" || formData.email ? "focused has-value" : ""}`}
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus("email")}
                          onBlur={handleBlur}
                          required
                          maxLength={255}
                          className="input-field h-14 w-full"
                        />
                      </div>
                    </div>

                    <div className="form-input-wrapper relative">
                      <label
                        htmlFor="serviceType"
                        className={`floating-label ${focusedField === "serviceType" || formData.serviceType ? "focused has-value" : ""}`}
                      >
                        Xidmət Növü
                      </label>
                      <Input
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        onFocus={() => handleFocus("serviceType")}
                        onBlur={handleBlur}
                        maxLength={100}
                        className="input-field h-14 w-full"
                      />
                    </div>

                    <div className="form-input-wrapper relative">
                      <label
                        htmlFor="message"
                        className={`floating-label ${focusedField === "message" || formData.message ? "focused has-value" : ""}`}
                        style={{ top: formData.message || focusedField === "message" ? "8px" : "16px" }}
                      >
                        Mesaj *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        rows={6}
                        required
                        maxLength={1000}
                        className="input-field w-full resize-none pt-6"
                        style={{ paddingTop: formData.message || focusedField === "message" ? "24px" : "16px" }}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#0a1b99] to-[#0a1b99]/90 hover:from-[#0a1b99]/90 hover:to-[#0a1b99] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Mesaj Göndər
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div ref={mapRef} className="space-y-6">
              <Card className="border-2 border-[#0a1b99]/10 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="relative h-[500px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.0!2d49.8!3d40.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzAwLjAiTiA0OcKwNDgnMDAuMCJF!5e0!3m2!1sen!2saz!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(20%) brightness(1.05)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Azel Texnika Location"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#d4a656] rounded-full animate-ping opacity-75" />
                      <div className="map-marker-pulse relative w-12 h-12 bg-[#d4a656] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Additional Info Card */}
              <Card className="border-2 border-[#0a1b99]/10 bg-gradient-to-br from-[#0a1b99]/5 to-[#d4a656]/5 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/80 p-3">
                      <Building2 className="h-6 w-6" style={{ color: '#0a1b99' }} />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold" style={{ color: '#0a1b99' }}>
                        Ofisimizə Xoş Gəlmisiniz
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#0a1b99', opacity: 0.8 }}>
                        Bizimlə şəxsən görüşmək istəyirsiniz? Ofisimizə gəlməkdən çəkinməyin. 
                        Əvvəlcədən zəng edərək randevu ala bilərsiniz.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CV Upload Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <Card className="border-2 border-[#0a1b99]/10 bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#0a1b99]/10 to-[#d4a656]/10 p-4">
                  <FileText className="h-8 w-8" style={{ color: '#0a1b99' }} />
                </div>
                <h2 className="mb-3 text-3xl font-bold" style={{ color: '#0a1b99' }}>
                  CV Göndərin
                </h2>
                <p className="text-base" style={{ color: '#0a1b99', opacity: 0.7 }}>
                  Vakansiyalara müraciət etmək üçün CV-nizi göndərin
                </p>
              </div>

              <form onSubmit={handleCvSubmit} className="mx-auto max-w-2xl space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="form-input-wrapper relative">
                    <label
                      htmlFor="cv-name"
                      className={`floating-label ${cvFocusedField === "name" || cvFormData.name ? "focused has-value" : ""}`}
                    >
                      Ad və Soyad *
                    </label>
                    <Input
                      id="cv-name"
                      name="name"
                      value={cvFormData.name}
                      onChange={handleCvChange}
                      onFocus={() => handleCvFocus("name")}
                      onBlur={handleCvBlur}
                      required
                      className="input-field h-14 w-full"
                    />
                  </div>
                  <div className="form-input-wrapper relative">
                    <label
                      htmlFor="cv-email"
                      className={`floating-label ${cvFocusedField === "email" || cvFormData.email ? "focused has-value" : ""}`}
                    >
                      Email *
                    </label>
                    <Input
                      id="cv-email"
                      name="email"
                      type="email"
                      value={cvFormData.email}
                      onChange={handleCvChange}
                      onFocus={() => handleCvFocus("email")}
                      onBlur={handleCvBlur}
                      required
                      className="input-field h-14 w-full"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="form-input-wrapper relative">
                    <label
                      htmlFor="cv-phone"
                      className={`floating-label ${cvFocusedField === "phone" || cvFormData.phone ? "focused has-value" : ""}`}
                    >
                      Telefon
                    </label>
                    <Input
                      id="cv-phone"
                      name="phone"
                      type="tel"
                      value={cvFormData.phone}
                      onChange={handleCvChange}
                      onFocus={() => handleCvFocus("phone")}
                      onBlur={handleCvBlur}
                      className="input-field h-14 w-full"
                    />
                  </div>
                  <div className="form-input-wrapper relative">
                    <label
                      htmlFor="cv-position"
                      className={`floating-label ${cvFocusedField === "position" || cvFormData.position ? "focused has-value" : ""}`}
                    >
                      Müraciət etdiyiniz vəzifə
                    </label>
                    <Input
                      id="cv-position"
                      name="position"
                      value={cvFormData.position}
                      onChange={handleCvChange}
                      onFocus={() => handleCvFocus("position")}
                      onBlur={handleCvBlur}
                      className="input-field h-14 w-full"
                    />
                  </div>
                </div>

                <div className="form-input-wrapper relative">
                  <label
                    htmlFor="cv-message"
                    className={`floating-label ${cvFocusedField === "message" || cvFormData.message ? "focused has-value" : ""}`}
                    style={{ top: cvFormData.message || cvFocusedField === "message" ? "8px" : "16px" }}
                  >
                    Əlavə məlumat
                  </label>
                  <Textarea
                    id="cv-message"
                    name="message"
                    value={cvFormData.message}
                    onChange={handleCvChange}
                    onFocus={() => handleCvFocus("message")}
                    onBlur={handleCvBlur}
                    rows={4}
                    className="input-field w-full resize-none pt-6"
                    style={{ paddingTop: cvFormData.message || cvFocusedField === "message" ? "24px" : "16px" }}
                  />
                </div>

                <div className="form-input-wrapper relative">
                  <label
                    htmlFor="cv-file"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: '#0a1b99' }}
                  >
                    CV Faylı * (PDF və ya Word, maksimum 10MB)
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="cv-file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvFileChange}
                      required
                      className="cursor-pointer"
                    />
                    {cvFile && (
                      <span className="text-sm" style={{ color: '#0a1b99', opacity: 0.7 }}>
                        {cvFile.name}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={uploadingCV}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#0a1b99] to-[#0a1b99]/90 hover:from-[#0a1b99]/90 hover:to-[#0a1b99] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {uploadingCV ? (
                    <>Yüklənir...</>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      CV Göndər
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
