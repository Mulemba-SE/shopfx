import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import { CartItem } from '../../context/CartContext';

interface CartItemRowProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const lineTotal = item.product.price * item.quantity;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: item.product.iconBackground }]}>
          <Icon name={item.product.icon} size={22} color={item.product.iconColor} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.product.name}</Text>
          <Text style={styles.price}>KSh {item.product.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon name="x" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepperButton} onPress={onDecrease}>
            <Icon name="minus" size={14} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.stepperButton} onPress={onIncrease}>
            <Icon name="plus" size={14} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.lineTotal}>KSh {lineTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
  },
  price: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: spacing.xs,
  },
  stepperButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  lineTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});