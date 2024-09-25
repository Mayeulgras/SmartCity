import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/Home';
import PhotoScreen from './pages/Photo';
import Navbar from './components/NavBar';
import Header from './components/Header';

// fonction qui m'offre la possibilité de naviguer entre les pages
const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    // composant navbar qui affiche les pages en fonction de l'icon cliqué, ajout de la navbar perso dans tab.navigator
    <NavigationContainer>
      <Tab.Navigator tabBar={() => <Navbar />}>
        <Tab.Screen name="Home" component={HomeScreenWithHeader} options={{ headerShown: false }}/>
        <Tab.Screen name="Photo" component={PhotoScreenWithHeader} options={{ headerShown: false }}/>
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// page home avec le header de la page home
const HomeScreenWithHeader = () => (
  <View style={styles.container}>
    <Header title="Accueil" />
    <HomeScreen />
  </View>
);

// page photo avec le header de la page photo
const PhotoScreenWithHeader = () => (
  <View style={styles.container}>
    <Header title="Photos" />
    <PhotoScreen />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});