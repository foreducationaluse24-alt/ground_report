

import { getBiasDistribution } from "./getBiasDistribution";
import { getOverallBiasDistribution } from "./getOverallBiasDistribution";

const biasCategories = [
    "LEFT",
    "LEAN_LEFT",
    "CENTRE",
    "LEAN_RIGHT",
    "RIGHT",
];

// Combines the cluster bias distribution, overall outlet distribution, and their percentage-point difference into one result.
export async function getCoverageComparison(clusterId: string) {
    const clusterDistribution = await getBiasDistribution(clusterId);
    const overallDistribution = await getOverallBiasDistribution();

    const comparison: Record<
        string,
        {
            cluster: number;
            overall: number;
            difference: number;
        }
    > = {};

    for (const bias of biasCategories) {
        const clusterValue = clusterDistribution[bias] || 0;
        const overallValue = overallDistribution[bias] || 0;

        comparison[bias] = {
            cluster: clusterValue,
            overall: overallValue,
            difference: clusterValue - overallValue,
        };
    }

    console.log("comparison");
    console.log(comparison)
    return comparison;
}

// getCoverageComparison("cmuphuxrb005xpcyd8jxze1c6")


// One important limitation: this is a coverage-deviation metric based on your tracked-outlet baseline, not proof that a story is objectively missing a political perspective. The baseline itself depends on which outlets you've chosen to track. That distinction matters quite a lot here.