import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Curate() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Curate Screen</Text>
    </View>
  );
}

export default Curate;

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
