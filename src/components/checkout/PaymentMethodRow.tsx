import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';

interface PaymentMethodRowProps {
  icon: string;
  iconColor: string;
  iconBackground: string;
  label: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

export default function PaymentMethodRow({
  icon,
  iconColor,
  iconBackground,
  label,
  description,
  selected,
  onPress,
}: PaymentMethodRowProps) {
  return (
    <TouchableOpacity
      style={[styles.row, selected && styles.rowSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBackground }]}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rowSelected: {
    borderColor: colors.gradientStart,
    borderWidth: 2,
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
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});