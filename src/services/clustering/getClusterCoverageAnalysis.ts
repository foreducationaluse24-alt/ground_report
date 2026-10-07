import { getCoverageComparison } from "./getCoverageComparison";

// Returns the complete bias coverage analysis for a story cluster.
export async function getClusterCoverageAnalysis(clusterId: string) {
    const comparison = await getCoverageComparison(clusterId);

    const coverageGap: Record<string, number> = {};

    for (const bias in comparison) {
        const difference = comparison[bias].difference;

        coverageGap[bias] = difference < 0
            ? Math.abs(difference)
            : 0;
    }

    return {
        comparison,
        coverageGap,
    };
}