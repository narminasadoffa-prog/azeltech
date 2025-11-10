import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Fleet = () => {
  const equipment = [
    {
      category: "Bulldozers",
      items: [
        { name: "CAT D6R", specs: "Power: 215 HP, Weight: 18,500 kg" },
        { name: "Shantui SD16", specs: "Power: 160 HP, Weight: 16,700 kg" },
      ],
    },
    {
      category: "Excavators",
      items: [
        { name: "CAT 320D", specs: "Power: 121 HP, Weight: 20,300 kg" },
        { name: "Komatsu PC200", specs: "Power: 148 HP, Weight: 19,800 kg" },
        { name: "Hitachi ZX200", specs: "Power: 141 HP, Weight: 20,100 kg" },
      ],
    },
    {
      category: "Front Loaders",
      items: [
        { name: "CAT 950H", specs: "Power: 220 HP, Bucket: 3.1 m³" },
        { name: "XCMG LW500K", specs: "Power: 162 HP, Bucket: 3.0 m³" },
      ],
    },
    {
      category: "Graders",
      items: [
        { name: "CAT 140M", specs: "Power: 210 HP, Blade: 3.7 m" },
      ],
    },
    {
      category: "Compactors",
      items: [
        { name: "BOMAG BW211D", specs: "Weight: 11,000 kg, Drum width: 2,130 mm" },
        { name: "Dynapac CA25", specs: "Weight: 10,500 kg, Drum width: 2,000 mm" },
      ],
    },
    {
      category: "Telescopic Handlers",
      items: [
        { name: "Manitou MLT 735", specs: "Capacity: 3,500 kg, Height: 7 m" },
        { name: "JCB 535-95", specs: "Capacity: 3,500 kg, Height: 9 m" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Fleet</h1>
            <p className="text-xl text-primary-foreground/90">
              Modern equipment. Experienced operators. Reliable performance.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Our machinery fleet consists of modern heavy equipment from leading global brands. All machines undergo regular inspection and are operated by qualified specialists.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {equipment.map((category, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <Wrench className="h-8 w-8 text-secondary" />
                    <h2 className="text-2xl font-bold text-card-foreground">{category.category}</h2>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-4 border-secondary pl-4">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.specs}</p>
                      </div>
                    ))}
                  </div>
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

export default Fleet;
