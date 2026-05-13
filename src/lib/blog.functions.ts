import { createServerFn } from "@tanstack/react-start";

export type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  categories: string[];
};

const FEED_URL = "https://blog.azharazziz.my.id/feed/";

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ");
}

function pick(block: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? decode(m[1]).trim() : "";
}

function pickAll(block: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) out.push(decode(m[1]).trim());
  return out;
}

export const getBlogPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: BlogPost[]; error: string | null }> => {
    try {
      const res = await fetch(FEED_URL, {
        headers: { "User-Agent": "Mozilla/5.0 PortfolioBot" },
      });
      if (!res.ok) {
        return { posts: [], error: `Feed unavailable (${res.status})` };
      }
      const xml = await res.text();
      const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

      const posts: BlogPost[] = items.slice(0, 9).map((block) => {
        const description = pick(block, "description");
        const excerpt = description
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 180);
        return {
          title: pick(block, "title"),
          link: pick(block, "link"),
          pubDate: pick(block, "pubDate"),
          excerpt,
          categories: pickAll(block, "category"),
        };
      });

      return { posts, error: null };
    } catch (e) {
      console.error("RSS fetch failed:", e);
      return { posts: [], error: "Could not load blog posts" };
    }
  },
);
