import { findCluster } from "@/clustering/findCluster";
import { ApiCall } from "@/headerApiCall";

const check2 = async() =>{
    //const res = await ApiCall();
    const Responses = await findCluster("cmtrmdhu5002bvrydn7654aln");

    return Response.json(Responses);
}

export const GET = check2;