import IORedis from "ioredis"
import { Worker } from "bullmq"
import { addFeeds } from "@/queue/addFeedJobs";

const connection = new IORedis(process.env.REDIS_URL!,{
    maxRetriesPerRequest : null
})

//listening to feed-shedular queue
const shedularWorker = new Worker("feed-scheduler",
    async (job) =>{
        console.log(`runnning shedular job ${job.id}`);
        await addFeeds();
        console.log("all feeds added to feed queue")
    },
    {
        connection 
    }
)


shedularWorker.on("completed",(job)=>{
    console.log(`Scheduler job ${job.id} completed`);
})


shedularWorker.on("failed",(job,err)=>{
    console.log(`Scheduler job ${job?.id} completed by error : ${err}`);
})