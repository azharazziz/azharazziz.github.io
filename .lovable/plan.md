## 1. Music Section — `src/components/Music.tsx`

New section between `Now` and `FAQ`, styled like a media player terminal window (`~/spotify $ now-playing`):

- Terminal title bar (traffic-light dots) konsisten dengan section lain
- Header: `06 — /music` + heading `$ cat ~/.now_playing.log`
- Card berisi `<iframe>` YouTube Music playlist (responsive 16:9 / fixed height ~480px)
- Side panel kecil: equalizer bars animasi (CSS keyframes) + caption "streaming from YouTube Music"
- Link "open in YT Music ↗" di footer card

**Catatan**: YouTube Music tidak resmi mendukung embed publik — embed iframe-nya seringkali diblok. Saya akan pakai pendekatan dual:
- Primary: embed `https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID` (works untuk playlist YouTube biasa yang juga muncul di YT Music)
- Fallback card dengan tombol "Open Playlist" jika user belum kasih playlist ID

**Action needed**: Kirim URL playlist YT Music kamu (atau aku pakai placeholder playlist ID dulu yang gampang kamu ganti di file `Music.tsx`).

## 2. Navbar update — `src/components/Navbar.tsx`

Tambah `"music"` ke array links (antara `now` dan `faq`).

## 3. SEO — Meta tags & JSON-LD

### `src/routes/__root.tsx`
- Tambah meta: `og:site_name`, `og:locale` (id_ID), `theme-color`, `robots: index,follow`
- Tambah JSON-LD `Person` schema (Azhar Azziz — jobTitle, url, sameAs: GitHub/LinkedIn/Blog)
- Tambah JSON-LD `WebSite` schema dengan `potentialAction` SearchAction

### `src/routes/index.tsx`
- Perluas meta saat ini: tambah `keywords`, `author`, `og:url`, `twitter:title`, `twitter:description`, `twitter:creator`
- Tambah `<link rel="canonical">` (relative `/`)
- Tambah JSON-LD `FAQPage` (mapping dari data FAQ component) — pindah data FAQ ke file shared `src/lib/faq-data.ts` agar bisa dipakai di route head() dan komponen
- Tambah JSON-LD `ProfilePage` + `BreadcrumbList`

### `src/lib/faq-data.ts` (baru)
Export array Q&A (sebelumnya inline di `FAQ.tsx`) supaya bisa di-import oleh route untuk schema dan komponen.

### `src/components/FAQ.tsx`
Refactor: import data dari `faq-data.ts` (presentasi tidak berubah).

## 4. Verification

- Build & cek tidak ada error
- View source untuk konfirmasi meta + JSON-LD ter-render di SSR
- Quick visual check Music section di viewport mobile (420px) — iframe responsive

## Technical notes

- Semua tetap frontend-only, tidak perlu API key
- Gunakan font/token existing (JetBrains Mono, surface-dark, gradient-text) untuk konsistensi visual
- JSON-LD via `scripts: [{ type: "application/ld+json", children: JSON.stringify(...) }]` di `head()`
- URL canonical pakai path relatif (project belum punya custom domain stabil)
