import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import SalesCard from '../../components/dashboard/SalesCard';
import StatCard from '../../components/dashboard/StatCard';
import QuickActionButton from '../../components/dashboard/QuickActionButton';
import { mockDashboardStats, mockUser } from '../../types/mockData';

export default function DashboardScreen({ navigation }: any) {
  const stats = mockDashboardStats;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>{mockUser.name} 👋</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Icon name="bell" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>



      <SalesCard
        todaySales={stats.todaySales}
        yesterdaySales={stats.yesterdaySales}
        changePercent={stats.salesChangePercent}
        chartData={stats.chartData}
      />

      <View style={styles.statsRow}>
        <StatCard
          icon="shopping-cart"
          label="Transactions"
          value={stats.transactions.toString()}
          changePercent={stats.transactionsChangePercent}
          iconBackground="#EDE9FE"
          iconColor="#7C3AED"
        />
        <View style={{ width: spacing.md }} />
        <StatCard
          icon="package"
          label="Items Sold"
          value={stats.itemsSold.toString()}
          changePercent={stats.itemsSoldChangePercent}
          iconBackground="#FEF3C7"
          iconColor="#D97706"
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          icon="link"
          label="Outstanding"
          value={`KSh ${stats.outstanding.toLocaleString()}`}
          iconBackground="#FCE7F3"
          iconColor="#DB2777"
        />
        <View style={{ width: spacing.md }} />
        <StatCard
          icon="users"
          label="Customers"
          value={stats.customers.toString()}
          iconBackground="#DBEAFE"
          iconColor="#2563EB"
        />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        <QuickActionButton
          icon="shopping-cart"
          label="New Sale"
          backgroundColor="#16A34A"
          onPress={() => navigation.navigate('Sell')}
        />
        <QuickActionButton
          icon="box"
          label="Products"
          backgroundColor="#7C3AED"
          onPress={() => navigation.navigate('Products')}
        />
        <QuickActionButton
          icon="users"
          label="Customers"
          backgroundColor="#EA580C"
          onPress={() => {}}
        />
        <QuickActionButton
          icon="bar-chart-2"
          label="Reports"
          backgroundColor="#2563EB"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});