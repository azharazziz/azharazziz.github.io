import { Music2, ExternalLink } from "lucide-react";

// YouTube/YT Music playlist ID. YT Music shares playlist IDs with YouTube,
// so the standard YouTube embed works. Replace with your own playlist ID.
const PLAYLIST_ID = "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI";
const PLAYLIST_URL = `https://music.youtube.com/playlist?list=${PLAYLIST_ID}`;
const EMBED_URL = `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&modestbranding=1`;

export function Music() {
  return (
    <section id="music" className="relative surface-dark py-32">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-glow">
            06 — /music
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            <span className="text-white/40">$</span> cat{" "}
            <span className="gradient-text">~/.now_playing.log</span>
          </h2>
          <p className="mt-4 font-prose text-white/70">
            The soundtrack while I ship code. Streaming live from my YouTube
            Music playlist — open it in your own player or just let it run.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
          {/* terminal title bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <span className="font-mono text-[11px] text-white/40">
              azhar@portfolio: ~/music
            </span>
            <span className="font-mono text-[11px] text-white/40">player</span>
          </div>

          {/* now-playing strip */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                <Music2 className="h-5 w-5" />
              </span>
              <div className="font-mono text-xs">
                <div className="text-white/50">
                  <span className="text-primary-glow">▸</span> streaming from
                  YouTube Music
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-white/30">
                  status:{" "}
                  <span className="text-green-400">● live</span>
                </div>
              </div>
            </div>

            {/* equalizer bars */}
            <div className="flex items-end gap-1" aria-hidden="true">
              {[0.6, 1, 0.4, 0.85, 0.5, 0.95, 0.7].map((delay, i) => (
                <span
                  key={i}
                  className="block w-1 rounded-sm bg-gradient-to-t from-primary to-primary-glow eq-bar"
                  style={{
                    animationDelay: `${delay}s`,
                    height: `${12 + i * 2}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* embed */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={EMBED_URL}
              title="Azhar Azziz — YouTube Music playlist"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* footer */}
          <div className="flex flex-col gap-2 border-t border-white/10 bg-white/5 px-6 py-3 font-mono text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="text-primary-glow">▸</span> press play, or
              shuffle the queue
            </span>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-primary-glow hover:underline"
            >
              open in YT Music <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes eq {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .eq-bar {
          transform-origin: bottom;
          animation: eq 0.9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
