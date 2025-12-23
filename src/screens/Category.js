import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Category() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>
    </View>
  );
}

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
