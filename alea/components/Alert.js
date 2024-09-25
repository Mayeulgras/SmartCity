import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertList = ({ alertes }) => {
  if (!alertes || alertes.length === 0) {
    return <Text>Aucune alerte disponible pour ce parc.</Text>;
  }

  return (
    <View style={styles.container}>
      {alertes.map((alerte, index) => (
        <View key={index} style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Alerte: {alerte.category}</Text>
          <Text style={styles.alertDescription}>{alerte.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
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
});

export default AlertList;
