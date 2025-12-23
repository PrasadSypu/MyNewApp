import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const BoutiqueCollection = ({ data, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems?.length) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(item)}
    >
      <Image
        source={{ uri: item.banner_image }}
        style={styles.image}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.cta}>{item.cta}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>
          `${item.banner_id}-${index}`
        }
        renderItem={renderItem}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfig.current}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default BoutiqueCollection;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  card: {
    width,
    height: 360,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 6,
  },
  cta: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8BC34A',
  },
});
