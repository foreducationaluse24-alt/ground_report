import axios from "axios";

interface res {
  headlines: {
    title: string;
    source: string;
    url: string;
    publishedAt: string;
    description: string;
  }[];
  total: string;
  dataRange?: {
    startDate: string;
    enddate: string;
    days?: number;
  };
}

export async function ApiCall() {
  const res = await axios.post(
    "https://api.headlinefeed.dev/api/search",
    {
      
    },
    {
      headers: {
        Authorization: `Bearer hlf_2b8cb41352df425f9a981f8ba258837e`,
        "Content-Type"  : "application/json"
      },
    },
  );
  console.log(res.data.headlines);
  return res.data;
}
