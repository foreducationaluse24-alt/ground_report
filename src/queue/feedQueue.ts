import {Queue} from "bullmq";  //Queue is the BullMQ object that lets us add jobs.
import IORedis from 'ioredis';


const connection = new IORedis(process.env.REDIS_URL!); //create connection

export const feedQueue = new Queue("feed-ingestion",{
    connection
});