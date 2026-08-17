import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  backgroundColor: string;
  onPress: () => void;
}

export default function QuickActionButton({
  icon,
  label,
  backgroundColor,
  onPress,
}: QuickActionButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconBox, { backgroundColor }]}>
        <Icon name={icon} size={22} color={colors.white} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '23%',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});