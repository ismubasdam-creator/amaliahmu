/* ============================================================
   PANDUAN IBADAH PUBLIK (tanpa login) - AmaliahMu
   Dimuat SETELAH script utama di index.html (lihat langkah 3).
   Memakai: GUIDE, LOGO, CONFIG, TAB, ON, OFF, esc, fmtTgl, today, $ dari index.html
   ============================================================ */
(function () {
  /* ---------- DATA VIDEO (ganti/ tambah di sini saja) ---------- */
  // Format: ["Judul video", "ID file Google Drive"]
  // ID = bagian di antara /d/ dan /view pada link Drive.
  const VID = {
    W: {
      ikon: "💧", nama: "Wudhu", judul: "Panduan Gerakan Wudhu",
      items: [
        ["1. Mencuci tangan sambil membaca Basmalah", "1q7M3vbuYJeKswHeU2PcojhVgiKaHK5bO"],
        ["2. Berkumur", "1vFvmtg1wjixPR4ZGqPnpQtSYV4U4BV7Q"],
        ["3. Membasuh tangan", "1NvYommdk60g6dY_iamfTtLN6G2D3lqCb"],
        ["4. Membasuh kepala sekaligus telinga", "1G1HvxbsjY_ApyOQNlud4gPYOwVRWEztr"],
        ["5. Membasuh kaki", "1lwjWd_se6Y_GBamMyZ24HSoqMakzvXE-"],
        ["6. Doa setelah wudhu", "1LoEkDjbOrAsY2xTCjcZV8zWQZARhyNSv"]
      ]
    },
    S: {
      ikon: "🕌", nama: "Shalat", judul: "Panduan Tata Cara Shalat (Gerakan & Bacaan)",
      items: [
        ["1. Persiapan shalat", "1GTOnU7FxoERFMljVHja9CANe9LFO8cC5"],
        ["2. Takbiratul ihram dan Al-Fatihah", "1n9vh2lR9eGEMjiMbbrrkBFvzy9zM8wVM"],
        ["3. Ruku'", "1D0ejtLZK4DzG7_NRdnBmjJMb7d8QvE_i"],
        ["4. I'tidal", "1qjGHb2O1LurQUsczAYn8a_2-wQJIZvpt"],
        ["5. Sujud", "1ABlsOzFY8urz7weQ5bx0kxjiiFoTeqfG"],
        ["6. Duduk di antara dua sujud", "1SBL_b0HWOAnaM-xUsJtRDltcqRMaSpWj"],
        ["7. Tasyahud awal", "1blSOi6p3K-0VpH4JndigV27wL9QucHdi"],
        ["8. Tasyahud akhir", "1yDNxiddgWuwUjwCWPfj0EPsjMCRHx1Ph"],
        ["9. Salam", "1yO-aoAEAJ96zpoeQf7A4O4egLn3unSiK"]
      ]
    },
    B: {
      ikon: "📖", nama: "Bacaan Shalat", judul: "Bacaan Shalat Saja (tanpa gerakan)",
      items: [
        ["Bacaan shalat lengkap", "1uG-hVggpjjV3h0TR5PYvnTJHW1ly7bQx"]
      ]
    }
  };

  const root = document.getElementById("panduanPublik");
  if (!root) return;

  // ID biasa = Google Drive. Awali dengan "yt:" untuk YouTube, contoh: "yt:dQw4w9WgXcQ"
  const isYT = id => id.startsWith("yt:");
  const prev = id => isYT(id)
    ? "https://www.youtube-nocookie.com/embed/" + id.slice(3) + "?rel=0&playsinline=1&modestbranding=1"
    : "https://drive.google.com/file/d/" + id + "/preview";
  const view = id => isYT(id)
    ? "https://www.youtube.com/watch?v=" + id.slice(3)
    : "https://drive.google.com/file/d/" + id + "/view";
  const st = { tab: "W", cur: 0, play: false };

  /* ---------- TAMPILAN ---------- */
  function tabBtn(k, label) {
    return `<button type="button" onclick="PP.tab('${k}')" class="${TAB}${st.tab === k ? ON : OFF}">${label}</button>`;
  }

  function videoPane() {
    const g = VID[st.tab], it = g.items[st.cur], multi = g.items.length > 1;
    const player = st.play
      ? `<iframe src="${prev(it[1])}" class="w-full h-full" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" title="${esc(it[0])}"></iframe>`
      : `<button type="button" onclick="PP.play()" class="w-full h-full flex flex-col items-center justify-center gap-2 bg-emerald-900 text-white hover:bg-emerald-800">
           <span class="text-5xl">▶</span><span class="text-sm font-semibold px-4 text-center">${esc(it[0])}</span>
           <span class="text-xs opacity-80">Ketuk untuk memutar video</span></button>`;
    const list = g.items.map((x, i) => `<button type="button" onclick="PP.pick(${i})"
        class="text-left rounded-xl border px-3 py-2 text-sm ${i === st.cur ? "bg-emerald-700 text-white border-emerald-700" : "bg-white border-emerald-200 text-emerald-900 hover:bg-emerald-50"}">${esc(x[0])}</button>`).join("");
    return `<h3 class="font-bold text-emerald-900 mb-2">${g.ikon} ${esc(g.judul)}</h3>
      <div class="rounded-xl overflow-hidden border border-emerald-200 bg-black aspect-[4/3] sm:aspect-video">${player}</div>
      <div class="flex items-center justify-between gap-2 mt-2">
        <p class="text-sm font-semibold text-emerald-900 flex-1">${esc(it[0])}</p>
        ${multi ? `<button type="button" onclick="PP.step(-1)" class="px-3 py-1.5 rounded-lg border border-emerald-300 text-xs font-semibold text-emerald-900 ${st.cur === 0 ? "opacity-40" : ""}">◀ Sebelumnya</button>
        <button type="button" onclick="PP.step(1)" class="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold ${st.cur === g.items.length - 1 ? "opacity-40" : ""}">Berikutnya ▶</button>` : ""}
      </div>
      <a href="${view(it[1])}" target="_blank" rel="noopener" class="inline-block text-xs text-emerald-700 underline mt-1">Video tidak tampil? Buka di tab baru</a>
      ${multi ? `<div class="grid sm:grid-cols-2 gap-2 mt-3">${list}</div>` : ""}`;
  }

  function pdfPane() {
    return `<h3 class="font-bold text-emerald-900 mb-2">📄 Unduh PDF Bacaan Ibadah</h3>
      <div class="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm leading-relaxed">
        Berisi bacaan <b>doa setelah wudhu, doa iftitah, ruku' & sujud, i'tidal, duduk antara dua sujud, tasyahud & shalawat, dan doa sebelum salam</b>
        lengkap dengan tulisan Arab, latin, dan artinya sesuai Tarjih Muhammadiyah.
        <div class="mt-3"><button type="button" onclick="PP.pdf()" class="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600">⬇ Unduh PDF Bacaan</button></div>
        <p class="text-xs text-emerald-800/70 mt-3">Setelah ditekan, jendela cetak terbuka. Pilih tujuan <b>"Simpan sebagai PDF"</b> (Save as PDF), lalu klik Simpan.</p>
      </div>`;
  }

  function render() {
    root.innerHTML = `<div class="bg-white rounded-2xl border border-emerald-100 shadow-lg p-5">
      <h2 class="text-xl font-extrabold text-emerald-900">📚 Panduan Ibadah</h2>
      <p class="text-xs text-emerald-700 mb-3">Terbuka untuk semua siswa, orang tua, dan guru. Tidak perlu masuk.</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${tabBtn("W", "💧 Wudhu")}${tabBtn("S", "🕌 Shalat")}${tabBtn("B", "📖 Bacaan Shalat")}${tabBtn("P", "📄 Unduh PDF")}
      </div>
      ${st.tab === "P" ? pdfPane() : videoPane()}
    </div>`;
  }

  /* ---------- PDF (lewat jendela cetak agar huruf Arab tampil benar) ---------- */
  function cetakPdf() {
    const items = GUIDE.map(g => `<div style="border:1px solid #9bc9ab;border-radius:6px;padding:8px 12px;margin-bottom:8px;break-inside:avoid;page-break-inside:avoid">
        <div style="font-weight:bold;font-size:13px;color:#166534;margin-bottom:4px">${esc(g[0])}</div>
        <div style="direction:rtl;text-align:right;font-family:'Amiri','Traditional Arabic',serif;font-size:20px;line-height:2">${g[1]}</div>
        <div style="font-size:11.5px;font-style:italic;color:#14532d;margin-top:3px">${esc(g[2])}</div>
        <div style="font-size:11.5px;margin-top:3px"><b>Artinya:</b> ${esc(g[3])}</div>
      </div>`).join("");
    document.getElementById("cert").innerHTML = `<div style="padding:4px 8px">
      <div style="display:flex;align-items:center;gap:12px;border-bottom:3px solid #166534;padding-bottom:6px;margin-bottom:8px">
        <img src="${LOGO}" style="width:58px;height:58px;object-fit:contain" alt="">
        <div style="flex:1;text-align:center"><div style="font-size:16px;font-weight:bold;color:#166534">${CONFIG.sekolah}</div><div style="font-size:10px">${CONFIG.alamat}</div></div>
        <div style="width:58px"></div></div>
      <div style="text-align:center;margin-bottom:10px"><div style="font-size:15px;font-weight:bold">PANDUAN BACAAN WUDHU DAN SHALAT</div>
        <div style="font-size:11px">Menurut Tuntunan Tarjih Muhammadiyah - Mata Pelajaran ISMUBA</div></div>
      ${items}
      <div style="font-size:10px;text-align:right;margin-top:6px">Diunduh ${fmtTgl(today())}</div></div>`;
    setTimeout(() => window.print(), 200);
  }

  /* ---------- AKSI (dipanggil dari tombol) ---------- */
  window.PP = {
    tab(k) { st.tab = k; st.cur = 0; st.play = false; render(); },
    pick(i) { st.cur = i; st.play = true; render(); },
    play() { st.play = true; render(); },
    step(d) {
      const n = VID[st.tab].items.length, j = st.cur + d;
      if (j < 0 || j >= n) return;
      st.cur = j; st.play = true; render();
    },
    pdf: cetakPdf
  };

  render();
})();
