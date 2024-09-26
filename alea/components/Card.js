import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Form from './Form';
import AlertList from './Alert'

const { height } = Dimensions.get('window');

const Card = ({ data, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  console.log(data);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{data.nom_complet}</Text>
      <Text style={styles.description}>{data.adresse}</Text>
      <Text style={styles.description}>{data.code_postal}</Text>
      <Button title='Signaler un problème' onPress={() => setShowForm(true)} />
      {showForm && <Form setShowForm={setShowForm} />}
      <AlertList alertes={data.alertes} />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Card;