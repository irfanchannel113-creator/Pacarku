# Pacarku

Website satu halaman berisi puisi dan foto, dengan animasi.

## Cara melihat
Buka `index.html` langsung di browser (tidak perlu server).

## Cara mengisi konten
Semua teks diatur di `assets/js/data.js`:

- **hero**: judul besar, teks kecil, subjudul, foto latar (opsional)
- **pembuka**: kutipan pembuka
- **puisi**: daftar puisi; setiap baris jadi satu item, `""` untuk jeda antarbait
- **galeri**: daftar foto (`src` versi besar, `thumb` versi kecil, `dimensi` = [lebar, tinggi])
- **momen**: linimasa kenangan (kosongkan `[]` untuk menyembunyikan)
- **penutup**: pesan akhir dan tanda tangan

Simpan foto di `assets/images/full/` (sisi terpanjang ±1600px) dan `assets/images/thumb/` (±760px).
Jangan unggah foto asli dari HP yang berukuran beberapa MB karena halaman akan lambat dibuka.

Warna utama bisa diubah di bagian `:root` pada `assets/css/style.css`.

## Struktur
```
index.html
assets/
  css/style.css
  js/data.js   <- konten
  js/main.js   <- animasi & logika
  images/full/  <- foto ukuran besar
  images/thumb/ <- foto ukuran kecil
```
