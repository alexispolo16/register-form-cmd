// import { useState } from 'react';
import "tailwindcss/tailwind.css";
import axios from "axios"; // Importa Axios
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getCountries from "../data/country";
import citiesInEcuador from "../data/city";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cedula: "",
    email: "",
    phone: "",
    userType: "student",
    university: "",
    company: "",
    country: "",
    city: "",
    birthdate: "",
    terms: "",
  });

  const router = useRouter(); // Inicializa el enrutador de Next.js

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "country") {
      if (value === "Ecuador") {
        setCitySelectDisabled(false);
      } else {
        setCitySelectDisabled(true);
        setSelectedCity(""); // Reinicia la selección de la ciudad si el país no es Ecuador
      }
    }

    if (name === "birthdate") {
      // Validar edad mínima de 18 años
      const birthdate = new Date(value);
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

      if (birthdate > eighteenYearsAgo) {
        setBirthdateError("Debes ser mayor de 18 años para registrarte.");
      } else {
        setBirthdateError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construye el objeto JSON requerido
      const jsonPayload = {
        eventId: "202ea381-feff-4355-8ba3-ef26e3518d23",
        ticketId: "basic",
        ticketQty: 1,
        email: formData.email,
        personalInfo: {
          cedula: formData.cedula,
          nombre: formData.firstName,
          apellido: formData.lastName,
          birthdate: formData.birthdate,
          telefono: formData.phone,
          pais: formData.country,
          ciudad: formData.city,
          profesion: formData.userType,
          terms: formData.terms,
        },
      };

      const response = await axios.post(
        "https://gm2kcw3s21.execute-api.us-east-1.amazonaws.com/register",
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Manejar la respuesta exitosa aquí
        console.log("Formulario enviado con éxito");
        // Redirigir a la página "success"
        router.push("/success");
      } else {
        // Manejar errores aquí
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const [countryList, setCountryList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [citySelectDisabled, setCitySelectDisabled] = useState(true);
  const [birthdateError, setBirthdateError] = useState(""); // Estado para el mensaje de error

  useEffect(() => {
    // Llama a la función para obtener la lista de países
    getCountries()
      .then((countries) => {
        setCountryList(countries);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de países:", error);
      });
  }, []);

  return (
    <div className="max-w-screen-md mx-auto">
      <img src="https://assets.awsugecuador.com/assets/banner1.png" />
      <br />
      <div className="max-w-screen-md max-w-md p-4 shadow-xl">
        <h1
          style={{ color: "#f8991d" }}
          className="text-2xl font-semibold mb-4 text-center"
        >
          Formulario de Registro
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="firstName" className="block text-gray-700">
                Nombre:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="lastName" className="block text-gray-700">
                Apellido:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="cedula" className="block text-gray-700">
                Cédula:
              </label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="phone" className="block text-gray-700">
                Teléfono:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="birthdate" className="block text-gray-700">
              Fecha de Nacimiento:
              <br />
              {birthdateError && (
                <span className="text-red-600 ml-2">{birthdateError}</span>
              )}
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              max="2005-12-31" // Establecer el valor máximo para limitar las fechas hasta 2005
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">
              País:
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Selecciona un país</option>
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">
              Ciudad:
            </label>
            {formData.country === "Ecuador" ? (
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                disabled={citySelectDisabled}
              >
                <option value="">Selecciona una ciudad</option>
                {citiesInEcuador.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700">
              Profesión:
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccione una opción</option>
              <option value="Académico / Investigación">
                Académico / Investigación
              </option>
              <option value="Consejero / Consultor">
                Consejero / Consultor
              </option>
              <option value="Ejecutivo de negocio">Ejecutivo de negocio</option>
              <option value="Developer">Developer</option>
              <option value="Emprendedor (Fundador/Co-fundador)">
                Emprendedor (Fundador/Co-fundador)
              </option>
              <option value="Profesional IT / Manager técnico">
                Profesional IT / Manager técnico
              </option>
              <option value="Ventas / Marketing">Ventas / Marketing</option>
              <option value="Arquitecto de soluciones o sistemas">
                Arquitecto de soluciones o sistemas
              </option>
              <option value="Estudiante">Estudiante</option>
              <option value="Administrador del sistema">
                Administrador del sistema
              </option>
            </select>
          </div>
          {formData.userType === "Estudiante" && (
            <div className="mb-4">
              <label htmlFor="university" className="block text-gray-700">
                Universidad:
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required={formData.userType === "Estudiante"}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
          {formData.userType !== "Estudiante" && (
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700">
                Empresa:
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required={formData.userType === "professional"}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                
             />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="terms" className="block text-gray-700">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                className="mr-2 leading-tight"
                required
              />
              Acepto los términos y condiciones del AWS UG Ecuador y el Código
              de conducta del evento.
              <br />
              Revisa aquí nuestro{" "}
              <a
                style={{ color: "#f8991d" }}
                href="https://communityday.awsecuador.com/codigo-de-conducta/"
                target="_blank"
              >
                Código de conducta
              </a>{" "}
              y{" "}
              <a
                style={{ color: "#f8991d" }}
                href="https://communityday.awsecuador.com/terminos-y-condiciones/"
                target="_blank"
              >
                Términos y condiciones
              </a>
            </label>
          </div>
          {/* Resto de tu formulario */}
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
