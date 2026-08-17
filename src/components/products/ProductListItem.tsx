import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import { Product } from '../../types/product';

interface ProductListItemProps {
  product: Product;
  onPress?: () => void;
  onMenuPress?: () => void;
}

const statusConfig = {
  'in-stock': { label: 'In Stock', color: '#16A34A' },
  'low-stock': { label: 'Low Stock', color: '#D97706' },
  'out-of-stock': { label: 'Out of Stock', color: '#DC2626' },
};

export default function ProductListItem({ product, onPress, onMenuPress }: ProductListItemProps) {
  const status = statusConfig[product.status];

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBox, { backgroundColor: product.iconBackground }]}>
        <Icon name={product.icon} size={22} color={product.iconColor} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, { backgroundColor: status.color }]} />
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
        <Text style={styles.price}>KSh {product.price.toFixed(2)}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.stockCount}>{product.stockCount}</Text>
        <TouchableOpacity onPress={onMenuPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon name="more-vertical" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
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
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  stockCount: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  rightSection2: {},
});