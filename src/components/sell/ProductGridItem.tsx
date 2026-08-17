import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import { Product } from '../../types/product';

interface ProductGridItemProps {
  product: Product;
  onPress: () => void;
}

export default function ProductGridItem({ product, onPress }: ProductGridItemProps) {
  const isOutOfStock = product.status === 'out-of-stock';

  return (
    <TouchableOpacity
      style={[styles.card, isOutOfStock && styles.disabledCard]}
      onPress={onPress}
      disabled={isOutOfStock}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: product.iconBackground }]}>
        <Icon name={product.icon} size={26} color={product.iconColor} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.price}>KSh {product.price.toFixed(2)}</Text>
      {isOutOfStock && (
        <View style={styles.outOfStockBadge}>
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  disabledCard: {
    opacity: 0.5,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  outOfStockBadge: {
    marginTop: spacing.xs,
  },
  outOfStockText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#DC2626',
  },
});