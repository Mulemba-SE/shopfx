import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import { useTransactions } from '../../context/TransactionsContext';

export default function ReportsScreen() {
  const { transactions } = useTransactions();

  const stats = useMemo(() => {
    if (transactions.length === 0) {
      return null;
    }

    const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = transactions.length;
    const averageSale = totalSales / totalTransactions;

    const paymentBreakdown: Record<string, number> = {};
    transactions.forEach((t) => {
      paymentBreakdown[t.paymentMethod] = (paymentBreakdown[t.paymentMethod] ?? 0) + t.total;
    });

    const itemTotals: Record<string, number> = {};
    transactions.forEach((t) => {
      t.items.forEach((item) => {
        itemTotals[item.name] = (itemTotals[item.name] ?? 0) + item.quantity;
      });
    });
    const topItems = Object.entries(itemTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { totalSales, totalTransactions, averageSale, paymentBreakdown, topItems };
  }, [transactions]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
      </View>

      {!stats ? (
        <View style={styles.emptyState}>
          <Icon name="bar-chart-2" size={40} color={colors.placeholder} />
          <Text style={styles.emptyText}>No sales data yet</Text>
          <Text style={styles.emptySubtext}>Complete a sale to see your reports</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Sales</Text>
              <Text style={styles.summaryValue}>KSh {stats.totalSales.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Transactions</Text>
              <Text style={styles.summaryValue}>{stats.totalTransactions}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Average Sale</Text>
              <Text style={styles.summaryValue}>KSh {stats.averageSale.toFixed(2)}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Payment Method Breakdown</Text>
          {Object.entries(stats.paymentBreakdown).map(([method, amount]) => (
            <View key={method} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{method}</Text>
              <Text style={styles.breakdownValue}>KSh {amount.toFixed(2)}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Top Selling Items</Text>
          {stats.topItems.map(([name, quantity], index) => (
            <View key={name} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>
                {index + 1}. {name}
              </Text>
              <Text style={styles.breakdownValue}>{quantity} sold</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  emptySubtext: {
    marginTop: spacing.xs,
    color: colors.placeholder,
    fontSize: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    padding: spacing.md,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  breakdownLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});