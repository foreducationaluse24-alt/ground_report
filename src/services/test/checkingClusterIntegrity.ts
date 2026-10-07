import { getClusterCoverage } from "../clustering/getClusterCoverage"; 


async function checkCluster(){
    const articles = await getClusterCoverage("cmuju3wlz002qboydn9z9qhc8");

    for(let article of articles){
        const bias = article.outlet.bias;
        
        console.log({title : article.title,bias});

    }
    return ;
}

checkCluster();