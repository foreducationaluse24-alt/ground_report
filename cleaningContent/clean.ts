import * as cheerio  from "cheerio"; 


export function cleanArticleContent(html : string) : string{
    const $ = cheerio.load(html);

    return $("body").text().replace(/\s+/g," ").trim();
}




