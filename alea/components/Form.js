import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const uploadImage = async (imageUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);

    if (fileInfo.exists) {
      const formData = new FormData();
      const fileName = `image_${Date.now()}.jpeg`;
      const mimeType = 'image/jpeg'; 

     
      formData.append('files', {
        uri: fileInfo.uri,
        name: fileName,
        type: mimeType,
      });

      
      const response = await axios.post("http://192.168.0.12:1337/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      const uploadedImage = response.data[0];
      return uploadedImage.id; 
    } else {
      throw new Error("Le fichier image n'existe pas.");
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    throw error;
  }
};

const PostInfo = async (data) => {
  try {
    const formData = new FormData();

    const imageId = data.image ? await uploadImage(data.image) : null;

    const alertData = {
      category: data.category,
      description: data.description,
      nom_complet: data.nom_complet,
      parcs: [{ id: data.id }],
      photo: imageId,
      viewCount: 1
    };

    console.log('Données de l\'alerte avant ajout au formData:', alertData);

    Object.keys(alertData).forEach(key => {
      if (key === 'parcs') {
        formData.append(`data[${key}][0][id]`, alertData[key][0].id);
      } else {
        formData.append(`data[${key}]`, alertData[key]);
      }
    });

    const response = await axios.post("http://192.168.0.12:1337/api/alertes?populate=*", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Alerte créée avec succès:', response.data);
    Alert.alert("Succès", "L'alerte a été créée avec succès. \n \nRechargez l'application pour voir votre alerte !", [{ text: 'OK' }]);
  } catch (error) {
    console.error('Erreur lors de la création de l\'alerte:', error.response ? error.response.data : error.message);
  }
};

const Form = ({ setShowForm, nomComplet, IdObj }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const data = {
      description: description,
      category: category,
      nom_complet: nomComplet,
      id: IdObj,
      image: image,
    };
    console.log('Données du formulaire:', data);
    PostInfo(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.label}>Description du problème</Text>
        <TextInput
          placeholder="Décrivez le problème ici..."
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Catégorie</Text>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'Dégradations des équipements', value: 'Dégradations des équipements' },
            { label: 'Trous ou fissures dans les chemins', value: 'Trous ou fissures dans les chemins' },
            { label: 'Problèmes d’éclairage', value: 'Problèmes d’éclairage' },
            { label: 'Végétation envahissante', value: 'Végétation envahissante' },
            { label: 'Déchets et propreté', value: 'Déchets et propreté' },
            { label: 'Signalisation endommagée', value: 'Signalisation endommagée' },
            { label: 'Problèmes de sécurité', value: 'Problèmes de sécurité' },
            { label: 'Animaux nuisibles', value: 'Animaux nuisibles' },
            { label: 'Inondations ou flaques d’eau persistantes', value: 'Inondations ou flaques d’eau persistantes' },
            { label: 'Équipements sportifs endommagés', value: 'Équipements sportifs endommagés' },
            { label: 'Graffitis ou vandalisme', value: 'Graffitis ou vandalisme' },
            { label: 'Problèmes de drainage', value: 'Problèmes de drainage' },
            { label: 'Danger environnemental', value: 'Danger environnemental' },
            { label: 'Accessibilité réduite', value: 'Accessibilité réduite' },
            { label: 'Autres', value: 'Autres' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Sélectionnez une catégorie", value: null }}
        />

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Ionicons name="camera" style={styles.photoIcon} />
          <Text style={styles.photoButtonText}>Ajouter une photo</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer l'alerte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end', 
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  photoIcon: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  inputAndroid: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
});

export default Form;
