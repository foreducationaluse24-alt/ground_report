import { prisma } from "@/lib/prisma";

export async function getOrCreateoutlet(name: string,domain : string) {
  const outletData = await prisma.outlet.upsert({
   where  : {
    domain
   },
   update : {},
   create : {
    name ,
    domain
   }
  });

  return outletData;
}
