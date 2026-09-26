interface FeedSource {
  name: string;
  rssUrl: string;
  domain: string;
}

export const feeds: FeedSource[] = [
  {
    name: "Hindustan Times",
    rssUrl: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
    domain: "hindustantimes.com",
  },
  {
    name: "BBC News",
    rssUrl: "https://feeds.bbci.co.uk/news/rss.xml",
    domain: "bbc.com",
  },
  {
    name: "The Hindu",
    rssUrl: "https://www.thehindu.com/feeder/default.rss",
    domain: "thehindu.com",
  },
  {
    name: "Indian Express",
    rssUrl: "https://indianexpress.com/feed",
    domain: "indianexpress.com",
  },
];

//the hindu
//bbc
//hindustan times
