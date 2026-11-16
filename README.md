# DompetKu - Aplikasi Pencatatan Keuangan Pribadi

Aplikasi mobile pencatatan keuangan (Pemasukan & Pengeluaran) menggunakan React Native dan Expo Router.

## Pemenuhan Kriteria Tugas
1. **Minimal 4 Komponen:** `BalanceCard`, `TransactionItem`, `CategoryFilter`, dan `SummaryStats`.
2. **State & Props:** Pengiriman data transaksi, ringkasan saldo, dan handler aksi melalui *props*, serta pengelolaan daftar transaksi dan filter kategori menggunakan *state* & Context API.
3. **Navigasi Antarhalaman:** Bottom Tabs (`Ringkasan`, `Tambah Transaksi`) dan Stack Navigation (`Detail Transaksi`).
4. **Penggunaan Hooks:** `useState`, `useEffect`, `useMemo`, `useCallback`, dan `useContext`.

## Cara Menjalankan Proyek
1. Ekstrak file ZIP ini ke folder kerja Anda.
2. Buka CMD/Terminal di dalam folder `finance-tracker-app`.
3. Jalankan perintah instalasi:
   ```cmd
   npm install --legacy-peer-deps
   ```
4. Jalankan server Expo:
   ```cmd
   npx expo start -c
   ```
