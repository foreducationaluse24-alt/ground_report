import { addFeeds } from "@/queue/addFeedJobs";

export async function GET() {
  try {
    await addFeeds();

    return Response.json({
      msg: "feed added to queue",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "err",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
