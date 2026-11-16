import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatRupiah } from '../data/initialTransactions';

type Props = {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  greeting: string;
};

export default function BalanceCard({ balance, totalIncome, totalExpense, greeting }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.label}>Total Saldo Saat Ini</Text>
      <Text style={styles.balanceText}>{formatRupiah(balance)}</Text>

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.subLabel}>↗ Pemasukan</Text>
          <Text style={styles.incomeText}>{formatRupiah(totalIncome)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.box}>
          <Text style={styles.subLabel}>↘ Pengeluaran</Text>
          <Text style={styles.expenseText}>{formatRupiah(totalExpense)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 12,
    color: '#93C5FD',
    fontWeight: '600',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#CBD5E1',
  },
  balanceText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  box: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 12,
  },
  subLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  incomeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4ADE80',
  },
  expenseText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F87171',
  },
});
