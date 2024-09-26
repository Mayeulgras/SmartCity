import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Card from './Card';
 
 
export default function Map({ searchQuery }) {
  // etat qui contient les marqueurs, les met a jour et les initialise avec un tableau vide
  const [markers, setMarkers] = useState([]);
  // etat qui contient le marqueur selectionné, le met a jour et l'initialise avec null
  const [selectedMarker, setSelectedMarker] = useState(null);
  // etat qui contient le chargement, le met a jour et l'initialise avec true
  const [loading, setLoading] = useState(true);
  // etat qui contient le marqueur centré, le met a jour et l'initialise avec null (aucun marqueur ne sera sélectionné au début)
  const [centeredMarker, setCenteredMarker] = useState(null);
 
  useEffect(() => {
    const fetchAllParks = async () => {
      let allMarkers = [];
      let page = 1;
      let hasMore = true;
 
      while (hasMore) {
        try {
          const response = await axios.get(`http://192.168.0.12:1337/api/parcs?pagination[page]=${page}&pagination[pageSize]=100&populate=*`);
          const fetchedMarkers = response.data.data;
 
          allMarkers = [...allMarkers, ...fetchedMarkers];
 
          console.log(`Page ${page}: récupérés ${fetchedMarkers.length} éléments`);
 
          if (fetchedMarkers.length < 100) {
            hasMore = false;
          } else {
            page += 1;
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des parcs:', error);
          setLoading(false);
          hasMore = false;
        }
      }
 
      console.log(`Total des éléments récupérés: ${allMarkers.length}`);
      setMarkers(allMarkers);
      setLoading(false);
    };
 
    fetchAllParks();
  }, []);
 
  useEffect(() => {
    if (searchQuery) {
     
      const foundMarker = markers.find(marker =>
        marker.nom_complet.toLowerCase().includes(searchQuery.toLowerCase())
      );
 
      if (foundMarker) {
        setCenteredMarker(foundMarker);
      } else {
        setCenteredMarker(null);
      }
    } else {
      setCenteredMarker(null);
    } // cela permet d'exécuter cet effet a chaque fois que la recherche change ou que markers change
  }, [searchQuery, markers]);
 
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };
 
  const handleCloseModal = () => {
    setSelectedMarker(null);
  };
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.21698677752293,
          longitude: -1.560680966571717,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       
        region={centeredMarker ? {
          latitude: centeredMarker.location.lat,
          longitude: centeredMarker.location.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : undefined}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.location.lat,
              longitude: marker.location.lon,
            }}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
 
      {selectedMarker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={handleCloseModal}
        >
          <View>
            <Card data={selectedMarker} onClose={handleCloseModal} />
          </View>
        </Modal>
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});