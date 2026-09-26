import { prisma } from "@/lib/prisma";

const check2 = async () => {
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

  for (let outlet of outlets){
    
    const b = await prisma.outlet.upsert({
      where : {
        domain : outlet.domain,
      },
      update : {},
      create: {
        name: outlet.name,
        domain: outlet.domain,
      },
    });

  const a = await prisma.article.updateMany({
    where: {
      source: outlet.source,
      outletId : null
    },
    data: {
      outletId: b.id,
    },
  });
  }
};

export const GET = check2;
