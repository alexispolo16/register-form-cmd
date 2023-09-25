const axios = require('axios');

// Función que obtiene la lista de países
async function getCountries() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map((country) => country.name.common);
    return countries;
  } catch (error) {
    console.error('Error al obtener la lista de países:', error);
    throw error; // Propaga el error para que lo manejes donde importes esta función
  }
}

// Exporta la función para obtener la lista de países
module.exports = getCountries;