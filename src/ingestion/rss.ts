import Parser from "rss-parser";

const parser = new Parser();

const Rss_Parser = async(Feedurl : string) =>{
    const feed = await parser.parseURL(Feedurl);

    return feed.items;
}

export default Rss_Parser;
