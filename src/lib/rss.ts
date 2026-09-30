import Parser from "rss-parser";

const parser = new Parser();

const Rss_Parser = async(Feedurl : string) =>{
    const feed = await parser.parseURL(Feedurl);

    return feed.items;   //return array of articles from the rss feed => which is then processed in ingestion pipeline
}

export default Rss_Parser;
