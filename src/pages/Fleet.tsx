import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Fleet = () => {
  const equipment = [
    {
      category: "Telescopic Loaders",
      items: [
        {
          name: "Genie 4017",
          manufacturer: "Genie",
          year: "2023",
          specs: [
            "Lifting capacity: 3.5 t",
            "Maximum height: 17 m",
            "Engine power: 74 kW",
          ],
        },
      ],
    },
    {
      category: "Backhoe Loaders",
      items: [
        {
          name: "Volvo Backhoe Loader",
          manufacturer: "Volvo",
          year: "2025",
          specs: [
            "Operating weight: 3.0–3.5 t",
            "Engine power: 74–92 kW",
            "Bucket capacity: 1.5–2.0 m³",
            "Maximum digging depth: 4 m",
          ],
        },
      ],
    },
    {
      category: "Bulldozers",
      items: [
        {
          name: "Shantui SD32",
          manufacturer: "Shantui",
          year: "2018",
          specs: [
            "Operating weight: 43 t",
            "Engine power: 235 kW",
            "Blade width: 4.2 m",
            "Maximum earth pushing: 400 m³/h",
          ],
        },
        {
          name: "Shantui SD22 (2 units)",
          manufacturer: "Shantui",
          year: "2020",
          specs: [
            "Operating weight: 27 t",
            "Engine power: 165 kW",
            "Blade width: 3.9 m",
            "Maximum earth pushing: 300 m³/h",
          ],
        },
        {
          name: "Komatsu D155",
          manufacturer: "Komatsu",
          year: "",
          specs: [
            "Operating weight: 36 t",
            "Engine power: 235 kW",
            "Blade width: 4.2 m",
            "Maximum earth pushing: 420 m³/h",
          ],
        },
        {
          name: "Komatsu D355",
          manufacturer: "Komatsu",
          year: "2012",
          specs: [
            "Operating weight: 53 t",
            "Engine power: 320 kW",
            "Blade width: 4.8 m",
            "Maximum earth pushing: 600 m³/h",
          ],
        },
      ],
    },
    {
      category: "Excavators",
      items: [
        {
          name: "Hyundai 210 (wheeled)",
          manufacturer: "Hyundai",
          year: "2016",
          specs: [
            "Operating weight: 21 t",
            "Engine power: 110 kW",
            "Working radius: 9.8 m",
            "Bucket capacity: 1.0 m³",
          ],
        },
        {
          name: "Doosan DX300",
          manufacturer: "Doosan",
          year: "2016",
          specs: [
            "Operating weight: 30 t",
            "Engine power: 165 kW",
            "Working radius: 10 m",
            "Bucket capacity: 1.5 m³",
          ],
        },
        {
          name: "Doosan DX340 Crawler",
          manufacturer: "Doosan",
          year: "2012",
          specs: [
            "Operating weight: 34 t",
            "Engine power: 200 kW",
            "Working radius: 10.5 m",
            "Bucket capacity: 1.6 m³",
          ],
        },
        {
          name: "New Holland 305",
          manufacturer: "New Holland",
          year: "2022",
          specs: [
            "Operating weight: 30 t",
            "Engine power: 110 kW",
            "Working radius: 9.8 m",
            "Bucket capacity: 1.0–1.2 m³",
          ],
        },
        {
          name: "New Holland 925 Excavator-Rockson",
          manufacturer: "New Holland",
          year: "2019",
          specs: [
            "Operating weight: 24 t",
            "Engine power: 90 kW",
            "Working radius: 8.5 m",
            "Bucket capacity: 0.9–1.1 m³",
          ],
        },
      ],
    },
    {
      category: "Front Loaders",
      items: [
        {
          name: "SDLG 956",
          manufacturer: "SDLG",
          year: "2022",
          specs: [
            "Operating weight: 5.6 t",
            "Engine power: 85 kW",
            "Bucket capacity: 2.0–2.3 m³",
            "Maximum lift height: 3.2 m",
          ],
        },
      ],
    },
    {
      category: "Compactors",
      items: [
        {
          name: "XCMG Compactor",
          manufacturer: "XCMG",
          year: "2018",
          specs: [
            "Operating weight: 12–15 t",
            "Engine power: 92 kW",
            "Drum width: 2.1 m",
            "Maximum compaction force: 120 kN",
          ],
        },
        {
          name: "Liugong Compactor",
          manufacturer: "Liugong",
          year: "2023",
          specs: [
            "Operating weight: 10–14 t",
            "Engine power: 85 kW",
            "Drum width: 2.0 m",
            "Maximum compaction force: 110 kN",
          ],
        },
        {
          name: "Dynapac Compactor",
          manufacturer: "Dynapac",
          year: "2013",
          specs: [
            "Operating weight: 14 t",
            "Engine power: 95 kW",
            "Drum width: 2.2 m",
            "Maximum compaction force: 130 kN",
          ],
        },
      ],
    },
    {
      category: "Graders",
      items: [
        {
          name: "Liugong 418",
          manufacturer: "Liugong",
          year: "2024",
          specs: [
            "Operating weight: 16 t",
            "Engine power: 125 kW",
            "Blade width: 4.2 m",
            "Maximum lift height: 0.4 m",
          ],
        },
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
          {equipment.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <Wrench className="h-8 w-8 text-secondary" />
                <h2 className="text-3xl font-bold text-foreground">{category.category}</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="overflow-hidden transition-shadow hover:shadow-lg">
                    {/* Image Placeholder */}
                    <div className="aspect-video w-full bg-muted flex items-center justify-center">
                      <Wrench className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-foreground">{item.name}</h3>
                      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{item.manufacturer}</span>
                        {item.year && (
                          <>
                            <span>•</span>
                            <span>{item.year}</span>
                          </>
                        )}
                      </div>
                      <div className="space-y-1">
                        {item.specs.map((spec, specIndex) => (
                          <p key={specIndex} className="text-sm text-muted-foreground">
                            • {spec}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
