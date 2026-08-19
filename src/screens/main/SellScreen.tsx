import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import CategoryTabs from '../../components/sell/CategoryTabs';
import ProductGridItem from '../../components/sell/ProductGridItem';
import CartBar from '../../components/sell/CartBar';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/product';

const CATEGORY_TABS = ['All', 'Beverages', 'Snacks', 'Household', 'Personal Care'];

export default function SellScreen({ navigation }: any) {
  const { products } = useProducts();
  const { addToCart, totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  function handleAddToCart(product: Product) {
    addToCart(product);
  }

  function handleViewCart() {
    navigation.navigate('Cart');
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack?.()}>
          <Icon name="arrow-left" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>New Sale</Text>
        <TouchableOpacity>
          <Icon name="maximize" size={22} color={colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.contentPadding}>
          <View style={styles.searchBar}>
            <Icon name="search" size={18} color={colors.placeholder} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search product by name or SKU"
              placeholderTextColor={colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <CategoryTabs
            categories={CATEGORY_TABS}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <ProductGridItem product={item} onPress={() => handleAddToCart(item)} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="search" size={40} color={colors.placeholder} />
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
        />

        <CartBar itemCount={totalItems} totalPrice={totalPrice} onPress={handleViewCart} />
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
  overflow: 'hidden',
},
  contentPadding: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  gridContent: {
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