export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: 'Gaji / Honor' | 'Makan & Minum' | 'Transportasi' | 'Belanja' | 'Pendidikan' | 'Lainnya';
  date: string;
  note: string;
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Uang Saku & Honor Proyek',
    amount: 1500000,
    type: 'income',
    category: 'Gaji / Honor',
    date: '2026-11-01',
    note: 'Pemasukan bulanan dan freelance aplikasi.',
  },
  {
    id: '2',
    title: 'Makan Siang Kampus',
    amount: 25000,
    type: 'expense',
    category: 'Makan & Minum',
    date: '2026-11-14',
    note: 'Nasi ayam geprek dan es teh manis.',
  },
  {
    id: '3',
    title: 'Beli Komponen Arduino & Kabel Jumper',
    amount: 120000,
    type: 'expense',
    category: 'Pendidikan',
    date: '2026-11-15',
    note: 'Keperluan praktikum sistem tertanam.',
  },
  {
    id: '4',
    title: 'Isi BBM Motor',
    amount: 35000,
    type: 'expense',
    category: 'Transportasi',
    date: '2026-11-16',
    note: 'Pertalite full tank untuk mobilitas kuliah.',
  },
];

export const formatRupiah = (angka: number): string => {
  return 'Rp ' + angka.toLocaleString('id-ID');
};
