import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing, receiptIconVariants } from '../../theme/colors';
import { TransactionDetailsParams } from '../../types/transaction';

interface ReceiptListItemProps {
  transaction: TransactionDetailsParams;
  index: number;
  onPress: () => void;
}

const paymentIcons: Record<string, string> = {
  Cash: 'dollar-sign',
  'M-Pesa': 'smartphone',
  Card: 'credit-card',
  Other: 'list',
};

const statusStyles: Record<string, { bg: string; text: string }> = {
  Paid: { bg: colors.successBg, text: colors.success },
  Pending: { bg: colors.inputBackground, text: colors.textSecondary },
  Refunded: { bg: '#FBE4EA', text: '#D6316E' },
};

export default function ReceiptListItem({ transaction, index, onPress }: ReceiptListItemProps) {
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

  const customerName = transaction.customerName ?? 'Walk-in Customer';
  const status = transaction.status ?? 'Paid';
  const statusStyle = statusStyles[status] ?? statusStyles.Paid;
  const variant = receiptIconVariants[index % receiptIconVariants.length];

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBox, { backgroundColor: variant.bg }]}>
        <Icon
          name={paymentIcons[transaction.paymentMethod] ?? 'file-text'}
          size={20}
          color={variant.icon}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.receiptNumber}>{transaction.receiptNumber}</Text>
        <Text style={styles.customerName} numberOfLines={1}>{customerName}</Text>
        <Text style={styles.meta}>{formattedDate} • {formattedTime}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.total}>KSh {transaction.total.toFixed(2)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
        </View>
      </View>

      <Icon name="chevron-right" size={18} color={colors.placeholder} style={styles.chevron} />
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  receiptNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  customerName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  meta: {
    fontSize: 11,
    color: colors.placeholder,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginRight: spacing.xs,
  },
  total: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statusBadge: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: spacing.xs,
  },
});