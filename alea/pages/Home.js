import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import TargetButton from '../components/TargetButton';
import Header from '../components/Header';

export default function HomeScreen() {

  
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationRetrieved = (coords) => {
    setUserLocation(coords); 
  };

  
  return (
    <View style={styles.container}>
      <Header title="Alea" />
      <Map searchQuery={searchQuery} userLocation={userLocation}/>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TargetButton onLocationRetrieved={handleLocationRetrieved} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
