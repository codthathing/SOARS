
import "server-only";

import { lookup } from "node:dns/promises";
import * as ipaddr from "ipaddr.js";
import { load } from "cheerio";

export interface LinkMetadata {
  url: string;
  hostname: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
}

async function validatePublicUrl(value: string): Promise<URL> {
  const url = new URL(value);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS links are supported.");
  }

  if (url.username || url.password) {
    throw new Error("URLs containing credentials are not allowed.");
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, "");

  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local")
  ) {
    throw new Error("This URL is not allowed.");
  }

  let addresses: { address: string }[];

  try {
    if (ipaddr.isValid(hostname)) {
      addresses = [{ address: hostname }];
    } else {
      addresses = await lookup(hostname, { all: true });
    }
  } catch {
    throw new Error("Unable to resolve this website.");
  }

  if (
    addresses.length === 0 ||
    addresses.some(({ address }) => {
      try {
        return ipaddr.parse(address).range() !== "unicast";
      } catch {
        return true;
      }
    })
  ) {
    throw new Error("This URL points to a restricted network address.");
  }

  return url;
}

async function fetchPublicPage(initialUrl: string) {
  let currentUrl = initialUrl;

  for (let attempt = 0; attempt < 6; attempt++) {
    const url = await validatePublicUrl(currentUrl);

    const response = await fetch(url, {
      redirect: "manual",
      headers: {
        "User-Agent": "SOARS-Link-Preview/1.0",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(15000),
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");

      if (!location) {
        throw new Error("Invalid website redirect.");
      }

      currentUrl = new URL(location, url).href;
      continue;
    }

    if (!response.ok) {
      throw new Error(`Website returned status ${response.status}.`);
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      throw new Error("This link does not point to an HTML webpage.");
    }

    const contentLength = Number(
      response.headers.get("content-length") || 0
    );

    if (contentLength > 2 * 1024 * 1024) {
      throw new Error("Webpage is too large to preview.");
    }

    const html = await response.text();

    if (html.length > 2 * 1024 * 1024) {
      throw new Error("Webpage is too large to preview.");
    }

    return { html, url: url.href };
  }

  throw new Error("Too many website redirects.");
}

export async function getLinkMetadata(
  inputUrl: string
): Promise<LinkMetadata> {
  const { html, url: finalUrl } = await fetchPublicPage(inputUrl);

  const $ = load(html);
  const pageUrl = new URL(finalUrl);

  const getMeta = (...selectors: string[]) => {
    for (const selector of selectors) {
      const value = $(selector).attr("content")?.trim();

      if (value) return value;
    }

    return "";
  };

  const resolveUrl = (value: string) => {
    if (!value) return "";

    try {
      const resolved = new URL(value, finalUrl);

      if (!["http:", "https:"].includes(resolved.protocol)) {
        return "";
      }

      return resolved.href;
    } catch {
      return "";
    }
  };

  const title =
    getMeta(
      'meta[property="og:title"]',
      'meta[name="twitter:title"]'
    ) ||
    $("title").first().text().trim() ||
    pageUrl.hostname;

  const description = getMeta(
    'meta[property="og:description"]',
    'meta[name="description"]',
    'meta[name="twitter:description"]'
  );

  const image = resolveUrl(
    getMeta(
      'meta[property="og:image"]',
      'meta[name="twitter:image"]'
    )
  );

  const faviconHref =
    $('link[rel="icon"]').first().attr("href") ||
    $('link[rel="shortcut icon"]').first().attr("href") ||
    "/favicon.ico";

  return {
    url: finalUrl,
    hostname: pageUrl.hostname.replace(/^www\./, ""),
    title,
    description,
    image,
    favicon: resolveUrl(faviconHref),
  };
}
