import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import ReceiptListItem from '../../components/receipts/ReceiptListItem';
import { useTransactions } from '../../context/TransactionsContext';

export default function ReceiptsScreen({ navigation }: any) {
  const { transactions } = useTransactions();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Receipts</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.receiptNumber}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ReceiptListItem
            transaction={item}
            onPress={() => navigation.navigate('ReceiptDetails', item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="file-text" size={40} color={colors.placeholder} />
            <Text style={styles.emptyText}>No receipts yet</Text>
            <Text style={styles.emptySubtext}>Completed sales will appear here</Text>
          </View>
        }
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
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
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
});