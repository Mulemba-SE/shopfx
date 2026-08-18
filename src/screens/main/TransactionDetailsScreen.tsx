import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import { mockUser } from '../../types/mockData';
import GradientButton from '../../components/GradientButton';
import { TransactionDetailsParams } from '../../types/transaction';


export default function TransactionDetailsScreen({ navigation, route }: any) {
  const params: TransactionDetailsParams = route.params ?? {
    receiptNumber: '',
    date: new Date().toISOString(),
    subtotal: 0,
    tax: 0,
    total: 0,
    paymentMethod: '',
    items: [],
  };
  const dateObj = new Date(params.date);
  const formattedDate = dateObj.toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  function handleDone() {
    navigation.navigate('SellHome');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleDone}>
          <Icon name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <TouchableOpacity>
          <Icon name="printer" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#0D9488', '#16A34A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successCard}
        >
          <View style={styles.checkCircle}>
            <Icon name="check" size={28} color="#16A34A" />
          </View>
          <Text style={styles.successTitle}>Sale Completed</Text>
          <Text style={styles.invoiceText}>Receipt #{params.receiptNumber}</Text>
          <Text style={styles.dateText}>
            {formattedDate} • {formattedTime}
          </Text>
        </LinearGradient>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer</Text>
            <Text style={styles.infoValue}>Walk-in Customer</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cashier</Text>
            <Text style={styles.infoValue}>{mockUser.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>{params.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Items Sold</Text>
        {params.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={styles.itemTotal}>KSh {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>KSh {params.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.summaryLabel}>Tax (16%)</Text>
            <Text style={styles.summaryValue}>KSh {params.tax.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>KSh {params.total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <GradientButton label="Done" onPress={handleDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  successCard: {
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  successTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  invoiceText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
  },
  dateText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginTop: 2,
  },
  infoSection: {
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.inputBorder,
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  itemName: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.inputBorder,
  },
});