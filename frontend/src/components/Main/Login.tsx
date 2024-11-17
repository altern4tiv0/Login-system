import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Contexto del usuario
import Loader from '../../common/Loader'; // Componente Loader

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Función para establecer el usuario en el contexto
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Activar Loader al iniciar sesión

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();

      // Simular tiempo de carga adicional
      setTimeout(() => {
        setUser({ username: data.user.username }); // Guarda el usuario en el contexto
        navigate('/'); // Redirige al dashboard
      }, 1500); // Simula un retraso de 1.5 segundos
    } catch (error: any) {
      alert(error.message);
      setLoading(false); // Desactivar el Loader en caso de error
    }
  };

  // Si está cargando, mostrar el Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                {/* Logo */}
              </Link>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Iniciar Sesión
              </h2>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Usuario
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Ingrese Contraseña"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    ¿Aún no tienes cuenta?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Regístrate
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
