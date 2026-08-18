import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import FilterTabs from '../../components/products/FilterTabs';
import ProductListItem from '../../components/products/ProductListItem';
import { useProducts } from '../../context/ProductsContext';
import { Product, StockStatus } from '../../types/product';

const FILTER_TABS = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

const filterToStatus: Record<string, StockStatus | null> = {
  All: null,
  'In Stock': 'in-stock',
  'Low Stock': 'low-stock',
  'Out of Stock': 'out-of-stock',
};

export default function ProductsScreen({ navigation, route }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(route?.params?.filter ?? 'All');

  const { products } = useProducts();
  const filteredProducts = useMemo(() => {
  const statusFilter = filterToStatus[activeTab];
  return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === null || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, activeTab]);

  function handleAddProduct() {
  navigation.navigate('AddProduct');
  }

  function handleProductPress(product: Product) {
  }

  function handleProductMenu(product: Product) {
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Icon name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Icon name="plus" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Icon name="search" size={18} color={colors.placeholder} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search product"
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FilterTabs tabs={FILTER_TABS} activeTab={activeTab} onSelectTab={setActiveTab} />

      <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
          <ProductListItem
            product={item}
            onPress={() => handleProductPress(item)}
            onMenuPress={() => handleProductMenu(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="package" size={40} color={colors.placeholder} />
            <Text style={styles.emptyText}>No products found</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 46,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
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
  },
});