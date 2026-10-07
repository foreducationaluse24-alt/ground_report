import { NextResponse } from "next/server";
import { getClusterCoverageAnalysis } from "@/services/clustering/getClusterCoverageAnalysis";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ clusterId: string }> }
) {
    const { clusterId } = await params;

    const analysis = await getClusterCoverageAnalysis(clusterId);

    return NextResponse.json({
        clusterId,
        ...analysis,
    });
}