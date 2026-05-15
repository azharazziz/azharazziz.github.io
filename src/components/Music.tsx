import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Disc3, ExternalLink, Play, Search, X, RefreshCw, AlertTriangle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getPlaylistTracks, type Track } from "@/lib/youtube.functions";

const accents = ["#e8a87c", "#c44569", "#0d9488", "#f8c8d8", "#14b8a6", "#7dd3fc"];

export function Music() {
  const t = useT();
  const fetchTracks = useServerFn(getPlaylistTracks);
  const query = useQuery({
    queryKey: ["youtube-playlist"],
    queryFn: () => fetchTracks(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Track | null>(null);

  const tracks: Track[] = query.data?.ok ? query.data.tracks : [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tracks;
    return tracks.filter(
      (tr) =>
        tr.title.toLowerCase().includes(q) ||
        tr.artist.toLowerCase().includes(q),
    );
  }, [tracks, search]);

  // close modal on Escape
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  const playlistUrl = query.data?.ok
    ? `https://music.youtube.com/playlist?list=${query.data.playlistId}`
    : "https://music.youtube.com";

  return (
    <section id="music" className="relative surface-dark py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-glow">
              {t("music.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              <span className="text-white/40">$</span> {t("music.title_a")}{" "}
              <span className="gradient-text">{t("music.title_b")}</span>
            </h2>
            <p className="mt-4 font-prose text-white/70">
              {t("music.intro")}{" "}
              <a
                href={playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-glow underline-offset-4 hover:underline"
              >
                {t("music.intro_link")}
              </a>
              .
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-white/60 backdrop-blur">
            <Disc3
              className="h-4 w-4 animate-spin text-primary-glow"
              style={{ animationDuration: "4s" }}
            />
            <span>{t("music.rpm")}</span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-10 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur max-w-md">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("music.searchPlaceholder")}
            className="w-full bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-white/40 hover:text-white/80"
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Body states */}
        <div className="mt-12">
          {query.isLoading ? (
            <SkeletonGrid label={t("music.loading")} />
          ) : query.data && !query.data.ok ? (
            <ErrorState
              title={t("music.errorTitle")}
              detail={query.data.error}
              retryLabel={t("music.retry")}
              onRetry={() => query.refetch()}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              label={tracks.length === 0 ? t("music.emptyAll") : t("music.empty")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((track, i) => (
                <VinylCard
                  key={track.id}
                  track={track}
                  index={i}
                  accent={accents[i % accents.length]}
                  onPlay={() => setActive(track)}
                  playLabel={t("music.play")}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer ticket */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-white/15 bg-black/40 px-6 py-4 font-mono text-xs text-white/50 backdrop-blur sm:flex-row sm:items-center">
          <span>
            <span className="text-primary-glow">▸</span> {tracks.length}{" "}
            {t("music.countSuffix")}
          </span>
          <a
            href={playlistUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-primary-glow hover:underline"
          >
            {t("music.openFull")} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Preview modal */}
      {active && (
        <PreviewModal
          track={active}
          onClose={() => setActive(null)}
          closeLabel={t("music.closePreview")}
          ytLabel={t("music.openYouTube")}
          ytmLabel={t("music.openYTMusic")}
        />
      )}

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .vinyl-disc {
          background:
            repeating-radial-gradient(circle at center,
              rgba(255,255,255,0.04) 0px,
              rgba(255,255,255,0.04) 1px,
              rgba(0,0,0,0.9) 2px,
              rgba(0,0,0,0.9) 3px),
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 50%),
            #0a0a0a;
        }
        .vinyl-card:hover .vinyl-sleeve {
          transform: translateX(-22%) rotate(-3deg);
        }
        .vinyl-card:hover .vinyl-record {
          transform: translateX(28%) rotate(180deg);
          animation: spin-slow 6s linear infinite;
        }
        .vinyl-card:hover .vinyl-play {
          opacity: 1;
          transform: scale(1);
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 100%);
          background-size: 800px 100%;
          animation: shimmer 1.6s linear infinite;
        }
      `}</style>
    </section>
  );
}

function VinylCard({
  track,
  index,
  accent,
  onPlay,
  playLabel,
}: {
  track: Track;
  index: number;
  accent: string;
  onPlay: () => void;
  playLabel: string;
}) {
  const tilt = [-2, 1.5, -1, 2, -1.5, 1][index % 6];
  const fallback = track.thumbnail || `https://i.ytimg.com/vi/${track.videoId}/hqdefault.jpg`;
  const year = track.publishedAt ? new Date(track.publishedAt).getFullYear() : "—";

  return (
    <div className="vinyl-card group block" style={{ transform: `rotate(${tilt}deg)` }}>
      <button
        type="button"
        onClick={onPlay}
        className="relative block aspect-square w-full text-left"
        aria-label={playLabel}
      >
        {/* vinyl record */}
        <div
          className="vinyl-record absolute inset-0 rounded-full vinyl-disc transition-transform duration-700 ease-out shadow-2xl"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-inner"
            style={{ background: accent }}
          >
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>

        {/* sleeve */}
        <div className="vinyl-sleeve absolute inset-0 overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out">
          <img
            src={fallback}
            alt={`${track.title} — ${track.artist}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const el = e.currentTarget;
              if (el.src.includes("maxres")) el.src = `https://i.ytimg.com/vi/${track.videoId}/hqdefault.jpg`;
            }}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/30" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent" />

          <div className="vinyl-play absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300">
            <span className="grid h-14 w-14 scale-90 place-items-center rounded-full bg-white text-black shadow-xl">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
          </div>
        </div>
      </button>

      <div className="relative z-10 mt-5 -rotate-[0.5deg]">
        <div className="inline-block rounded-sm border border-white/10 bg-black/60 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-white/50 backdrop-blur">
          #{String(index + 1).padStart(2, "0")} · {year}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white line-clamp-2">
          {track.title}
        </h3>
        <p className="font-mono text-xs text-white/50 line-clamp-1">— {track.artist}</p>
      </div>
    </div>
  );
}

function SkeletonGrid({ label }: { label: string }) {
  return (
    <div>
      <p className="mb-6 font-mono text-xs text-white/50">{label}</p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1][i % 6]}deg)` }}>
            <div className="skeleton aspect-square rounded-sm" />
            <div className="mt-5 space-y-2">
              <div className="skeleton h-5 w-20 rounded-sm" />
              <div className="skeleton h-5 w-3/4 rounded-sm" />
              <div className="skeleton h-3 w-1/2 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-black/30 px-6 py-20 text-center">
      <Disc3 className="h-10 w-10 text-white/30" />
      <p className="font-mono text-sm text-white/60">{label}</p>
    </div>
  );
}

function ErrorState({
  title,
  detail,
  retryLabel,
  onRetry,
}: {
  title: string;
  detail: string;
  retryLabel: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 px-6 py-16 text-center">
      <AlertTriangle className="h-10 w-10 text-red-400" />
      <div>
        <p className="font-display text-lg font-bold text-white">{title}</p>
        <p className="mt-1 max-w-md font-mono text-xs text-white/60">{detail}</p>
      </div>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-white hover:bg-white/10"
      >
        <RefreshCw className="h-3 w-3" /> {retryLabel}
      </button>
    </div>
  );
}

function PreviewModal({
  track,
  onClose,
  closeLabel,
  ytLabel,
  ytmLabel,
}: {
  track: Track;
  onClose: () => void;
  closeLabel: string;
  ytLabel: string;
  ytmLabel: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white/80 hover:bg-black hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="aspect-video w-full bg-black">
          <iframe
            src={`${track.embedUrl}?autoplay=1&rel=0`}
            title={`${track.title} — ${track.artist}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold text-white">{track.title}</h3>
            <p className="truncate font-mono text-xs text-white/60">— {track.artist}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={track.ytMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              {ytmLabel} <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={track.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
            >
              {ytLabel} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
