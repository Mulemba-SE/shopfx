import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import { TransactionDetailsParams } from '../../types/transaction';

interface ReceiptListItemProps {
  transaction: TransactionDetailsParams;
  onPress: () => void;
}

const paymentIcons: Record<string, string> = {
  Cash: 'dollar-sign',
  'M-Pesa': 'smartphone',
  Card: 'credit-card',
  Other: 'list',
};

export default function ReceiptListItem({ transaction, onPress }: ReceiptListItemProps) {
  const dateObj = new Date(transaction.date);
  const formattedDate = dateObj.toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const itemCount = transaction.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconBox}>
        <Icon
          name={paymentIcons[transaction.paymentMethod] ?? 'file-text'}
          size={20}
          color={colors.gradientStart}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.receiptNumber}>{transaction.receiptNumber}</Text>
        <Text style={styles.meta}>
          {formattedDate} • {formattedTime} • {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.total}>KSh {transaction.total.toFixed(2)}</Text>
        <Text style={styles.paymentMethod}>{transaction.paymentMethod}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  receiptNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  paymentMethod: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});