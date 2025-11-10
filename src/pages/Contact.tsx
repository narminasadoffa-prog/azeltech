import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { z } from "zod";

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

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Ünvan",
      content: "Bakı, Azərbaycan",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefon",
      content: "+994 XX XXX XX XX",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@azeltexnika.az",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "İş Saatları",
      content: "Bazar ertəsi - Cümə: 09:00 - 18:00",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Bizimlə Əlaqə</h1>
            <p className="text-xl text-primary-foreground/90">
              Ağır texnika icarəsi və ya layihəniz üçün texniki dəstək axtarırsınız?
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Əlaqə Saxlayın</h2>
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-3 text-primary">{info.icon}</div>
                    <h3 className="mb-2 font-semibold text-card-foreground">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">{info.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold text-card-foreground">Bizə Mesaj Göndərin</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad və Soyad *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          maxLength={100}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Şirkət</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          maxLength={20}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          maxLength={255}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Tələb olunan xidmət növü</Label>
                      <Input
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mesaj *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        maxLength={1000}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Sorğu Göndər
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
