import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Card from './Card';

export default function Map({ searchQuery }) {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [centeredMarker, setCenteredMarker] = useState(null);

  useEffect(() => {
    const fetchAllParks = async () => {
      let allMarkers = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        try {
          // Première requête pour récupérer les parcs avec leurs localisations
          const response = await axios.get(`http://192.168.0.12:1337/api/parcs?pagination[page]=${page}&pagination[pageSize]=100&populate[location]=*`);
          // Deuxième requête pour récupérer les alertes avec les photos
          const response_2 = await axios.get(`http://192.168.0.12:1337/api/parcs?pagination[page]=${page}&pagination[pageSize]=100&populate[alertes][populate]=photo`);

          const fetchedMarkers = response.data.data;
          const fetchedAlertes = response_2.data.data;

          // Fusionner les parcs et leurs alertes
          const mergedMarkers = fetchedMarkers.map((marker, index) => {
            const alertes = fetchedAlertes[index]?.alertes.map(alerte => ({
              ...alerte,
              photoName: alerte.photo?.name || null, // Inclure le champ name des photos
            })) || [];
            return {
              ...marker,
              alertes, // Inclure les alertes dans le marqueur
            };
          });

          allMarkers = [...allMarkers, ...mergedMarkers];

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
    }
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
          >
          </Marker>
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
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});