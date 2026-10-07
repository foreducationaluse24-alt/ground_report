import { getCoverageComparison } from "./getCoverageComparison";

// Returns the amount by which each bias category is under-covered compared to the overall outlet baseline.
export async function getCoverageGap(clusterId: string) {
    const comparison = await getCoverageComparison(clusterId);

    const coverageGap: Record<string, number> = {};

    for (const bias in comparison) {
        const difference = comparison[bias].difference;

        if (difference < 0) {
            coverageGap[bias] = Math.abs(difference);
        } else {
            coverageGap[bias] = 0;
        }
    }

    console.log("blindspot")
    console.log(coverageGap)
    return coverageGap;
}

getCoverageGap("cmuphuxrb005xpcyd8jxze1c6")





/**
 {
  LEFT: 0,
  LEAN_LEFT: 0,
  CENTRE: 0,
  LEAN_RIGHT: 10,  // means LEAN_RIGHT is 10 percentage points below its overall tracked-outlet baseline.
  RIGHT: 0
}


 */