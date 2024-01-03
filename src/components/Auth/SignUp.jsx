import React, { useState } from 'react';
import shiro from "../../images/shiro2.png"


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch(
         `${import.meta.env.VITE_REACT_APP_AUTH_SERVER_URL}/register` ||
        'http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const responseData = await response.json(); // Parsea la respuesta como JSON

      if (response.ok) {
        console.log('Registro exitoso');
        window.location.href = '/signin';
      } else {
        // Si el usuario ya existe, establece el mensaje de error
        if (responseData.message === 'El usuario ya existe') {
          setError(responseData.message);
        } else {
          console.error('Error en el registro:', responseData.message);
        }
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };
  

  return  (
    <div
      className="flex flex-col items-center justify-center h-screen  text-white"
      style={{ backgroundImage: `url(${shiro})`, backgroundSize: 'cover' }}
    >
      <div className="max-w-sm w-full p-4 bg-gray-800 shadow-md mb-4">
        <div className="flex">
          <h2 className="text-2xl font-bold mb-4">Registro</h2>
          <h1 className="text-red-500 px-3 py-2">{error}</h1>
        </div>
        <input
          className="w-full mb-2 p-2 bg-gray-700 text-white border border-gray-300"
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-300"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleSignUp}
        >
          Registrarse
        </button>
      </div>

      <div>
        <a
          href="/signin" // Puedes reemplazar "/iniciar-sesion" con la URL correcta
          className="text-white text-sm hover:text-gray-300 transition duration-300 px-4 py-2 border-b-2 border-transparent hover:border-blue-500"
        >
          Iniciar sesión
        </a>
      </div>
    </div>
  );
};

export default SignUp;
