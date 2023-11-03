import Head from 'next/head';
import "tailwindcss/tailwind.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getCountries from "../data/country";
import citiesInEcuador from "../data/city";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="max-w-screen-md mx-auto">
      <Head>
      </Head>
      <noscript>
      </noscript>
      <img src="https://assets.awsugecuador.com/assets/banner1.png" className="mb-6"/>
      <div className='max-w-screen-md max-w-md p-4 shadow-xl'>
        <div className="max-w-mg p-6 mx-auto">
          <h1 className="text-xl font-semibold mb-4 text-black text-center">
            ¡Gracias por tu interés en el AWS Community Day Ecuador 2023!
          </h1>
          <p className="text-black mb-6">
          Nos complace anunciar que hemos alcanzado nuestra capacidad máxima de registros para nuestro evento de este año, gracias a la abrumadora respuesta de nuestra vibrante comunidad tecnológica.<br/><br />
          Apreciamos tu entusiasmo y dedicación a la nube y las innovaciones de AWS. Te invitamos a estar al tanto de nuestras plataformas digitales para obtener las últimas actualizaciones, webinars y workshops que ofreceremos pronto.<br /><br />
          Te invito a seguirnos en nuestras redes sociales <a href='https://linktr.ee/awsecuador'>linktr.ee/awsecuador
</a>
          </p>
        </div>
      </div>
     
    </div>
  );
}
