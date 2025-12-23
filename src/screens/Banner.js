import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;


function Banner({ data }) {
    const scrollX = useRef(new Animated.Value(0)).current;


  return (
    <Animated.FlatList
      data={data}
      horizontal
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      bounces={false}
      contentContainerStyle={{
        paddingHorizontal: ITEM_SPACING,
      }}
      keyExtractor={(item) => item.title}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 1) * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.9, 1, 0.9],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.card,
              { transform: [{ scale }] },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.cta}>{item.cta}</Text>
            </View>
          </Animated.View>
        );
      }}
    />
  );
}

export default Banner;

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: 240,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  cta: {
    fontSize: 12,
    color: '#8BC34A',
    fontWeight: '600',
  },
});

