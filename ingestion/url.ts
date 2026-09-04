
const trackingParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
    "mc_cid",
    "mc_eid",
    "at_medium",
    "at_campaign"
  ];


export function normalizeUrl(rawUrl: string): string {
  const url = new URL(rawUrl);  //convert url string into url object

  // Remove fragment => #example
  url.hash = ""; 

  // Remove tracking parameters
  for (const param of trackingParams) {
    url.searchParams.delete(param);
  }

  // Normalize trailing slash => remove trailing `/` at the end
  url.pathname = url.pathname.replace(/\/+$/, "");

  // Normalize hostname 
  url.hostname = url.hostname.toLowerCase();

  return url.toString();  //again convert url object back to a string
}
