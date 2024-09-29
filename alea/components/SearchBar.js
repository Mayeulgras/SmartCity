import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Rechercher des parcs et jardins..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 60,
    alignItems: 'center',
    position: 'absolute',
    top: 40, 
    left: 10,
    right: 10,
    borderRadius: 25,
    backgroundColor: '#ffffff', 
    elevation: 5,
    paddingHorizontal: 15,
    zIndex: 1, 
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 25,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBar;
