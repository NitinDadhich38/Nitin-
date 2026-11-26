"use client";

import { useState, useMemo } from "react";
import { Search, Clock, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${p.title} ${p.standfirst} ${p.paragraphs.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, selectedCategory, search]);

  return (
    <div className="not-prose mt-8">
      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                selectedCategory === c
                  ? "bg-pran-ink text-white shadow-sm"
                  : "bg-pran-surface border border-pran-hairline text-pran-muted hover:border-pran-ink/30 hover:text-pran-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pran-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="h-9 w-full rounded-btn border border-pran-hairline bg-pran-surface pl-8 pr-3 text-xs text-pran-ink placeholder:text-pran-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pran-emerald"
          />
        </div>
      </div>

      {/* Editorial Posts Grid */}
      <div className="mt-8 space-y-4">
        {filtered.map((post, idx) => {
          const isExpanded = expandedSlug === post.slug;
          return (
            <article
              key={post.slug}
              id={post.slug}
              className="group rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-8 shadow-card transition-all duration-200 hover:border-pran-emerald/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-pran-emerald">
                    0{idx + 1}
                  </span>
                  <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 font-semibold text-emerald-800 dark:text-emerald-300">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-pran-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.published}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingMinutes} min read
                  </span>
                </div>
              </div>

              <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-pran-ink group-hover:text-pran-emerald transition-colors">
                {post.title}
              </h3>

              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-pran-ink/80 font-medium">
                {post.standfirst}
              </p>

              {/* Collapsed vs Expanded paragraphs */}
              {isExpanded ? (
                <div className="mt-6 space-y-4 border-t border-pran-hairline pt-6 text-sm leading-relaxed text-pran-muted animate-in fade-in">
                  {post.paragraphs.map((para, n) => (
                    <p key={n}>{para}</p>
                  ))}
                  <button
                    onClick={() => setExpandedSlug(null)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pran-emerald hover:underline pt-2"
                  >
                    Collapse article <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-5 flex items-center justify-between border-t border-pran-hairline pt-4">
                  <p className="line-clamp-1 text-xs text-pran-muted">
                    {post.paragraphs[0]}
                  </p>
                  <button
                    onClick={() => setExpandedSlug(post.slug)}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-pran-emerald hover:underline ml-4"
                  >
                    Read full piece <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-pran-hairline bg-pran-surface p-8 text-center text-sm text-pran-muted">
            No articles found matching &quot;{search}&quot;. Try clearing your search query.
          </div>
        )}
      </div>
    </div>
  );
}
