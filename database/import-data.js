const fs = require('fs');
const axios = require('axios');

// Lisez le fichier JSON
const data = JSON.parse(fs.readFileSync('parcs_nantes.json', 'utf8'));

// Fonction pour importer les données via l'API Strapi
const importData = async () => {
  for (let record of data) {
    try {
      const response = await axios.post('http://localhost:1337/api/parcs', {
        data: {
          idobj: record.idobj,
          nom_complet: record.nom_complet,
          libtype: record.libtype,
          adresse: record.adresse,
          code_postal: record.code_postal,
          commune: record.commune,
          location: {
            lon: record.location.lon,
            lat: record.location.lat
          },
          siteweb: record.siteweb,
          acces_transport_commun: record.acces_transport_commun,
          informations_complementaires: record.informations_complementaires,
          gardien: record.gardien,
          jeux_enfants: record.jeux_enfants,
          pataugeoire: record.pataugeoire,
          sanitaires: record.sanitaires,
          sanitaires_handicapes: record.sanitaires_handicapes,
          chiens_autorises: record.chiens_autorises,
          jardin_clos: record.jardin_clos,
          abris: record.abris,
          point_eau_potable: record.point_eau_potable,
          table_pique_nique: record.table_pique_nique
        }
      }, {
        headers: {
          Authorization: `Bearer 31a1021e06a0e7b59e7d5d352c051815f619a784f95e3614bee70105189949f75687f002da5a29d8f1b5e2af7e3749b4a8c55586745e42968131e61ae3386b82c3ec2dbb9df0a4f4dc215b3886179c4f5231c8233dab4c32c5841afd96b5237fb5dd8faafe23d2c9de7ab9327e58ed54b3c85a253e0bcfb235d1252c42532db2`
        }
      });
      console.log(`Importé : ${response.data}`);
    } catch (error) {
      console.error(`Erreur pour ${record.nom_complet}`, error.response?.data || error.message);
    }
  }
};

// Lancer l'importation
importData();
