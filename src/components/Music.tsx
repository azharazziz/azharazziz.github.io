import { Disc3, ExternalLink, Play } from "lucide-react";

// Edit this list with your own picks. Cover URLs can be any image — YT Music
// album art, Last.fm, or your own uploads. Sizes around 300x300 work best.
type Album = {
  title: string;
  artist: string;
  year: string;
  cover: string;
  link: string;
  accent: string; // vinyl label color (CSS color)
};

const PLAYLIST_URL =
  "https://music.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI";

const albums: Album[] = [
  {
    title: "Currents",
    artist: "Tame Impala",
    year: "2015",
    cover: "https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png",
    link: "https://music.youtube.com/search?q=Tame+Impala+Currents",
    accent: "#e8a87c",
  },
  {
    title: "In Rainbows",
    artist: "Radiohead",
    year: "2007",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a8/In_Rainbows_Official_Cover.png",
    link: "https://music.youtube.com/search?q=Radiohead+In+Rainbows",
    accent: "#c44569",
  },
  {
    title: "Random Access Memories",
    artist: "Daft Punk",
    year: "2013",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    link: "https://music.youtube.com/search?q=Daft+Punk+Random+Access+Memories",
    accent: "#0d9488",
  },
  {
    title: "Blonde",
    artist: "Frank Ocean",
    year: "2016",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg",
    link: "https://music.youtube.com/search?q=Frank+Ocean+Blonde",
    accent: "#f8c8d8",
  },
  {
    title: "Hours, Days, Months, Years",
    artist: "Pamungkas",
    year: "2019",
    cover: "https://upload.wikimedia.org/wikipedia/id/3/30/Hours%2C_Days%2C_Months%2C_Years_album_cover.jpg",
    link: "https://music.youtube.com/search?q=Pamungkas+Hours+Days+Months+Years",
    accent: "#14b8a6",
  },
  {
    title: "Nurture",
    artist: "Porter Robinson",
    year: "2021",
    cover: "https://upload.wikimedia.org/wikipedia/en/0/0e/Porter_Robinson_-_Nurture.png",
    link: "https://music.youtube.com/search?q=Porter+Robinson+Nurture",
    accent: "#7dd3fc",
  },
];

export function Music() {
  return (
    <section id="music" className="relative surface-dark py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      {/* warm vignette glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-glow">
              06 — /music
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              <span className="text-white/40">$</span> ls{" "}
              <span className="gradient-text">~/vinyl/*.wav</span>
            </h2>
            <p className="mt-4 font-prose text-white/70">
              The crate I keep coming back to — what's spinning while I push commits.
              Hand-picked from{" "}
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noreferrer"
                className="text-primary-glow underline-offset-4 hover:underline"
              >
                my YouTube Music rotation
              </a>
              .
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-white/60 backdrop-blur">
            <Disc3 className="h-4 w-4 animate-spin text-primary-glow" style={{ animationDuration: "4s" }} />
            <span>33⅓ rpm · side A</span>
          </div>
        </div>

        {/* vinyl crate */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, i) => (
            <VinylCard key={album.title} album={album} index={i} />
          ))}
        </div>

        {/* footer ticket */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-white/15 bg-black/40 px-6 py-4 font-mono text-xs text-white/50 backdrop-blur sm:flex-row sm:items-center">
          <span>
            <span className="text-primary-glow">▸</span> {albums.length} records on the shelf · curated by hand · updated occasionally
          </span>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-primary-glow hover:underline"
          >
            open full playlist <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

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
      `}</style>
    </section>
  );
}

function VinylCard({ album, index }: { album: Album; index: number }) {
  // staggered tilt for stack feel
  const tilt = [-2, 1.5, -1, 2, -1.5, 1][index % 6];

  return (
    <a
      href={album.link}
      target="_blank"
      rel="noreferrer"
      className="vinyl-card group block"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative aspect-square">
        {/* vinyl record (peeks out on hover) */}
        <div
          className="vinyl-record absolute inset-0 rounded-full vinyl-disc transition-transform duration-700 ease-out shadow-2xl"
          aria-hidden="true"
        >
          {/* center label */}
          <div
            className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-inner"
            style={{ background: album.accent }}
          >
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          </div>
          {/* light reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>

        {/* album sleeve */}
        <div className="vinyl-sleeve absolute inset-0 overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out">
          <img
            src={album.cover}
            alt={`${album.title} by ${album.artist} — album cover`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {/* sleeve inner shadow + worn edge */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/30" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent" />

          {/* play button overlay */}
          <div className="vinyl-play absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300">
            <span className="grid h-14 w-14 scale-90 place-items-center rounded-full bg-white text-black shadow-xl">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
          </div>
        </div>
      </div>

      {/* meta tag — looks like a sleeve sticker */}
      <div className="relative z-10 mt-5 -rotate-[0.5deg]">
        <div className="inline-block rounded-sm border border-white/10 bg-black/60 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-white/50 backdrop-blur">
          #{String(index + 1).padStart(2, "0")} · {album.year}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white">
          {album.title}
        </h3>
        <p className="font-mono text-xs text-white/50">— {album.artist}</p>
      </div>
    </a>
  );
}
