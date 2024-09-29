import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Icône Ionicons (cible)
import * as Location from 'expo-location'; // Expo location pour la géolocalisation

const TargetButton = ({ onLocationRetrieved }) => {
  // Fonction pour obtenir la position actuelle
  const handleGetCurrentLocation = async () => {
    try {
      // Demande la permission d'accéder à la localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      // Récupère la position actuelle
      let location = await Location.getCurrentPositionAsync({});
      if (onLocationRetrieved) {
        onLocationRetrieved(location.coords); // Passe les coordonnées récupérées à la fonction callback
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la localisation :', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleGetCurrentLocation}>
      <Icon name="locate" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20, // Positionne le bouton en bas de l'écran
    right: 20, // Positionne le bouton à droite de l'écran
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF', // Couleur du bouton
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default TargetButton;
