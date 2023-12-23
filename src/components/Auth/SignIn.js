import React, { useState } from 'react';
import shiro from "../../images/shiro2.png"

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleSignIn = async () => {
    try {
      const response = await fetch( `${process.env.REACT_APP_AUTH_SERVER_URL}/login` || 'http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Parsea la respuesta JSON
        const authToken = responseData.token;
        console.log(authToken)
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('token', authToken);
  
        // Redirige al usuario a la página de dashboard u otra página después de agregar la tarea
         window.location.href = '/dashboard';
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red. Por favor, inténtalo de nuevo.');
    }
  };

  

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{ backgroundImage: `url(${shiro})`, backgroundSize: 'cover' }}
    >
      <div className="max-w-sm w-full p-4 bg-gray-800 shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
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
          onClick={handleSignIn}
        >
          Iniciar Sesión
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>

      <div>
        <p className="text-gray-300">¿No tienes una cuenta?</p>
        <div className="flex items-center justify-center">
          <a
            href="/signup" // Puedes reemplazar "/registrarse" con la URL correcta
            className="text-white text-sm hover:text-gray-300 transition duration-300 px-4 py-2 border-b-2 border-transparent hover:border-blue-500"
          >
            Registrate
          </a>
        </div>
      </div>
    </div>
  );
  
  
};

export default SignIn;
