import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Righteous_400Regular } from '@expo-google-fonts/righteous';
import { useFonts, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

import { Home } from './src/screens/Home';

import { createStackNavigator } from '@react-navigation/stack';
import { Relatorio } from './src/screens/Relatorio';
import { NavigationContainer } from '@react-navigation/native';
import { Config } from './src/screens/Config';

export type RootStackParamList = {
  Home: undefined;
  Relatorio: undefined;
  Config: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Relatorio" component={Relatorio} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />

      <MyStack />
    </NavigationContainer>
  );
}
