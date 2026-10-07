import { getClusterCoverage } from "./getClusterCoverage";



export async function getBiasDistribution(clusterId : string){
    const articles = await getClusterCoverage(clusterId);
    const distribution : Record<string,number> = {};

    
    //get only unique outlet bias for percentage calulation
    const flag: Record<string,boolean> = {};
    const unique : {domain : string,bias : string}[] = [];
    articles.forEach(article=>{
        const bias = article.outlet.bias;
        if(!bias){
            return;
        }

        if(!flag[article.outlet.domain]){
            flag[article.outlet.domain] = true;
            unique.push({domain : article.outlet.domain ,bias});
        }
    })

    console.log(unique)

    for(let outlet of unique){
        const bias = outlet.bias;

        //checking typesafety
        distribution[bias] = (distribution[bias] || 0) + 1;

    }
    //console.log(distribution)           { LEAN_LEFT: 36 }

    
    //Object.values(distribution) ==> gives an "Array" of values present in each key.(ex : [23,36]);
    //reduce() repeatedly takes the previous result, combines it with the next item, and returns the final result. Here, you're simply adding numbers together.
    const total = unique.length;
    if(unique.length === 0){
        return {};
    }
   
    const percentage : Record<string,number> = {};

    for(const bias in distribution){  //in → looping over keys in distribtion object {} → keys
        percentage[bias] = (distribution[bias]/total)*100;
    }

    console.log({"percentage distribution" : percentage});
    return percentage;
}

