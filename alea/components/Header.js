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
    position: 'absolute', 
    top: 0, 
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#f8f9fa', 
    padding: 15,
    elevation: 5, 
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#e0e0e0', 
    borderWidth: 1,
  },
  headerText: {
    marginTop: 20,
    fontSize: 24, 
    fontWeight: '700', 
    flex: 1,
    textAlign: 'center',
    color: '#343a40', 
  },
  logo: {
    marginTop: 20,
    width: 35, 
    height: 35,
    resizeMode: 'contain',
  },
  avatar: {
    marginTop: 20,
    width: 35, 
    height: 35,
    borderRadius: 17.5, 
    resizeMode: 'cover',
    borderWidth: 1, 
    borderColor: '#dee2e6', 
  },
});

export default Header;
