
import { findCluster } from "@/clustering/findCluster";
import { getClusterArticles } from "@/clustering/getClusterArticles";
import { ApiCall } from "@/headerApiCall";
import { prisma } from "@/lib/prisma";

const check2 = async() =>{
    //const res = await ApiCall();
    // const Responses = await findCluster("cmtrmdhu5002bvrydn7654aln");

    const response =  await findCluster("cmu4cmuif000bojydvgoh3xkv");
    if(response.type === "error"){
      return Response.json({msg : response.error});
    }

    // const {clusterId} = response

    // console.log("cluserId: " + clusterId)

    // const articles = await getClusterArticles(clusterId);
    return Response.json(response);
}

export const GET = check2;