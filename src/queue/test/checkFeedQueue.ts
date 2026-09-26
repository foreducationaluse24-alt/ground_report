import { feedQueue } from "../feedQueue";


async function checkQueue() {

  const jobs = await feedQueue.getJobs([
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
      failedReason: job.failedReason ?? "no failure detected!",
      data: job.data,
    });
  }

  await feedQueue.close();
}

checkQueue();