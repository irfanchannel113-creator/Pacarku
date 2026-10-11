/*
 * ==========================================================
 *  ISI KONTEN WEBSITE DI SINI
 *  Cukup ubah teks di file ini; tampilan akan menyesuaikan.
 * ==========================================================
 *
 *  Foto: simpan file di folder  assets/images/
 *        lalu tulis path-nya, misalnya "assets/images/foto1.jpg".
 *        Jika `src` dikosongkan (""), akan tampil placeholder.
 *
 *  Puisi: tulis setiap baris sebagai satu item di dalam `baris`.
 *         Gunakan "" (string kosong) untuk jeda antarbait.
 */

window.SITE_DATA = {
  // ---------- Bagian pembuka (hero) ----------
  hero: {
    kecil: "untukmu, yang selalu",
    judul: "Pacarku",
    subjudul: "Kumpulan puisi dan potongan kenangan yang tak ingin kulupa.",
    foto: "" // opsional: foto latar hero, contoh "assets/images/hero.jpg"
  },

  // ---------- Kutipan pembuka ----------
  pembuka: {
    kutipan:
      "Ada hal-hal yang tak sanggup kuucapkan, maka kutuliskan. Ada hal-hal yang tak sanggup kutuliskan, maka kusimpan dalam gambar.",
    penulis: "— Nama Kamu"
  },

  // ---------- Puisi ----------
  puisi: [
    {
      judul: "Judul Puisi Pertama",
      tanggal: "Januari 2026",
      baris: [
        "Baris pertama puisi ditulis di sini,",
        "baris kedua menyusul perlahan,",
        "",
        "bait kedua dimulai setelah baris kosong,",
        "dan berakhir di sini."
      ]
    },
    {
      judul: "Judul Puisi Kedua",
      tanggal: "Februari 2026",
      baris: [
        "Contoh baris puisi,",
        "yang nanti diganti",
        "dengan tulisanmu sendiri."
      ]
    },
    {
      judul: "Judul Puisi Ketiga",
      tanggal: "Maret 2026",
      baris: [
        "Satu puisi lagi",
        "sebagai contoh tata letak,",
        "",
        "tambahkan atau hapus",
        "sesuai kebutuhan."
      ]
    }
  ],

  // ---------- Galeri foto ----------
  // ukuran: "normal" | "tinggi" | "lebar"  (mengatur bentuk kotak di grid)
  galeri: [
    { src: "", keterangan: "Keterangan foto 1", ukuran: "tinggi" },
    { src: "", keterangan: "Keterangan foto 2", ukuran: "normal" },
    { src: "", keterangan: "Keterangan foto 3", ukuran: "normal" },
    { src: "", keterangan: "Keterangan foto 4", ukuran: "lebar" },
    { src: "", keterangan: "Keterangan foto 5", ukuran: "normal" },
    { src: "", keterangan: "Keterangan foto 6", ukuran: "tinggi" },
    { src: "", keterangan: "Keterangan foto 7", ukuran: "normal" },
    { src: "", keterangan: "Keterangan foto 8", ukuran: "normal" }
  ],

  // ---------- Momen / linimasa ----------
  momen: [
    { tanggal: "00 Bulan 2025", judul: "Pertama kali bertemu", cerita: "Ceritakan singkat momen ini." },
    { tanggal: "00 Bulan 2025", judul: "Kencan pertama", cerita: "Ceritakan singkat momen ini." },
    { tanggal: "00 Bulan 2026", judul: "Hari ini", cerita: "Dan cerita kita masih terus berjalan." }
  ],

  // ---------- Penutup ----------
  penutup: {
    judul: "Terima kasih telah menjadi rumah.",
    pesan:
      "Tulis pesan penutup di sini. Paragraf ini akan muncul di bagian akhir halaman, sebelum footer.",
    tandaTangan: "Dengan sepenuh hati, Nama Kamu"
  },

  footer: "Dibuat dengan sepenuh hati · 2026"
};
