// pages/success.js
import Link from 'next/link';
import 'tailwindcss/tailwind.css';


const Success = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <iframe style={{ border: "none" }} src="https://lottie.host/?file=272e8be7-4b08-482b-b1e7-1485282fc3ea/drCUMZqrGk.json"></iframe>
        <h1 className="text-2xl font-semibold mb-4">¡Registro exitoso!</h1>
        <p style={{ fontSize: "25px" }} className="color-cmd">Tu registro ha sido completado.</p>
        <p style={{ fontSize: "15px", textAlign: 'center' }} >No olvides llevar tu cédula de identidad, ya que es un requisito obligatorio para ingresar.<br/> Además, pronto recibirás un correo con la confirmación de tu registro.<br/>
¡Nos vemos pronto!</p>
      </div>
    );
  };
  
  export default Success;
