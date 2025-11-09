import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// MapView will be integrated here on Day 2

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocalLens Discover</Text>
      <Text>Map and nearby places feed will go here (Day 2)</Text>
      <Text 
        style={styles.link}
        onPress={() => navigation.navigate('AIChat')}
      >
        Go to AI Chat 💬
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
  }
});

export default HomeScreen; // <-- CRITICAL EXPORT