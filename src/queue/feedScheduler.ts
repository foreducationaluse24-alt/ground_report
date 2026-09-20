import { schedulerQueue } from "./schedulerQueue";

async function startScheduler() {
  await schedulerQueue.upsertJobScheduler(
    "feed-scheduler",
    {
      every: 10 * 60 * 1000,
    },
    {
      name: "process-feeds",
      data: {},
    },
  );

  console.log("feed scheduler started");
}

startScheduler();