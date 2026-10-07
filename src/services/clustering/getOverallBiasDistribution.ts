import { prisma } from "@/lib/prisma";

//Among the outlets covering this particular storyCluster, what is the bias distribution?
export async function getOverallBiasDistribution() {
    const outlets = await prisma.outlet.findMany({
        where : {
            bias : {
                not : null
            }
        },
        select : {
            bias : true
        }
    });
    console.log(outlets)

    const distribtion : Record<string,number> = {}

    for(const outlet of outlets){
        const bias = outlet.bias;
        if(!bias){
            continue;
        }

        distribtion[bias] = (distribtion[bias] || 0) + 1;
    }

    const total = outlets.length;
    const percentage: Record<string, number> = {};

    for(const bias in distribtion){
        percentage[bias]  = (distribtion[bias] / total)*100;
    }

    console.log(percentage)
    return percentage;
}



/*
get the percentage or overallbiasDistribution of all the outlets
[
  { bias: 'LEAN_LEFT' },
  { bias: 'CENTRE' },
  { bias: 'LEAN_LEFT' },
  { bias: 'LEAN_LEFT' },
  { bias: 'LEAN_RIGHT' },
  { bias: 'LEAN_RIGHT' },
  { bias: 'LEAN_RIGHT' },
  { bias: 'LEAN_RIGHT' },
  { bias: 'LEAN_RIGHT' },
  { bias: 'LEAN_RIGHT' }
]

{ LEAN_LEFT: 30, CENTRE: 10, LEAN_RIGHT: 60 }
 

*/