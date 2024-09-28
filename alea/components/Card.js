import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Form from './Form';
import AlertList from './Alert';

const { height } = Dimensions.get('window');

const Card = ({ data, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [alertes, setAlertes] = useState(data.alertes || []); // Initialize alertes with data.alertes

  const handleDeleteAlerte = (id) => {
    // Remove the alert with the given id from the alertes array
    setAlertes((prevAlertes) => prevAlertes.filter((alerte) => alerte.id !== id));
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>{data.nom_complet}</Text>
        <Text style={styles.description}>{data.adresse}</Text>
        <Text style={styles.code}>{data.code_postal}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
          <Text style={styles.buttonText}>Signaler un problème</Text>
        </TouchableOpacity>
        {showForm && <Form setShowForm={setShowForm} nomComplet={data.nom_complet} IdObj={data.id}/>}
        {alertes.length > 0 ? (
          <AlertList setAlertes={setAlertes} alertes={alertes} onDeleteAlerte={handleDeleteAlerte} />
        ) : (
          <Text>Aucune alerte disponible pour ce parc.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: height * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginTop: height * 0.2,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  code: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;