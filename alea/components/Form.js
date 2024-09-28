import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
      const fileName = `image_${Date.now()}.jpeg`; // Nom du fichier
      const mimeType = 'image/jpeg'; // Type MIME

      // Ajout de l'image au formData
      formData.append('files', {
        uri: fileInfo.uri,
        name: fileName,
        type: mimeType,
      });

      // Envoyer l'image à Strapi
      const response = await axios.post("http://192.168.0.12:1337/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Récupérer l'ID de l'image
      const uploadedImage = response.data[0]; // Assurez-vous que c'est la bonne structure
      return uploadedImage.id; // Retourner l'ID de l'image
    } else {
      throw new Error("Le fichier image n'existe pas.");
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    throw error;
  }
};

// Fonction pour poster les données de l'alerte avec l'ID de l'image
const PostInfo = async (data) => {
  try {
    const formData = new FormData();

    // Télécharge l'image et récupère son ID
    const imageId = data.image ? await uploadImage(data.image) : null;

    const alertData = {
      category: data.category,
      description: data.description,
      nom_complet: data.nom_complet,
      parcs: [{ id: data.id }],
      photo: imageId, // Utiliser l'ID de l'image ici
      viewCount: 1
    };

    console.log('Données de l\'alerte avant ajout au formData:', alertData);

    // Ajouter les données d'alerte dans le formData
    Object.keys(alertData).forEach(key => {
      if (key === 'parcs') {
        formData.append(`data[${key}][0][id]`, alertData[key][0].id);
      } else {
        formData.append(`data[${key}]`, alertData[key]);
      }
    });

    // Envoyer les données d'alerte à l'API
    const response = await axios.post("http://192.168.0.12:1337/api/alertes?populate=*", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Alerte créée avec succès:', response.data);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Description du problème"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

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
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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
    marginBottom: 20,
  },
  photoIcon: {
    color: 'white',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#4285F4',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  inputAndroid: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
});

export default Form;
