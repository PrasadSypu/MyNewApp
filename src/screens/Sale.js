import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Sale() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sale Screen</Text>
    </View>
  );
}

export default Sale;

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
