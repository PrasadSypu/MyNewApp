import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function More() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>More Screen</Text>
    </View>
  );
}

export default More;

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
