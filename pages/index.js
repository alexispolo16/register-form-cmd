// import { useState } from 'react';
import Head from 'next/head';
import "tailwindcss/tailwind.css";
import axios from "axios"; // Importa Axios
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getCountries from "../data/country";
import citiesInEcuador from "../data/city";

export default function Home() {

  const router = useRouter(); // Inicializa el enrutador de Next.js
  const [error, setError] = useState('');

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
        <h1
          style={{ color: "#f8991d" }}
          className="text-2xl font-semibold mb-4 text-center"
        >
          Gracias a todos!
        </h1>
      </div>
    </div>
  );
}
