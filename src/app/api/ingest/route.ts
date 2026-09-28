
export async function GET() {
  try {
    const res = await fetch("https://media-bias-fact-check-ratings-api2.p.rapidapi.com/fetch-data",{
      headers : {
        "X-RapidAPI-Key" : "c817d1ea08msh2418a7abfd6ddacp1e2e6djsn2c794c800ca3",
        "X-RapidAPI-Host" : "media-bias-fact-check-ratings-api2.p.rapidapi.com"
      }
    });

    const data = await res.json()
      
    console.log(res);
    

    return Response.json(data);

  } catch (error) {
    console.error(error);

    return Response.json(
      { msg: "err", error: String(error) },
      { status: 500 }
    );
  }
}