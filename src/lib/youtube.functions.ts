import { createServerFn } from "@tanstack/react-start";

export type Track = {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  description: string;
  thumbnail: string;
  publishedAt: string | null;
  position: number;
  youtubeUrl: string;
  ytMusicUrl: string;
  embedUrl: string;
};

export type PlaylistResponse = {
  ok: true;
  playlistId: string;
  tracks: Track[];
  fetchedAt: number;
} | {
  ok: false;
  error: string;
  code?: string;
};

// in-memory cache (per worker instance)
let cache: { data: PlaylistResponse; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function pickThumbnail(thumbnails: Record<string, { url: string }> | undefined): string {
  if (!thumbnails) return "";
  return (
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url ||
    ""
  );
}

// Many YT Music tracks come as "Artist - Title" or "Title (Official Video)" etc.
// Best-effort split into artist + clean title.
function splitTitle(rawTitle: string, channel: string): { title: string; artist: string } {
  const cleaned = rawTitle
    .replace(/\s*[\(\[][^)\]]*(official|video|audio|lyric|mv|hd|4k)[^)\]]*[\)\]]\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const dashMatch = cleaned.match(/^(.+?)\s+[-–—]\s+(.+)$/);
  if (dashMatch) {
    return { artist: dashMatch[1].trim(), title: dashMatch[2].trim() };
  }
  // fall back to channel name with " - Topic" suffix stripped
  const artist = channel.replace(/\s*-\s*Topic\s*$/i, "").trim();
  return { title: cleaned, artist };
}

export const getPlaylistTracks = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlaylistResponse> => {
    // serve cache if fresh
    if (cache && cache.expiresAt > Date.now()) {
      return cache.data;
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

    if (!apiKey) {
      return { ok: false, error: "YOUTUBE_API_KEY is not configured.", code: "missing_key" };
    }
    if (!playlistId) {
      return { ok: false, error: "YOUTUBE_PLAYLIST_ID is not configured.", code: "missing_playlist" };
    }

    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", apiKey);

    try {
      const res = await fetch(url.toString());
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        const data = (() => { try { return JSON.parse(body); } catch { return null; } })();
        const reason = data?.error?.errors?.[0]?.reason || data?.error?.message || `HTTP ${res.status}`;
        const friendly =
          reason === "playlistNotFound"
            ? "Playlist tidak ditemukan. Catatan: playlist auto-generated YT Music (ID diawali LR/RD/LM) tidak bisa dibaca via API. Buat playlist manual yang ID-nya diawali 'PL'."
            : `YouTube API error: ${reason}`;
        const fail: PlaylistResponse = { ok: false, error: friendly, code: reason };
        cache = { data: fail, expiresAt: Date.now() + 5 * 60 * 1000 }; // short cache on error
        return fail;
      }

      const json = await res.json();
      const items: any[] = Array.isArray(json.items) ? json.items : [];

      const tracks: Track[] = items
        .filter((it) => it?.snippet?.resourceId?.videoId && it?.snippet?.title !== "Deleted video" && it?.snippet?.title !== "Private video")
        .map((it, idx) => {
          const sn = it.snippet;
          const videoId: string = sn.resourceId.videoId;
          const channel: string = sn.videoOwnerChannelTitle || sn.channelTitle || "";
          const { title, artist } = splitTitle(sn.title || "Untitled", channel);
          return {
            id: it.id || videoId,
            videoId,
            title,
            artist: artist || "Unknown artist",
            description: (sn.description || "").slice(0, 240),
            thumbnail: pickThumbnail(sn.thumbnails),
            publishedAt: sn.publishedAt || it.contentDetails?.videoPublishedAt || null,
            position: typeof sn.position === "number" ? sn.position : idx,
            youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
            ytMusicUrl: `https://music.youtube.com/watch?v=${videoId}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
          };
        });

      const ok: PlaylistResponse = {
        ok: true,
        playlistId,
        tracks,
        fetchedAt: Date.now(),
      };
      cache = { data: ok, expiresAt: Date.now() + CACHE_TTL_MS };
      return ok;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return { ok: false, error: `Network error: ${msg}`, code: "network" };
    }
  }
);
