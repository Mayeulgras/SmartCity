import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Navbar = () => {
  // useNavigation est un hook qui permet d'accéder à la navigation
  const navigation = useNavigation();

  return (
    // navbar avec les icones home et photo
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={30} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Photo')}
      >
        <Icon name="photo" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    right: 20, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222222', 
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderRadius: 20, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, 
  },
  navItem: {
    padding: 10,
  },
});

export default Navbar;
