import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { login } from "../../service/auth";
import { ExclamationCircleIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

const LoginForm = () => {

  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState : { errors }} = useForm();
  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    setLoading(true);
    await login(data).then(res => {
      toast.success("😎 Bienvenido a Solgas", {
        className: "font-bold",
        style: { fontFamily: 'Quicksand' },
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/events");
      } , 3000);
    }).catch(err => {
      toast.error("😟 Datos invalidos", {
        className: "font-bold",
        style: { fontFamily: 'Quicksand' },
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    });
  }

  const togglePasswordVisibility = () => {
    setPasswordShow(passwordShow ? false : true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="relative w-full mb-3">
        <label
          className={`block text-gray-700 text-base font-bold mb-2` + (errors.username ? " text-red-500" : "")}
        >
          Nombre de Usuario
        </label>
        <input
          type="text"
          autoComplete="username"
          name="username"
          className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring w-full font-bold` + (errors.username ? " focus:border-2 border-rose-500 border-2" : "")}
          style={{ transition: "all .15s ease" }}
          {...register("username", {
            required: {
              value: true,
              message: "El nombre de usuario es requerido"
            }
          })}
        />
        {errors.username && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.username.message} <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1"/></span>}
      </div>
      <div className="relative w-full mb-3">
        <label
          className={`block text-gray-700 text-base font-bold mb-2` + (errors.password ? " text-red-500" : "")}
        >
          Contraseña
        </label>
        <input
          type={passwordShow ? "text" : "password"}
          autoComplete="current-password"
          name="password"
          className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring w-full font-bold` + (errors.password ? " focus:border-2 border-rose-500 border-2" : "")}
          style={{ transition: "all .15s ease" }}
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida"
            }
          })}
        />
        {errors.password ? "" : <div onClick={togglePasswordVisibility}>
          {passwordShow ? <EyeIcon className="h-5 w-5 text-dark-500 float-right relative bottom-8 right-3"/> : <EyeOffIcon className="h-5 w-5 text-dark-500 float-right relative bottom-8 right-3"/>}
        </div>}
        {errors.password && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.password.message} <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1"/></span>}
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          id="customCheckLogin"
          type="checkbox"
          className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
          style={{ transition: "all .15s ease" }}
        />
        <span className="ml-2 text-base font-semibold text-gray-700">
          Mantenme conectado
        </span>
      </label>
      <div className="text-center mt-6">
        <button
          className={`bg-gray-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full` + (errors.password || errors.username ? " opacity-50 cursor-not-allowed" : "")}
          type="submit"
          style={{ transition: "all .15s ease" }}
        >
          <div className="inline-flex items-center">
          {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>}
          Iniciar Sesión
          </div>
        </button>
      </div>
    </form>
  )
}

export default LoginForm;