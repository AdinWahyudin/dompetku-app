import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function CategoryFilter({ options, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {options.map((opt) => {
        const isActive = selected === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => onSelect(opt)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{opt}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 42,
    marginBottom: 14,
  },
  content: {
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  chipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});
