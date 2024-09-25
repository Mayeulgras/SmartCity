import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {

  //etat qui va contenir la valeur de la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // vue avec la searechbar et la map, la recherche est incluse
  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Map searchQuery={searchQuery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
