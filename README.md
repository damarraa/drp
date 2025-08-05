# Form Data Produksi - Google Sheets Integration

Aplikasi form mobile-friendly untuk input data produksi harian yang terintegrasi dengan Google Sheets.

## Fitur Utama

- 📱 Desain responsif mobile-first
- ✅ Validasi form real-time
- 🎨 UI modern dengan animasi halus
- 📊 Integrasi Google Sheets
- 🔄 Loading states dan feedback
- 🏭 Khusus untuk data produksi manufacturing

## Struktur Data

### Header Informasi
- **TGL/SHIFT/OP**: Format gabungan tanggal/shift/operator
- **Tanggal**: Input tanggal produksi
- **Shift**: Pilihan shift (1, 2, atau 3)
- **Operator**: Nama operator yang bertugas

### Hasil Produksi (kg)
- **Cap**: Medium dan Small
- **Plug**: Medium dan Small  
- **Assembling**: Medium dan Small

### Pemakaian Material (kg)
- **PP** (Polypropylene)
- **HDPE** (High-Density Polyethylene)
- **MB** (Masterbatch)
- **LDPE** (Low-Density Polyethylene)

### Bon (kg)
- **PP**, **HDPE**, **MB**, **LDPE**

### Material Hilang (kg)
- **Bekuan**
- **Sapuan** 
- **Move Steelmill**

## Petunjuk Setup

### Langkah 1: Buat Google Sheet
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama yang sesuai (contoh: "Data Produksi Harian")

### Langkah 2: Setup Google Apps Script
1. Di Google Sheet, buka **Extensions** → **Apps Script**
2. Hapus kode default `myFunction()`
3. Copy kode dari `src/google-apps-script.js` dan paste ke Apps Script editor
4. Simpan project (Ctrl+S atau Cmd+S)

### Langkah 3: Deploy sebagai Web App
1. Di Apps Script, klik **Deploy** → **New deployment**
2. Pilih **Web app** sebagai type
3. Set pengaturan berikut:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy**
5. Copy **Web app URL** yang dihasilkan

### Langkah 4: Update Kode Form
1. Buka `src/App.tsx`
2. Cari baris `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Ganti `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` dengan URL web app Anda

### Langkah 5: Test Integrasi
1. Isi form dan submit
2. Cek Google Sheet untuk melihat apakah data muncul
3. Sheet akan otomatis membuat header pada submission pertama

## Validasi Form

- **Tanggal, Shift, Operator**: Wajib diisi
- **Semua field numerik**: Harus berupa angka (desimal diperbolehkan)
- **Validasi real-time**: Error hilang saat user mulai mengetik

## Kustomisasi

### Menambah Field Baru
1. Update interface `FormData` di `App.tsx`
2. Tambahkan field baru ke form JSX
3. Update logika validasi jika diperlukan
4. Modifikasi Google Apps Script untuk handle field baru

### Styling
Aplikasi menggunakan Tailwind CSS. Anda bisa kustomisasi:
- Warna dengan memodifikasi class Tailwind
- Layout dan spacing
- Animasi dan transisi

### Shift Options
Anda bisa memodifikasi opsi shift di dropdown:
```jsx
<option value="shift-baru">Shift Baru</option>
```

## Troubleshooting

**Form tidak bisa submit:**
- Pastikan sudah mengganti `GOOGLE_SCRIPT_URL` dengan URL web app yang benar
- Pastikan Google Apps Script sudah di-deploy sebagai web app
- Cek browser console untuk pesan error

**Data tidak muncul di Google Sheets:**
- Verifikasi kode Apps Script sudah disave dan di-deploy
- Cek permission web app diset ke "Anyone"
- Lihat execution logs di Apps Script untuk error

**Masalah responsivitas mobile:**
- Form didesain mobile-first menggunakan Tailwind CSS
- Test di berbagai ukuran layar untuk memastikan tampilan yang proper

## Catatan Keamanan

- Google Apps Script berjalan dengan permission akun Google Anda
- Data form dikirim secara aman ke Google Sheets
- Tidak ada data sensitif yang disimpan di client-side code
- Pertimbangkan validasi tambahan untuk penggunaan production

## Format Data di Google Sheets

Data akan tersimpan dengan struktur:
- **Timestamp**: Waktu submission otomatis
- **TGL/SHIFT/OP**: Format gabungan untuk referensi cepat
- **Data terpisah**: Semua field input tersimpan dalam kolom terpisah
- **Numerik**: Semua nilai kg disimpan sebagai number untuk perhitungan