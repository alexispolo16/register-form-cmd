const axios = require('axios');

// Función que obtiene la lista de países con Ecuador, Colombia y Perú al principio
async function getCountries() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map((country) => country.name.common);

    // Ordena los países alfabéticamente
    countries.sort((a, b) => a.localeCompare(b));

    // Mueve Ecuador, Colombia y Perú al principio
    const colombiaIndex = countries.indexOf('Colombia');
    if (colombiaIndex !== -1) {
      countries.splice(colombiaIndex, 1);
      countries.unshift('Colombia');
    }

    const peruIndex = countries.indexOf('Peru');
    if (peruIndex !== -1) {
      countries.splice(peruIndex, 1);
      countries.unshift('Peru');
    }

    const ecuadorIndex = countries.indexOf('Ecuador');
    if (ecuadorIndex !== -1) {
      countries.splice(ecuadorIndex, 1);
      countries.unshift('Ecuador');
    }

    return countries;
  } catch (error) {
    console.error('Error al obtener la lista de países:', error);
    throw error; // Propaga el error para que lo manejes donde importes esta función
  }
}

// Exporta la función para obtener la lista de países
module.exports = getCountries;
