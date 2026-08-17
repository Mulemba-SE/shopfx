import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { colors, spacing } from '../../theme/colors';
import { SalesDataPoint } from '../../types/mockData';

interface SalesCardProps {
  todaySales: number;
  yesterdaySales: number;
  changePercent: number;
  chartData: SalesDataPoint[];
}

const screenWidth = Dimensions.get('window').width;

export default function SalesCard({
  todaySales,
  yesterdaySales,
  changePercent,
  chartData,
}: SalesCardProps) {
  const isPositive = changePercent >= 0;

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>Today's Sales</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {isPositive ? '▲' : '▼'} {Math.abs(changePercent)}%
          </Text>
        </View>
      </View>

      <Text style={styles.amount}>KSh {todaySales.toLocaleString()}.00</Text>
      <Text style={styles.subtext}>vs yesterday KSh {yesterdaySales.toLocaleString()}.00</Text>

      <LineChart
        data={{
          labels: chartData.map((d) => d.time),
          datasets: [{ data: chartData.map((d) => d.value) }],
        }}
        width={screenWidth - spacing.lg * 2 - spacing.lg * 2 + spacing.lg}
        height={170}
        withDots
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels
        withHorizontalLabels={false}
        chartConfig={{
          backgroundGradientFrom: 'rgba(0,0,0,0)',
          backgroundGradientTo: 'rgba(0,0,0,0)',
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          strokeWidth: 2,
          propsForDots: { r: '3', strokeWidth: '2', stroke: colors.white },
          propsForLabels: { fontSize: 12, fontWeight: '700', fill: '#FFFFFF' },
        }}
        bezier
        style={styles.chart}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    marginBottom: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#4ADE80',
    fontSize: 12,
    fontWeight: '600',
  },
  amount: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  chart: {
    marginLeft: -spacing.sm,
    borderRadius: 16,
  },
});