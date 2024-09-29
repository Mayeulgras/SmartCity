import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/Alea.png')} style={styles.logo} />
      <Text style={styles.headerText}>{title}</Text>
      <Image source={require('../assets/avatar.png')} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute', // Positionne le header en absolu
    top: 0, // Fixe le header en haut de l'écran
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#f8f9fa', // Couleur de fond plus douce
    padding: 15,
    elevation: 5, // Ombre plus prononcée
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#e0e0e0', // Couleur de bordure
    borderWidth: 1,
  },
  headerText: {
    marginTop: 20,
    fontSize: 24, // Taille du texte
    fontWeight: '700', // Poids de la police
    flex: 1,
    textAlign: 'center',
    color: '#343a40', // Couleur de texte
  },
  logo: {
    marginTop: 20,
    width: 35, // Réduit la taille du logo
    height: 35,
    resizeMode: 'contain',
  },
  avatar: {
    marginTop: 20,
    width: 35, // Réduit la taille de l'avatar
    height: 35,
    borderRadius: 17.5, // Rendre l'avatar parfaitement rond
    resizeMode: 'cover',
    borderWidth: 1, // Ajouter une bordure à l'avatar
    borderColor: '#dee2e6', // Couleur de la bordure de l'avatar
  },
});

export default Header;
