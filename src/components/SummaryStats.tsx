import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  totalCount: number;
  savingRate: number;
};

export default function SummaryStats({ totalCount, savingRate }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{totalCount}</Text>
        <Text style={styles.statLabel}>Total Transaksi</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{savingRate}%</Text>
        <Text style={styles.statLabel}>Rasio Tabungan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
