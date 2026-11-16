import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFinance } from '../../src/context/FinanceContext';
import { Transaction, TransactionType } from '../../src/data/initialTransactions';

const CATEGORIES: Transaction['category'][] = [
  'Makan & Minum',
  'Transportasi',
  'Pendidikan',
  'Belanja',
  'Gaji / Honor',
  'Lainnya',
];

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useFinance();

  const [type, setType] = useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Transaction['category']>('Makan & Minum');
  const [note, setNote] = useState('');

  const handleSave = () => {
    const numericAmount = Number(amount.replace(/[^0-9]/g, ''));
    if (!title.trim()) {
      Alert.alert('Validasi', 'Judul transaksi wajib diisi.');
      return;
    }
    if (!numericAmount || numericAmount <= 0) {
      Alert.alert('Validasi', 'Masukkan nominal uang yang valid.');
      return;
    }

    addTransaction(title.trim(), numericAmount, type, category, note.trim());
    setTitle('');
    setAmount('');
    setNote('');
    Alert.alert('Berhasil', 'Catatan keuangan berhasil disimpan!');
    router.push('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Jenis Transaksi</Text>
      <View style={styles.typeRow}>
        <Pressable
          onPress={() => setType('expense')}
          style={[styles.typeBtn, type === 'expense' && styles.expenseActive]}
        >
          <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>
            ↘ Pengeluaran
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType('income')}
          style={[styles.typeBtn, type === 'income' && styles.incomeActive]}
        >
          <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>
            ↗ Pemasukan
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Judul Transaksi</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Contoh: Makan Siang / Gaji Freelance"
        style={styles.input}
      />

      <Text style={styles.label}>Nominal (Rp)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Contoh: 50000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.catGrid}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategory(cat)}
            style={[styles.catChip, category === cat && styles.catChipActive]}
          >
            <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Catatan Tambahan (Opsional)</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Tulis keterangan transaksi..."
        multiline
        style={[styles.input, styles.textArea]}
      />

      <Pressable onPress={handleSave} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Simpan Transaksi</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    marginTop: 10,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  expenseActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  incomeActive: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  typeText: {
    fontWeight: '700',
    color: '#475569',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  catChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  catTextActive: {
    color: '#FFFFFF',
  },
  saveBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
