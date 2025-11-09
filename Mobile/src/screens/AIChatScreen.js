import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// RunAnywhere SDK will be integrated here on Day 2

const AIChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Travel Buddy 🧠</Text>
      <Text>Chat interface + RunAnywhere SDK integration here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default AIChatScreen; // <-- CRITICAL EXPORT