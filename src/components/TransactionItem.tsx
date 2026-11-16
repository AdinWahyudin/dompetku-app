import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Transaction, formatRupiah } from '../data/initialTransactions';

type Props = {
  transaction: Transaction;
  onPress: () => void;
};

export default function TransactionItem({ transaction, onPress }: Props) {
  const isIncome = transaction.type === 'income';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.iconBox, isIncome ? styles.incomeBg : styles.expenseBg]}>
        <Text style={styles.iconText}>{isIncome ? '💰' : '💸'}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text style={styles.meta}>
          {transaction.category} • {transaction.date}
        </Text>
      </View>

      <Text style={[styles.amount, isIncome ? styles.incomeColor : styles.expenseColor]}>
        {isIncome ? '+' : '-'} {formatRupiah(transaction.amount)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeBg: {
    backgroundColor: '#DCFCE7',
  },
  expenseBg: {
    backgroundColor: '#FEE2E2',
  },
  iconText: {
    fontSize: 18,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  meta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
  incomeColor: {
    color: '#16A34A',
  },
  expenseColor: {
    color: '#DC2626',
  },
});
