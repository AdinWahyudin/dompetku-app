import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useFinance } from '../../src/context/FinanceContext';
import { formatRupiah } from '../../src/data/initialTransactions';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { transactions, deleteTransaction } = useFinance();

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <View style={styles.center}>
        <Text>Data transaksi tidak ditemukan.</Text>
      </View>
    );
  }

  const isIncome = transaction.type === 'income';

  const handleDelete = () => {
    Alert.alert('Hapus Transaksi', 'Yakin ingin menghapus catatan transaksi ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          deleteTransaction(transaction.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Detail Transaksi' }} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.badge, isIncome ? styles.incomeBadge : styles.expenseBadge]}>
            {isIncome ? 'PEMASUKAN' : 'PENGELUARAN'}
          </Text>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={[styles.amount, isIncome ? styles.incomeText : styles.expenseText]}>
            {isIncome ? '+' : '-'} {formatRupiah(transaction.amount)}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Kategori</Text>
            <Text style={styles.value}>{transaction.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal</Text>
            <Text style={styles.value}>{transaction.date}</Text>
          </View>
          <View style={styles.noteBox}>
            <Text style={styles.label}>Catatan</Text>
            <Text style={styles.noteText}>{transaction.note}</Text>
          </View>
        </View>

        <Pressable onPress={handleDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Hapus Transaksi</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badge: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  incomeBadge: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A',
  },
  expenseBadge: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  amount: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
  },
  incomeText: {
    color: '#16A34A',
  },
  expenseText: {
    color: '#DC2626',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
  },
  noteBox: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  noteText: {
    fontSize: 14,
    color: '#334155',
    marginTop: 4,
    lineHeight: 20,
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 15,
  },
});
