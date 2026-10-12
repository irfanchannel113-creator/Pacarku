/*
 * ==========================================================
 *  ISI KONTEN WEBSITE DI SINI
 *  Cukup ubah teks di file ini; tampilan akan menyesuaikan.
 * ==========================================================
 *
 *  Foto: simpan dua versi di folder assets/images/
 *        - full/  : ukuran besar (sisi terpanjang ±1600px), dipakai saat foto dibuka
 *        - thumb/ : ukuran kecil (±760px), dipakai di grid galeri
 *        `dimensi` = [lebar, tinggi] foto, supaya tata letak tidak melompat saat dimuat.
 *
 *  Puisi: tulis setiap baris sebagai satu item di dalam `baris`.
 *         Gunakan "" (string kosong) untuk jeda antarbait.
 *
 *  Bagian yang dikosongkan (misalnya momen: []) otomatis disembunyikan.
 */

window.SITE_DATA = {
  // ---------- Bagian pembuka (hero) ----------
  hero: {
    kecil: "untukmu, di purnama kesembilan",
    judul: "Pacarku",
    subjudul: "Kumpulan kata dan potongan kenangan yang tak ingin kulupa.",
    foto: "assets/images/full/taman-bunga.jpg"
  },

  // ---------- Kutipan pembuka ----------
  pembuka: {
    kutipan:
      "Sembilan bulan mungkin terdengar singkat, tapi cukup untuk membuatku yakin bahwa ke mana pun aku pergi, pulangku adalah kamu.",
    penulis: ""
  },

  // ---------- Puisi ----------
  puisi: [
    {
      judul: "Sembilan Purnama",
      tanggal: "",
      foto: "assets/images/full/prambanan-berdua.jpg",
      baris: [
        "Sembilan purnama telah anggun kita eja,",
        "Melukis asmara pada kanvas cakrawala,",
        "Terima kasih telah sudi menjadi pelita,",
        "Menemani jiwaku mengarungi semesta.",
        "",
        "Kau dekap erat segala rapuh di raga,",
        "Menghapus lara dengan setitik asa,",
        "Sembilan bulan kau rajut untaian makna,",
        "Meneduhkan kalbu yang sempat dahaga.",
        "",
        "Kini kurapalkan doa pada Sang Pencipta,",
        "Biar cinta ini tak sekadar di waktu yang fana,",
        "Namun hingga napas tiba di penghujung masa,",
        "Genggam tanganku, menepilah bersamaku selamanya."
      ]
    }
  ],

  // ---------- Galeri foto ----------
  galeri: [
    { src: "assets/images/full/taman-bunga.jpg", thumb: "assets/images/thumb/taman-bunga.jpg", dimensi: [1200, 800], keterangan: "Di antara bunga-bunga, kamu tetap yang paling cantik" },
    { src: "assets/images/full/prambanan-menoleh.jpg", thumb: "assets/images/thumb/prambanan-menoleh.jpg", dimensi: [1200, 1600], keterangan: "Senyum yang menoleh di Prambanan" },
    { src: "assets/images/full/selfie-biru.jpg", thumb: "assets/images/thumb/selfie-biru.jpg", dimensi: [1440, 1080], keterangan: "Biru yang paling kusuka" },
    { src: "assets/images/full/cermin-pink.jpg", thumb: "assets/images/thumb/cermin-pink.jpg", dimensi: [1200, 1600], keterangan: "Kita, di balik cermin" },
    { src: "assets/images/full/prambanan-candi.jpg", thumb: "assets/images/thumb/prambanan-candi.jpg", dimensi: [1200, 1600], keterangan: "Sekokoh candi, seanggun senja" },
    { src: "assets/images/full/cahaya-wayang.jpg", thumb: "assets/images/thumb/cahaya-wayang.jpg", dimensi: [900, 1600], keterangan: "Bermandikan cahaya" },
    { src: "assets/images/full/pintu-tua.jpg", thumb: "assets/images/thumb/pintu-tua.jpg", dimensi: [1200, 1600], keterangan: "Di depan pintu tua" },
    { src: "assets/images/full/kota-tua.jpg", thumb: "assets/images/thumb/kota-tua.jpg", dimensi: [900, 1600], keterangan: "Menyusuri kota berdua" },
    { src: "assets/images/full/prambanan-bersandar.jpg", thumb: "assets/images/thumb/prambanan-bersandar.jpg", dimensi: [1200, 1600], keterangan: "Sore yang hangat" },
    { src: "assets/images/full/bawah-pohon.jpg", thumb: "assets/images/thumb/bawah-pohon.jpg", dimensi: [900, 1600], keterangan: "Teduh, seperti kamu" },
    { src: "assets/images/full/cahaya-batik.jpg", thumb: "assets/images/thumb/cahaya-batik.jpg", dimensi: [1200, 1600], keterangan: "Ditimpa cahaya" },
    { src: "assets/images/full/teknik-geologi.jpg", thumb: "assets/images/thumb/teknik-geologi.jpg", dimensi: [901, 1600], keterangan: "Cemberut pun tetap lucu" },
    { src: "assets/images/full/kamar-ungu.jpg", thumb: "assets/images/thumb/kamar-ungu.jpg", dimensi: [901, 1600], keterangan: "Senyum yang selalu kutunggu" },
    { src: "assets/images/full/filter-lucu.jpg", thumb: "assets/images/thumb/filter-lucu.jpg", dimensi: [1600, 1200], keterangan: "Dan yang ini... biar jadi rahasia kita" }
  ],

  // ---------- Momen / linimasa ----------
  // Kosong = bagian Momen disembunyikan. Contoh isi:
  // { tanggal: "12 Januari 2026", judul: "Pertama kali bertemu", cerita: "..." }
  momen: [],

  // ---------- Penutup ----------
  penutup: {
    judul: "Selamat sembilan bulan, sayang.",
    pesan:
      "Terima kasih untuk setiap tawa, sabar, dan peluk yang kau berikan. Semoga purnama-purnama berikutnya tetap kita lalui berdua.",
    tandaTangan: "Dariku, untukmu"
  },

  footer: "Dibuat dengan sepenuh hati · 2026"
};
