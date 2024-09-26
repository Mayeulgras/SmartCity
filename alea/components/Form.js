import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

const Form = ({ setShowForm }) => {
  return (
    <View style={styles.styleglobal}>
      <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <TextInput placeholder="Description du problème" style={styles.input} />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'Dégradations des équipements', value: '1' },
          { label: 'Trous ou fissures dans les chemins', value: '2' },
          { label: 'Problèmes d’éclairage', value: '3' },
          { label: 'Végétation envahissante', value: '4' },
          { label: 'Déchets et propreté', value: '5' },
          { label: 'Signalisation endommagée', value: '6' },
          { label: 'Problèmes de sécurité', value: '7' },
          { label: 'Animaux nuisibles', value: '8' },
          { label: 'Inondations ou flaques d’eau persistantes', value: '9' },
          { label: 'Équipements sportifs endommagés', value: '10' },
          { label: 'Graffitis ou vandalisme', value: '11' },
          { label: 'Problèmes de drainage', value: '12' },
          { label: 'Danger environnemental', value: '13' },
          { label: 'Accessibilité réduite', value: '14' },
          { label: 'Autres', value: '15' },
        ]}
      />
        <TouchableOpacity style={styles.photoButton}>
            <Ionicons name="camera" style={styles.photoIcon} />
        </TouchableOpacity>
      <Button title="Envoyer l'alerte"/>
    </View>
  );
};

const styles = StyleSheet.create({
  styleglobal: {
    width:"100%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  photoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,   
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  photoIcon: {
    color: 'white',
    fontSize: 24,
  },
});

export default Form;