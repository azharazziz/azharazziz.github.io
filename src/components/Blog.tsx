import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Rss, Calendar, Loader2 } from "lucide-react";
import { getBlogPosts, type BlogPost } from "@/lib/blog.functions";

function formatDate(d: string) {
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Blog() {
  const fetchPosts = useServerFn(getBlogPosts);
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPosts(),
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section id="blog" className="relative py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              04 — Writing
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              <span className="text-muted-foreground">$</span> cat{" "}
              <span className="gradient-text">~/blog/*.md</span>
            </h2>
            <p className="mt-4 font-mono text-sm text-muted-foreground">
              Latest posts streamed from{" "}
              <span className="text-primary">blog.azharazziz.my.id</span> via RSS.
            </p>
          </div>

          <a
            href="https://blog.azharazziz.my.id/feed/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-mono text-xs transition-all hover:border-primary hover:text-primary"
          >
            <Rss className="h-4 w-4" />
            subscribe.rss
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-12">
          {isLoading && (
            <div className="flex items-center justify-center py-20 font-mono text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              fetching feed...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 font-mono text-sm text-destructive">
              ✗ Error loading blog feed.
            </div>
          )}

          {data?.posts && data.posts.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.posts.map((post, i) => (
                <PostCard key={post.link} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:card-shadow"
    >
      {/* terminal header */}
      <div className="mb-4 flex items-center justify-between border-b border-dashed border-border pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
          <span className="ml-2 font-mono text-[10px] text-muted-foreground">
            post_{String(index + 1).padStart(2, "0")}.md
          </span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {formatDate(post.pubDate)}
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
        {post.title}
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
        {post.excerpt}
      </p>

      {post.categories.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-secondary-foreground"
            >
              #{c.toLowerCase().replace(/\s+/g, "-")}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
