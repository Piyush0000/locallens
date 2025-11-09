import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens (assuming they are in './src/screens/')
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AIChatScreen from './src/screens/AIChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // Placeholder variable to simulate login status
  // Set to 'false' initially to land on the Login screen as per Day 1 task
  const isAuthenticated = false; 

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' }, // LocalLens green
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Hide header on login screen
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Discover LocalLens' }}
        />
        <Stack.Screen 
          name="AIChat" 
          component={AIChatScreen} 
          options={{ title: 'AI Travel Buddy' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

