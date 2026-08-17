import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing } from '../../theme/colors';

interface CartBarProps {
  itemCount: number;
  totalPrice: number;
  onPress: () => void;
}

export default function CartBar({ itemCount, totalPrice, onPress }: CartBarProps) {
  if (itemCount === 0) return null;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        locations={[0, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bar}
      >
        <View style={styles.leftSection}>
          <Icon name="shopping-cart" size={18} color={colors.white} />
          <Text style={styles.itemCountText}>
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.priceText}>KSh {totalPrice.toFixed(2)}</Text>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Icon name="arrow-right" size={16} color={colors.white} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 16,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemCountText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priceText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  viewCartText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});