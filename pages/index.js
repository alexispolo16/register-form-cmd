// import { useState } from 'react';
import Head from 'next/head';
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
  const [error, setError] = useState('');

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
        eventId: "f6c017ee-73ba-4b1a-afd5-b5df109c7137",
        ticketId: "basic",
        ticketQty: 1,
        email: formData.email,
        personalInfo: {
          nombre: formData.firstName,
          apellido: formData.lastName,
          birthdate: formData.birthdate,
          telefono: formData.phone,
          pais: formData.country,
          ciudad: formData.city,
          profesion: formData.userType,
          company:formData.company,
          terms: "True",
        },
      };

      const response = await axios.post(
        "https://w0ucj83sp0.execute-api.us-east-1.amazonaws.com/dev/register",
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
      console.log(error.response.data);
      setError(error.response.data); // Establecer el mensaje de error en el estado
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
      <Head>
        <title>AWS Community Day Ecuador</title>
        <meta name="description" content="Evento Organizado por la comunidad de AWS UG Ecuador" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KZHT51K5PP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KZHT51K5PP');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N339JR9V');
            `,
          }}
        />
      
      </Head>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N339JR9V"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <img src="https://assets.awsugecuador.com/assets/banner1.png" />
      <br />
      <div className="max-w-screen-md max-w-md p-4 shadow-xl">
        <h3 className='text-2xl font-semibold mb-4 text-center'>Únete al AWS Community Day Ecuador</h3>
        <p className='text-wrap'>
          Ven y disfruta de un día lleno de aprendizaje, networking y diversión. Conoce a profesionales y entusiastas como tú y sé parte de nuestra vibrante comunidad. <b>¡No te lo pierdas!</b>
          <br /> <br />
          Únete a nuestro grupo de WhatsApp para más detalles y novedades: <a href='https://chat.whatsapp.com/C5KRguNCZQUAFqpO9aJlxb' target='_blank' className='font-bold'>Click aquí</a>
          <br /> <br />
          Síguenos en nuestras redes sociales: <a href='https://linktr.ee/awsecuador' target='_blank' className='font-bold'>Click aquí</a>
          <br />
          <br />
          ¡Te esperamos!
        </p>
        <br />
        <br />

        <h2
          style={{ color: "#f8991d" }}
          className="text-2xl font-semibold mb-4 text-center"
        >
          Formulario de Registro
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="firstName" className="block text-gray-700">
                Nombres:
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
                Apellidos:
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
                href="https://communityday.awsugecuador.com/codigo-de-conducta/"
                target="_blank"
              >
                Código de conducta
              </a>{" "}
              y{" "}
              <a
                style={{ color: "#f8991d" }}
                href="https://communityday.awsugecuador.com/terminos-y-condiciones/"
                target="_blank"
              >
                Términos y condiciones
              </a>
            </label>
          </div>
          {error && ( <p className="text-red-700">{error}</p> )}
          <br/>
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
