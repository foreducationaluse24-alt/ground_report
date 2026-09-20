import { prisma } from "@/lib/prisma";

//  api/clusters?page=2&limit=20

export async function GET(req : Request) {

  const {searchParams} =  new URL(req.url);
  const page  = Number(searchParams.get("page")) || 1;
  const limit  = Number(searchParams.get("limit")) || 20;

  const skip = (page - 1) * limit;
  
  //promise all bcz we can run two db query async bzc theu r independent
  const [clusters,totalCluster] = await Promise.all([
    prisma.storyCluster.findMany({
      skip,
     take : limit,
     orderBy: {
       updatedAt: "desc",
      },
      include: {
        articles: {
         select: {
           id: true,
           title: true,
           source: true,
           publishedAt: true,
           url: true,
         },
         orderBy: {
           publishedAt: "asc",
          },
        },
      },
    }),
    
    prisma.storyCluster.count()
  ])
  
  //total cluster = 260, limit = 20(cluster we need to fetch), totalpage = how many pages that contain 20 cluster we need?
  const totalPages = Math.ceil(totalCluster/limit);
  console.log({
    skip,
    limit,
    page,
    totalPages
  })

  return Response.json({
    page,
    skip,
    limit,
    totalCluster,
    totalPages,
    clusters
  });
}