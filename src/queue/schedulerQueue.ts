import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL!);

//making a queue called feed-scheduler
export const schedulerQueue = new Queue("feed-scheduler", {
  connection,
});