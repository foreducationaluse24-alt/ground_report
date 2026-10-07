  import { prisma } from "@/lib/prisma"; 

  interface outletMetadataType {
    name: string;
    domain: string;
    bias: "LEFT" | "LEAN_LEFT" | "CENTRE" | "LEAN_RIGHT" | "RIGHT" | null;
    country: string;
    factualityScore: number | null;
    biasSource: string | null;
    biasSourceUrl: string | null;
  }
  export const outletMetadata: outletMetadataType[] = [
    {
      name: "Hindustan Times",
      domain: "hindustantimes.com",
      bias: "LEAN_LEFT",
      factualityScore: 6.2,
      country: "India",
      biasSource: "MBFC",
      biasSourceUrl: "https://mediabiasfactcheck.com/hindustan-times/",
    },
    {
      name: "BBC News",
      domain: "bbc.com",
      bias: "CENTRE",
      factualityScore: 2.1,
      country: "United Kingdom",
      biasSource: "MBFC",
      biasSourceUrl: "https://mediabiasfactcheck.com/bbc/",
    },
    {
      name: "The Hindu",
      domain: "thehindu.com",
      bias: "LEAN_LEFT",
      factualityScore: 2.8,
      country: "India",
      biasSource: "MBFC",
      biasSourceUrl: "https://mediabiasfactcheck.com/the-hindu/",
    },
    {
      name: "Indian Express",
      domain: "indianexpress.com",
      bias: "LEAN_LEFT",
      factualityScore: 5.0,
      country: "India",
      biasSource: "MBFC",
      biasSourceUrl: "https://mediabiasfactcheck.com/the-indian-express/",
    },{
      name : "Firstpost",
      domain : "firtpost.com",
      bias : "LEAN_RIGHT",
      factualityScore : 3.1,
      country : "India",
      biasSource : "MBFC",
      biasSourceUrl : "https://mediabiasfactcheck.com/first-post/"
    },{
      name : "NDTV News",
      domain : "ndtv.com",
      bias : "LEAN_RIGHT",
      factualityScore : 6.2,
      country : "India",
      biasSource : "MBFC",
      biasSourceUrl : "https://mediabiasfactcheck.com/ndtv/"
    },
    {
      name : "FreepressJournal",
      domain : "freepressjournal.in",
      bias : null,
      country : "India",
      factualityScore : null,
      biasSource : null,
      biasSourceUrl : null
    },{
      name : "Times Of India",
      domain : "timesofindia.com",
      bias : "LEAN_RIGHT",
      factualityScore : 5.1,
      country : "India",
      biasSource : "MBFC",
      biasSourceUrl : "https://mediabiasfactcheck.com/times-of-india/"
    },{
       name: "India TV News",
       domain : "indiatvnews.com",
       bias : "LEAN_RIGHT",
       factualityScore : 2.2,
       country : "India",
       biasSource : "MBFC",
       biasSourceUrl : "https://mediabiasfactcheck.com/india-tv/"
    },{
      name : "Tribune India News",
      domain : "tribuneindia.com",
      bias : "LEAN_RIGHT",
      factualityScore : 4.8,
      country : "India",
      biasSource : "MBFC",
      biasSourceUrl : "https://mediabiasfactcheck.com/the-tribune-india-bias/"
    },{
      name : "India Today",
      domain : "indiatoday.in",
      bias : "LEAN_RIGHT",
      factualityScore : 5.0,
      country : "India",
      biasSource : "MBFC",
      biasSourceUrl : "https://mediabiasfactcheck.com/india-today/"
    },
    {
      name : "The Wire",
      domain : "thewire.in",
      bias : "LEAN_RIGHT",
      factualityScore : 2.9,
      country : "India",
      biasSource : "MBFC",
      biasSourceUrl : "https://mediabiasfactcheck.com/the-wire-india/"
    },
  ];

  async function updateOutletMetadata(outletMetadata: outletMetadataType[]) {
    console.log("start");
    for (let outlet of outletMetadata) {
      console.log(`${outlet.name} updated`)
      await prisma.outlet.upsert({
        where: {
          domain: outlet.domain,
        },
        update: {
          country : outlet.country,
          bias: outlet.bias,
          biasSource: outlet.biasSource,
          biasSourceUrl: outlet.biasSourceUrl,
          factualityScore : outlet.factualityScore
        },
        create: {
          name : outlet.name,
          domain: outlet.domain,
          country : outlet.country,
          bias: outlet.bias,
          factualityScore : outlet.factualityScore,
          biasSource: outlet.biasSource,
          biasSourceUrl: outlet.biasSourceUrl,
        },
      });
    }

    return "outlet metadata has been updated";
  }


  updateOutletMetadata(outletMetadata);