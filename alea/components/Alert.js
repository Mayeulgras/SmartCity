import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';






const AlertList = ({ alertes, setAlertes }) => {


  const disconnectAlert = async (description) => {
    try {
      // Récupérer toutes les alertes de la collection
      const response = await axios.get("http://192.168.0.12:1337/api/alertes?populate=*");
      const alertes = response.data.data;

      console.log('Description de l\'alerte à déconnecter:', description);
      console.log('Alertes récupérées:', alertes);

      // Trouver l'alerte à déconnecter en utilisant la description
      const alertToDisconnect = alertes.find((alerte) => alerte.description === description);

      if (alertToDisconnect) {
        console.log(`Déconnexion de l'alerte avec le documentId ${alertToDisconnect.documentId} et la description ${alertToDisconnect.description}`);

        // Effectuer une requête DELETE pour déconnecter l'alerte du parc
        await axios.delete(`http://192.168.0.12:1337/api/alertes/${alertToDisconnect.documentId}`);

        // Mettre à jour l'état des alertes pour refléter la déconnexion
        const updatedAlertes = alertes.map((alerte) =>
          alerte.documentId === alertToDisconnect.documentId ? { ...alerte, parcs: [] } : alerte
        );
        setAlertes(updatedAlertes);

        Alert.alert("Succès", "L'alerte a été déconnectée du parc.");
      } else {
        Alert.alert("Aucune alerte trouvée", "Aucune alerte ne correspond à cette description.");
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion de l\'alerte:', error.response ? error.response.data : error.message);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la déconnexion de l'alerte.");
    }
  };

  const confirmDelete = (description) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette alerte ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => disconnectAlert(description),
          style: "destructive"
        }
      ]
    );
  };



  const [clickedAlerts, setClickedAlerts] = useState([]);


  const incrementViewCount = async (documentId) => {
    try {

        // Vérifier si l'alerte a déjà été cliquée
        if (clickedAlerts.includes(documentId)) {
          Alert.alert("Info", "Vous avez déjà incrémenté cette alerte.");
          return; // Ne pas incrémenter à nouveau
        }

      const alerteToUpdate = alertes.find(alerte => alerte.documentId === documentId)
      // Effectuer une requête PUT pour incrémenter le viewCount
      await axios.put(`http://192.168.0.12:1337/api/alertes/${documentId}`, {
        data: {
          viewCount: alerteToUpdate.viewCount + 1,
        }
      });

      setClickedAlerts((prevClicked) => [...prevClicked, documentId]);

      // Mettre à jour l'état local si nécessaire
      setAlertes(prevAlertes =>
        prevAlertes.map(alerte =>
          alerte.documentId === documentId ? { ...alerte, viewCount: alerte.viewCount + 1 } : alerte
        )
      );

      Alert.alert("Succès", "Le compteur de vues a été incrémenté.");
      console.log('Compteur de vues incrémenté avec succès pour l\'alerte:', documentId);
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation du compteur de vues:', error.response ? error.response.data : error.message);
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'incrémentation du compteur de vues.");
    }
  };





  if (!alertes || alertes.length === 0) {
    return <Text>Aucune alerte disponible pour ce parc.</Text>;
  }

  return (
    <View style={styles.container}>
      {alertes.map((alerte) => (
        <View key={alerte.id} style={styles.alertContainer}>
          {/* Icône pour supprimer l'alerte */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(alerte.description)}
          >
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>

          <Text style={styles.alertTitle}>{alerte.category}</Text>
          <Text style={styles.alertDescription}>{alerte.description}</Text>

          {alerte.photo && (
            <Image
              source={{ uri: `http://192.168.0.12:1337${alerte.photo.formats.small.url}` }}
              style={styles.alertImage}
            />
          )}
          <TouchableOpacity style={styles.incrementButton} onPress={() => incrementViewCount(alerte.documentId)}>
            <Text style={styles.buttonText}>Incrémenter le compteur</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};






const styles = StyleSheet.create({
  container: {
    width: 310,
  },
  alertContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: '100%',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  alertTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontSize: 16,
  },
  alertDescription: {
    color: '#666',
    fontSize: 14,
  },
  alertImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  incrementButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default AlertList;
