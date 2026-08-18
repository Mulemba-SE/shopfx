import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import PaymentMethodRow from '../../components/checkout/PaymentMethodRow';
import GradientButton from '../../components/GradientButton';
import { useCart } from '../../context/CartContext';
import { useTransactions } from '../../context/TransactionsContext';
import { SoldItem } from '../../types/transaction';
import { PAYMENT_METHODS } from '../../data/paymentMethods';

const TAX_RATE = 0.16;

export default function CheckoutScreen({ navigation }: any) {
  const { items, totalPrice, clearCart } = useCart();
  const { addTransaction } = useTransactions();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const tax = totalPrice * TAX_RATE;
  const total = totalPrice + tax;

  function handleConfirmPayment() {
    if (!selectedMethod) return;

    const methodLabel = PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.label ?? 'Other';
    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const soldItems: SoldItem[] = items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const transactionData = {
      receiptNumber,
      date: new Date().toISOString(),
      subtotal: totalPrice,
      tax,
      total,
      paymentMethod: methodLabel,
      items: soldItems,
    };

    addTransaction(transactionData);
    clearCart();
    navigation.navigate('TransactionDetails', transactionData);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#0D9488', '#14B8A6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.totalCard}
        >
          <View style={styles.totalTopRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <View style={styles.shieldIcon}>
              <Icon name="check" size={16} color={colors.white} />
            </View>
          </View>
          <Text style={styles.totalAmount}>KSh {total.toFixed(2)}</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {PAYMENT_METHODS.map((method) => (
          <PaymentMethodRow
            key={method.id}
            icon={method.icon}
            iconColor={method.iconColor}
            iconBackground={method.iconBackground}
            label={method.label}
            description={method.description}
            selected={selectedMethod === method.id}
            onPress={() => setSelectedMethod(method.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <GradientButton
          label="Confirm Payment"
          onPress={handleConfirmPayment}
          disabled={!selectedMethod}
        />
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  totalCard: {
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  totalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  shieldIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAmount: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.inputBorder,
  },
});