import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import ReceiptListItem from '../../components/receipts/ReceiptListItem';
import { useTransactions } from '../../context/TransactionsContext';

type FilterKey = 'All' | 'Today' | 'This Week' | 'This Month';

const FILTERS: FilterKey[] = ['All', 'Today', 'This Week', 'This Month'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function ReceiptsScreen({ navigation }: any) {
  const { transactions } = useTransactions();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');

  const filtered = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return transactions.filter((t) => {
      const txDate = new Date(t.date);

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Today' && isSameDay(txDate, now)) ||
        (activeFilter === 'This Week' && txDate >= startOfWeek) ||
        (activeFilter === 'This Month' &&
          txDate.getFullYear() === now.getFullYear() &&
          txDate.getMonth() === now.getMonth());

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        t.receiptNumber.toLowerCase().includes(query) ||
        (t.customerName ?? 'walk-in customer').toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [transactions, activeFilter, search]);

  const totalSales = useMemo(
    () => filtered.reduce((sum, t) => sum + t.total, 0),
    [filtered]
  );

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
        <Text style={styles.title}>Receipts</Text>
        <View style={{ width: 22 }} />
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Icon name="search" size={16} color={colors.placeholder} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search receipt by invoice no. or customer"
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterIconButton}>
            <Icon name="sliders" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsRow}>
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.calendarButton}>
            <Icon name="calendar" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.receiptNumber}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <ReceiptListItem
              transaction={item}
              index={index}
              onPress={() => navigation.navigate('ReceiptDetails', { ...item, mode: 'view' })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="file-text" size={40} color={colors.placeholder} />
              <Text style={styles.emptyText}>No receipts found</Text>
              <Text style={styles.emptySubtext}>Try a different search or filter</Text>
            </View>
          }
        />

        {filtered.length > 0 && (
          <View style={styles.footer}>
            <View>
              <Text style={styles.footerLabel}>Total Receipts</Text>
              <Text style={styles.footerValue}>{filtered.length}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.footerLabel}>Total Sales</Text>
              <Text style={styles.footerValueAccent}>KSh {totalSales.toFixed(2)}</Text>
            </View>
          </View>
        )}
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 13,
    color: colors.textPrimary,
  },
  filterIconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.tabInactiveBg,
    marginRight: spacing.sm,
  },
  tabActive: {
    backgroundColor: colors.tabActiveBg,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.tabInactiveText,
  },
  tabTextActive: {
    color: colors.white,
  },
  calendarButton: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.tabInactiveBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl * 2,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.inputBorder,
    backgroundColor: colors.white,
  },
  footerLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  footerValueAccent: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.link,
    marginTop: 2,
  },
});