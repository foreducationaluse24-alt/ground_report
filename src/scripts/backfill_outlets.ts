import { prisma } from "@/lib/prisma";

const outlets = [
  {
    source: "Indian Express",
    name: "Indian Express",
    domain: "indianexpress.com",
  },
  {
    source: "The Hindu",
    name: "The Hindu",
    domain: "thehindu.com",
  },
  {
    source: "Hindustan Times",
    name: "Hindustan Times",
    domain: "hindustantimes.com",
  },
  {
    source: "BBC News",
    name: "BBC News",
    domain: "bbc.com",
  },
];

async function backfillOutlets() {
  for (const outletData of outlets) {
    const outlet = await prisma.outlet.upsert({
      where: {
        domain: outletData.domain,
      },
      update: {},
      create: {
        name: outletData.name,
        domain: outletData.domain,
      },
    });

    const result = await prisma.article.updateMany({
      where: {
        source: outletData.source,
        outletId: null,
      },
      data: {
        outletId: outlet.id,
      },
    });

    console.log(
      `${outlet.name}: ${result.count} articles connected`,
    );
  }
}

backfillOutlets()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });