import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  changePercent?: number;
  iconBackground: string;
  iconColor: string;
}

export default function StatCard({
  icon,
  label,
  value,
  changePercent,
  iconBackground,
  iconColor,
}: StatCardProps) {
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.iconCircle, { backgroundColor: iconBackground }]}>
          <Icon name={icon} size={16} color={iconColor} />
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      {changePercent !== undefined && (
        <Text style={[styles.change, { color: isPositive ? '#16A34A' : '#DC2626' }]}>
          {isPositive ? '+' : ''}
          {changePercent}%
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});