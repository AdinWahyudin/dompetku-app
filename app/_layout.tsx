import React from 'react';
import { Stack } from 'expo-router';
import { FinanceProvider } from '../src/context/FinanceContext';

export default function RootLayout() {
  return (
    <FinanceProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="transaction/[id]" options={{ title: 'Detail Transaksi' }} />
      </Stack>
    </FinanceProvider>
  );
}
