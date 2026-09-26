import { feedQueue } from "../feedQueue";
import { schedulerQueue } from "../schedulerQueue";


async function checkQueue() {

  const jobs = await schedulerQueue.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed",
  ]);

  for (const job of jobs) {
    console.log({
      id: job.id,
      name: job.name,
      state: await job.getState(),
      failedReason: job.failedReason,
      data: job.data,
    });
  }

  await feedQueue.close();
}

checkQueue();