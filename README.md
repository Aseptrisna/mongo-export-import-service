
# Mongo Export & Import Service

**Mongo Export & Import Service** adalah alat berbasis Node.js untuk memudahkan proses ekspor dan impor data MongoDB dalam format JSON. Alat ini cocok untuk keperluan backup, migrasi data, atau pemulihan data.

---

## **Fitur**
- Mengekspor semua koleksi dalam MongoDB ke file JSON.
- Mengimpor data JSON ke MongoDB.
- Direktori backup otomatis berdasarkan tanggal (`backup/YYYY-MM-DD`).
- Menghapus data lama sebelum memasukkan data baru.
- Menghapus field `_id` secara otomatis saat impor.

---

## **Prasyarat**
1. **Node.js** (v16 atau lebih baru).
2. **MongoDB** (v4.4 atau lebih baru).
3. **NPM** (sudah termasuk dalam instalasi Node.js).

---

## **Instalasi**
1. Clone repository ini:
   ```bash
   git clone https://github.com/your-username/mongo-export-import-service.git
   ```
2. Masuk ke folder proyek:
   ```bash
   cd mongo-export-import-service
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Buat file `.env` untuk konfigurasi MongoDB:
   ```bash
   touch .env
   ```

---

## **Konfigurasi**
Isi file `.env` dengan konfigurasi berikut:
```env
# URI MongoDB sumber untuk ekspor data
MONGO_EXPORT=mongodb://localhost:27017/nama_database_sumber

# URI MongoDB tujuan untuk impor data
MONGO_IMPORT=mongodb://localhost:27017/nama_database_tujuan
```

---

## **Cara Penggunaan**

### **1. Ekspor Data**
Jalankan perintah berikut untuk mengekspor semua koleksi dari database MongoDB sumber:
```bash
node export.js
```
Hasil ekspor akan disimpan di folder:
```
backup/YYYY-MM-DD/
```

### **2. Impor Data**
Jalankan perintah berikut untuk mengimpor data JSON ke database MongoDB tujuan:
```bash
node import.js
```

---

## **Struktur Folder**
```
mongo-export-import-service/
├── backup/               # Folder penyimpanan hasil ekspor
├── export.js             # Script untuk ekspor data
├── import.js             # Script untuk impor data
├── .env                  # Konfigurasi MongoDB
├── package.json          # Konfigurasi npm
└── README.md             # Dokumentasi
```

---

## **Skrip NPM (Opsional)**
Tambahkan skrip berikut ke dalam file `package.json` untuk mempermudah eksekusi:
```json
"scripts": {
  "export": "node export.js",
  "import": "node import.js"
}
```
Jalankan dengan perintah:
```bash
npm run export
npm run import
```

---

## **Catatan Penting**
- Data di koleksi tujuan akan dihapus sebelum data baru dimasukkan.
- Jika terjadi kesalahan, koneksi MongoDB akan ditutup secara otomatis untuk mencegah kebocoran koneksi.

---

## **Lisensi**
Proyek ini dilisensikan di bawah **ATS License**.
Asep Trisna Setiawan
---
