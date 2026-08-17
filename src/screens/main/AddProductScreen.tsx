import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme/colors';
import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import { useProducts } from '../../context/ProductsContext';
import { CATEGORIES, categoryStyles, ProductCategory } from '../../data/categoryStyles';
import { StockStatus } from '../../types/product';

function getStatus(stockCount: number): StockStatus {
  if (stockCount === 0) return 'out-of-stock';
  if (stockCount <= 20) return 'low-stock';
  return 'in-stock';
}

export default function AddProductScreen({ navigation }: any) {
  const { addProduct } = useProducts();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Beverages');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');

  function handleSave() {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a product name.');
      return;
    }
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stockCount, 10);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert('Invalid price', 'Please enter a valid price.');
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      Alert.alert('Invalid stock', 'Please enter a valid stock quantity.');
      return;
    }

    const style = categoryStyles[category];
    addProduct({
      name: name.trim(),
      price: parsedPrice,
      stockCount: parsedStock,
      status: getStatus(parsedStock),
      icon: style.icon,
      iconColor: style.iconColor,
      iconBackground: style.iconBackground,
      category,
    });

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Product</Text>
        <View style={{ width: 22 }} />
      </View>

      <AuthInput icon="tag" placeholder="Product Name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryPill, isActive && styles.categoryPillActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <AuthInput
        icon="dollar-sign"
        placeholder="Price (KSh)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <AuthInput
        icon="box"
        placeholder="Starting Stock Quantity"
        value={stockCount}
        onChangeText={setStockCount}
        keyboardType="numeric"
      />

      <GradientButton label="Save Product" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
  },
  categoryPillActive: {
    backgroundColor: colors.gradientStart,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
  },
});