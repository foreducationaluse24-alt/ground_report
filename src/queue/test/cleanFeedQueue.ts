import { feedQueue } from "../feedQueue";

async function cleanQueue() {
  await feedQueue.obliterate({
    force: true,
  });

  console.log("Feed queue cleaned");

  await feedQueue.close();
}

cleanQueue();