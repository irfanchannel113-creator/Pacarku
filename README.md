# Pacarku

Website satu halaman berisi puisi dan foto, dengan animasi.

## Cara melihat
Buka `index.html` langsung di browser (tidak perlu server).

## Cara mengisi konten
Semua teks diatur di `assets/js/data.js`:

- **hero**: judul besar, teks kecil, subjudul, foto latar (opsional)
- **pembuka**: kutipan pembuka
- **puisi**: daftar puisi; setiap baris jadi satu item, `""` untuk jeda antarbait
- **galeri**: daftar foto; `ukuran` bisa `normal`, `tinggi`, atau `lebar`
- **momen**: linimasa kenangan
- **penutup**: pesan akhir dan tanda tangan

Simpan foto di `assets/images/`, lalu isi `src`, misalnya `"assets/images/foto1.jpg"`.

Warna utama bisa diubah di bagian `:root` pada `assets/css/style.css`.

## Struktur
```
index.html
assets/
  css/style.css
  js/data.js   <- konten
  js/main.js   <- animasi & logika
  images/      <- foto
```
