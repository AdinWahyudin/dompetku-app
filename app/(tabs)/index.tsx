import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFinance } from '../../src/context/FinanceContext';
import BalanceCard from '../../src/components/BalanceCard';
import SummaryStats from '../../src/components/SummaryStats';
import CategoryFilter from '../../src/components/CategoryFilter';
import TransactionItem from '../../src/components/TransactionItem';

const FILTER_OPTIONS = ['Semua', 'Pemasukan', 'Pengeluaran'];

export default function DashboardScreen() {
  const router = useRouter();
  const { transactions, totalIncome, totalExpense, balance } = useFinance();
  const [filter, setFilter] = useState('Semua');
  const [greeting, setGreeting] = useState('Halo, Selamat Datang!');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi 👋');
    else if (hour < 18) setGreeting('Selamat Siang / Sore 👋');
    else setGreeting('Selamat Malam 👋');
  }, []);

  const filteredTransactions = useMemo(() => {
    if (filter === 'Pemasukan') return transactions.filter((t) => t.type === 'income');
    if (filter === 'Pengeluaran') return transactions.filter((t) => t.type === 'expense');
    return transactions;
  }, [transactions, filter]);

  const savingRate = useMemo(() => {
    if (totalIncome <= 0) return 0;
    const rate = Math.round(((totalIncome - totalExpense) / totalIncome) * 100);
    return Math.max(0, rate);
  }, [totalIncome, totalExpense]);

  const handleOpenDetail = useCallback(
    (id: string) => {
      router.push({ pathname: '/transaction/[id]', params: { id } });
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <BalanceCard
              balance={balance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              greeting={greeting}
            />
            <SummaryStats totalCount={transactions.length} savingRate={savingRate} />
            <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
            <CategoryFilter options={FILTER_OPTIONS} selected={filter} onSelect={setFilter} />
          </>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada catatan transaksi untuk filter ini.</Text>
        }
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onPress={() => handleOpenDetail(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 24,
  },
});
