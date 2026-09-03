
interface FeedSource  {
    name : string
    rssUrl : string
}


export const feeds: FeedSource [] = [{
    name : "BBC News",
    rssUrl : "https://feeds.bbci.co.uk/news/rss.xml"
},{
    name : "The Hindu",
    rssUrl : "https://www.thehindu.com/feeder/default.rss"
}]