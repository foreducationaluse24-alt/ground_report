import { schedulerQueue } from "./schedulerQueue";

//code to just tell the worker that once this job arrives, initiate job at interval. 
async function startScheduler() {
  await schedulerQueue.upsertJobScheduler(
    "feed-scheduler", //name fo schedule queue
    {
      every: 10 * 60 * 1000,
    },
    {
      name: "process-feeds", //name fo job in schedule queue
      data: {},
      opts : {
        removeOnComplete : true
      }
    },
    
  );

  console.log("feed scheduler started");
}

startScheduler();