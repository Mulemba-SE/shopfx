import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { LineChart } from 'react-native-chart-kit';
import DatePicker from 'react-native-date-picker';
import { colors, spacing } from '../../theme/colors';
import { useTransactions } from '../../context/TransactionsContext';

const screenWidth = Dimensions.get('window').width;

function formatShortDate(d: Date) {
  return d.toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' });
}

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function endOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(23, 59, 59, 999);
  return copy;
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null; // null = "new", no baseline
  return ((current - previous) / previous) * 100;
}

export default function ReportsScreen({ navigation }: any) {
  const { transactions } = useTransactions();

  const [rangeStart, setRangeStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return startOfDay(d);
  });
  const [rangeEnd, setRangeEnd] = useState(() => endOfDay(new Date()));
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  const stats = useMemo(() => {
    const rangeMs = rangeEnd.getTime() - rangeStart.getTime();
    const prevEnd = new Date(rangeStart.getTime() - 1);
    const prevStart = new Date(prevEnd.getTime() - rangeMs);

    const inRange = (d: Date, from: Date, to: Date) => d >= from && d <= to;

    const current = transactions.filter((t) => inRange(new Date(t.date), rangeStart, rangeEnd));
    const previous = transactions.filter((t) => inRange(new Date(t.date), prevStart, prevEnd));

    const sum = (list: typeof transactions) => list.reduce((s, t) => s + t.total, 0);
    const itemCount = (list: typeof transactions) =>
      list.reduce((s, t) => s + t.items.reduce((is, i) => is + i.quantity, 0), 0);

    const totalSales = sum(current);
    const prevTotalSales = sum(previous);
    const totalTransactions = current.length;
    const prevTotalTransactions = previous.length;
    const totalItemsSold = itemCount(current);
    const prevTotalItemsSold = itemCount(previous);
    const avgOrderValue = totalTransactions > 0 ? totalSales / totalTransactions : 0;
    const prevAvgOrderValue = prevTotalTransactions > 0 ? prevTotalSales / prevTotalTransactions : 0;

    const dayCount = Math.max(1, Math.round(rangeMs / (1000 * 60 * 60 * 24)) + 1);
    const labels: string[] = [];
    const dataPoints: number[] = [];
    for (let i = 0; i < dayCount; i++) {
      const dayStart = new Date(rangeStart);
      dayStart.setDate(rangeStart.getDate() + i);
      const dayEnd = endOfDay(dayStart);
      const daySales = sum(
        current.filter((t) => inRange(new Date(t.date), startOfDay(dayStart), dayEnd))
      );
      labels.push(dayStart.toLocaleDateString('en-KE', { day: '2-digit', month: 'short' }));
      dataPoints.push(daySales);
    }

    const productTotals: Record<string, { quantity: number; revenue: number }> = {};
    current.forEach((t) => {
      t.items.forEach((item) => {
        if (!productTotals[item.name]) productTotals[item.name] = { quantity: 0, revenue: 0 };
        productTotals[item.name].quantity += item.quantity;
        productTotals[item.name].revenue += item.price * item.quantity;
      });
    });
    const topProducts = Object.entries(productTotals)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 5);

    return {
      totalSales,
      totalTransactions,
      totalItemsSold,
      avgOrderValue,
      deltaSales: pctChange(totalSales, prevTotalSales),
      deltaTransactions: pctChange(totalTransactions, prevTotalTransactions),
      deltaItems: pctChange(totalItemsSold, prevTotalItemsSold),
      deltaAvgOrder: pctChange(avgOrderValue, prevAvgOrderValue),
      labels,
      dataPoints,
      topProducts,
    };
  }, [transactions, rangeStart, rangeEnd]);

  function formatDelta(value: number | null) {
    if (value === null) return 'New';
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }

  function deltaColor(value: number | null) {
    if (value === null) return colors.textSecondary;
    return value >= 0 ? colors.success : colors.danger;
  }

  const hasData = transactions.length > 0;

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name="arrow-left" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Reports</Text>
        <View style={{ width: 22 }} />
      </LinearGradient>

      {!hasData ? (
        <View style={[styles.body, styles.emptyState]}>
          <Icon name="bar-chart-2" size={40} color={colors.placeholder} />
          <Text style={styles.emptyText}>No sales data yet</Text>
          <Text style={styles.emptySubtext}>Complete a sale to see your reports</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Select Date Range</Text>
          <View style={styles.rangeRow}>
            <TouchableOpacity style={styles.rangeFieldHalf} onPress={() => setStartPickerOpen(true)}>
              <Icon name="calendar" size={16} color={colors.textPrimary} />
              <Text style={styles.rangeText}>{formatShortDate(rangeStart)}</Text>
            </TouchableOpacity>
            <Text style={styles.rangeDash}>–</Text>
            <TouchableOpacity style={styles.rangeFieldHalf} onPress={() => setEndPickerOpen(true)}>
              <Icon name="calendar" size={16} color={colors.textPrimary} />
              <Text style={styles.rangeText}>{formatShortDate(rangeEnd)}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Summary Overview</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryTopRow}>
                <Text style={styles.summaryLabel}>Total Sales</Text>
                <Icon name="bar-chart-2" size={16} color={colors.link} />
              </View>
              <Text style={styles.summaryValue}>KSh {stats.totalSales.toFixed(2)}</Text>
              
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryTopRow}>
                <Text style={styles.summaryLabel}>Total Transactions</Text>
                <Icon name="shopping-bag" size={16} color={colors.link} />
              </View>
              <Text style={styles.summaryValue}>{stats.totalTransactions}</Text>
              
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryTopRow}>
                <Text style={styles.summaryLabel}>Total Items Sold</Text>
                <Icon name="box" size={16} color={colors.link} />
              </View>
              <Text style={styles.summaryValue}>{stats.totalItemsSold}</Text>

            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryTopRow}>
                <Text style={styles.summaryLabel}>Average Order Value</Text>
                <Icon name="credit-card" size={16} color={colors.link} />
              </View>
              <Text style={styles.summaryValue}>KSh {stats.avgOrderValue.toFixed(2)}</Text>
              
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sales Chart</Text>
          <View style={styles.chartCard}>
            <LineChart
              data={{
                labels: stats.labels,
                datasets: [{ data: stats.dataPoints.length > 0 ? stats.dataPoints : [0] }],
              }}
              width={screenWidth - spacing.lg * 2 - spacing.md * 2}
              height={200}
              yAxisLabel="KSh "
              chartConfig={{
                backgroundColor: colors.white,
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(106, 17, 203, ${opacity})`,
                labelColor: () => colors.textSecondary,
                propsForDots: { r: '3', strokeWidth: '2', stroke: colors.link },
              }}
              bezier
              style={{ borderRadius: 12 }}
            />
          </View>

          <View style={styles.topProductsHeader}>
            <Text style={styles.sectionTitle}>Top Selling Products</Text>
          </View>
          {stats.topProducts.length === 0 ? (
            <Text style={styles.emptySubtext}>No product sales in this period</Text>
          ) : (
            stats.topProducts.map(([name, data], index) => (
              <View key={name} style={styles.productRow}>
                <Text style={styles.productRank}>{index + 1}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{name}</Text>
                  <Text style={styles.productSold}>{data.quantity} sold</Text>
                </View>
                <Text style={styles.productRevenue}>KSh {data.revenue.toFixed(2)}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <DatePicker
        modal
        open={startPickerOpen}
        date={rangeStart}
        mode="date"
        maximumDate={rangeEnd}
        onConfirm={(date) => {
          setStartPickerOpen(false);
          setRangeStart(startOfDay(date));
        }}
        onCancel={() => setStartPickerOpen(false)}
      />
      <DatePicker
        modal
        open={endPickerOpen}
        date={rangeEnd}
        mode="date"
        minimumDate={rangeStart}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setEndPickerOpen(false);
          setRangeEnd(endOfDay(date));
        }}
        onCancel={() => setEndPickerOpen(false)}
      />
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
  paddingBottom: spacing.lg,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
},
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
body: {
  flex: 1,
  backgroundColor: colors.white,
  marginTop: 1,
  paddingHorizontal: spacing.lg,
  overflow: 'hidden',
},
  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  emptyState: {
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rangeFieldHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  rangeDash: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  rangeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryCard: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    padding: spacing.md,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  summaryDelta: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
  },
  topProductsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  productRank: {
    width: 20,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  productSold: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  productRevenue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});