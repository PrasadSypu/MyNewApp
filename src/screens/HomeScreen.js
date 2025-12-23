import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import { homeData } from '../data/homeData';
import { categoryData } from '../data/categoryData';
import { bottomData } from '../data/bottomData';
import Banner from '../screens/Banner';
import BoutiqueCollection from '../screens/BoutiqueCollection'

const { width } = Dimensions.get('window');

function HomeScreen() {
  const menuData = useMemo(
    () =>
      [...homeData.main_sticky_menu].sort(
        (a, b) => a.sort_order - b.sort_order
      ),
    []
  );

  const [selectedMenu, setSelectedMenu] = useState(menuData[0]);

  const shopByCatData = useMemo(
    () =>
      [...categoryData.shop_by_category].sort(
        (a, b) => a.sort_order - b.sort_order
      ),
    []
  );

  /* Convert flat list to column based data (2 rows) */
  const formatToColumns = (data, rows = 2) => {
    const columns = [];
    for (let i = 0; i < data.length; i += rows) {
      columns.push(data.slice(i, i + rows));
    }
    return columns;
  };

  const columns = useMemo(
    () => formatToColumns(shopByCatData, 2),
    [shopByCatData]
  );

  const fabricColumns = useMemo(() => {
    const rows = 2;
    const cols = [];
    const data = categoryData.shop_by_fabric;

    for (let i = 0; i < data.length; i += rows) {
      cols.push(data.slice(i, i + rows));
    }
    return cols;
  }, []);

  const RangeOfPattern = useMemo(() => {
    const rows = 2;
    const cols = [];
    const data = bottomData.range_of_pattern;

    for (let i = 0; i < data.length; i += rows) {
      cols.push(data.slice(i, i + rows));
    }
    return cols;
  }, []);


  const CategoryCard = ({ item, onPress }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.tint_color }]}
        activeOpacity={0.85}
        // onPress={onPress}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const FabricCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.fabricCard}
        activeOpacity={0.85}
        // onPress={() => console.log(item.name)}
      >
        <Image source={{ uri: item.image }} style={styles.fabricImage} />
        <View style={styles.fabricOverlay} />
        <Text style={styles.fabricText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
        <FlatList
          data={menuData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.menuContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedMenu(item)}
              style={styles.menuItem}
            >
              <Image source={{ uri: item.image }} style={styles.menuImage} />
              <Text
                style={[
                  styles.menuText,
                  selectedMenu.title === item.title &&
                    styles.activeMenuText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />

        <Banner
          data={[...selectedMenu.slider_images].sort(
            (a, b) => a.sort_order - b.sort_order
          )}
        />
      </View>

      <View style={styles.shopContainer}>
        <Text style={styles.sectionTitle}>Shop By Category</Text>

        <FlatList
          data={columns}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `column-${index}`}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.column}>
              {item.map((category) => (
                <CategoryCard
                  key={category.category_id}
                  item={category}
                  onPress={() => console.log(category.name)}
                />
              ))}
            </View>
          )}
        />
      </View>

      {/* shop by fabric */}
      <View style={styles.fabricContainer}>
        <Text style={styles.sectionTitle}>Shop By Fabric Material</Text>

        <FlatList
          data={fabricColumns}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `fabric-col-${index}`}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.fabricColumn}>
              {item.map((fabric) => (
                <FabricCard key={fabric.id} item={fabric} />
              ))}
            </View>
          )}
        />
      </View>
      {/* Boutique collection */}
        <View style={{ marginVertical: 10 }}>
        <Text style={[styles.sectionTitle,{marginTop: 10, marginBottom: -5}]}>Boutique Collection</Text>
        <BoutiqueCollection data={categoryData?.boutique_collection}/>
      </View>
      {/* Range of Pattren */}
      <View style={styles.fabricContainer}>
        <Text style={styles.sectionTitle}>Range of Collection</Text>

        <FlatList
          data={RangeOfPattern}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `fabric-col-${index}`}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.fabricColumn}>
              {item.map((fabric) => (
                <FabricCard key={fabric.id} item={fabric} />
              ))}
            </View>
          )}
        />
      </View>
      </ScrollView>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  menuContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  menuImage: {
    width: 120,
    height: 60,
    borderRadius: 2,
  },
  menuText: {
    marginTop: 6,
    fontSize: 12,
    color: '#999',
  },
  activeMenuText: {
    color: '#8BC34A',
    fontWeight: '600',
  },

  shopContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
    paddingHorizontal: 16,
  },
  column: {
    marginRight: 12,
  },

  card: {
    width: 160,
    borderRadius: 10,
    marginVertical: 6,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    padding: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  fabricContainer: {
  marginTop: 24,
},

fabricColumn: {
  marginRight: 14,
},

fabricCard: {
  width: 120,
  height: 120,
  borderRadius: 60,
  marginVertical: 8,
  overflow: 'hidden',
  justifyContent: 'flex-end',
  alignItems: 'center',
},

fabricImage: {
  width: '100%',
  height: '100%',
  position: 'absolute',
},
fabricOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.35)',
},
fabricText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
  marginBottom: 12,
  textAlign: 'center',
  paddingHorizontal:12
},
});
