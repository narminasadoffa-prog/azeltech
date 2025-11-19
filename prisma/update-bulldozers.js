import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const bulldozerDescription = 'Torpaq düzləndirmə və iri həcmli materialların daşınması üçün güclü texnika.';

async function main() {
  // Find all equipment with category "Buldozerlər"
  const bulldozers = await prisma.equipment.findMany({
    where: {
      category: 'Buldozerlər',
    },
  });

  console.log(`Found ${bulldozers.length} bulldozer(s) to update`);

  for (const bulldozer of bulldozers) {
    let newDescription = '';
    
    if (!bulldozer.description || bulldozer.description.trim() === '') {
      // If description is empty, just add the new description
      newDescription = bulldozerDescription;
    } else {
      // If description exists, prepend the new description
      newDescription = `${bulldozerDescription}\n${bulldozer.description}`;
    }

    await prisma.equipment.update({
      where: { id: bulldozer.id },
      data: { description: newDescription },
    });

    console.log(`Updated: ${bulldozer.name}`);
  }

  console.log('All bulldozers updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

