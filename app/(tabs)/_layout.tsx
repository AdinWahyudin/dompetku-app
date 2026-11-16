import React from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2563EB' }}>
      <Tabs.Screen name="index" options={{ title: 'Ringkasan' }} />
      <Tabs.Screen name="add" options={{ title: 'Tambah Transaksi' }} />
    </Tabs>
  );
}
